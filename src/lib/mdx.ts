import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

// 一時的なビューカウントストレージ（実際のアプリではデータベースを使用する）
const viewCounts: Record<string, number> = {};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // フロントマターを解析
  const { data, content } = matter(fileContents);

  // サムネイル画像がない場合はデフォルト画像を設定
  if (!data.thumbnail) {
    data.thumbnail = '/images/default-thumbnail.jpg';
  }

  // 記事の要約がない場合は本文から自動抽出（最初の100文字程度）
  if (!data.excerpt) {
    const textContent = content
      .replace(/```[\s\S]*?```/g, '') // コードブロックを削除
      .replace(/import[\s\S]*?;/g, '') // importステートメントを削除
      .replace(/<[^>]*>/g, ''); // HTMLタグを削除
    
    data.excerpt = textContent.trim().substring(0, 120) + '...';
  }

  // 記事の閲覧数を追加
  data.viewCount = getViewCount(realSlug);

  return {
    slug: realSlug,
    frontMatter: data,
    content,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      post1.frontMatter.date > post2.frontMatter.date ? -1 : 1
    );

  return posts;
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.frontMatter.tags && 
    post.frontMatter.tags.includes(tag)
  );
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.frontMatter.category === category
  );
}

export async function getMostViewedPosts(limit = 5) {
  const posts = await getAllPosts();
  return posts
    .sort((a, b) => (getViewCount(b.slug) - getViewCount(a.slug)))
    .slice(0, limit);
}

export async function serializeMDX(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, [rehypeRaw, { passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'] }]],
    },
    parseFrontmatter: true,
  });
}

// 記事の閲覧数を増加させる
export function incrementViewCount(slug: string) {
  const currentCount = viewCounts[slug] || 0;
  viewCounts[slug] = currentCount + 1;
  return viewCounts[slug];
}

// 記事の閲覧数を取得
export function getViewCount(slug: string) {
  return viewCounts[slug] || Math.floor(Math.random() * 100) + 10; // ダミーデータ（実際はDBから取得）
}

// すべてのタグを取得
export async function getAllTags() {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.frontMatter.tags && Array.isArray(post.frontMatter.tags)) {
      post.frontMatter.tags.forEach((tag: string) => {
        tagsSet.add(tag);
      });
    }
  });
  
  return Array.from(tagsSet);
}

// すべてのカテゴリを取得
export async function getAllCategories() {
  const posts = await getAllPosts();
  const categoriesSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.frontMatter.category) {
      categoriesSet.add(post.frontMatter.category);
    }
  });
  
  return Array.from(categoriesSet);
}

// 記事を検索
export async function searchPosts(query: string) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const posts = await getAllPosts();
  const lowerCaseQuery = query.toLowerCase();
  
  return posts.filter(post => {
    const title = post.frontMatter.title?.toLowerCase() || '';
    const excerpt = post.frontMatter.excerpt?.toLowerCase() || '';
    const content = post.content.toLowerCase();
    const tags = post.frontMatter.tags || [];
    
    return (
      title.includes(lowerCaseQuery) ||
      excerpt.includes(lowerCaseQuery) ||
      content.includes(lowerCaseQuery) ||
      tags.some((tag: string) => tag.toLowerCase().includes(lowerCaseQuery))
    );
  });
}
