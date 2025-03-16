import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // フロントマターを解析
  const { data, content } = matter(fileContents);

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

export async function serializeMDX(content: string) {
  return serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
    parseFrontmatter: true,
  });
}
