import { getPostsByTag } from "@/lib/mdx";
import Layout from "@/components/Layout";
import Link from "next/link";
import TagLink from "@/components/TagLink";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const posts = await getPostsByTag(tag);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2d2926] mb-6 border-b pb-4 border-[#e2ddd5]">
          タグ: {tag}
        </h1>

        {posts.length === 0 ? (
          <div className="bg-[#f9f7f5] rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-[#d2c6b2] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-lg font-medium text-[#2d2926] mb-2">
              記事が見つかりません
            </h2>
            <p className="text-[#6f4e37] mb-4">
              このタグに関連する記事はまだありません。
            </p>
          </div>
        ) : (
          <>
            <p className="text-[#6f4e37] mb-8">
              {posts.length}件の記事が見つかりました
            </p>

            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="card">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#2d2926] group-hover:text-[#6f4e37] transition-colors mb-2">
                        {post.frontMatter.title}
                      </h2>
                      <div className="flex items-center text-sm text-[#6f4e37] mb-3">
                        <time dateTime={post.frontMatter.date}>
                          {format(
                            parseISO(post.frontMatter.date),
                            "yyyy/MM/dd",
                            { locale: ja },
                          )}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{post.frontMatter.viewCount || 0}回表示</span>
                      </div>
                      {post.frontMatter.excerpt && (
                        <p className="text-[#3c3732] mb-4">
                          {post.frontMatter.excerpt}
                        </p>
                      )}
                      {post.frontMatter.tags && (
                        <div className="flex flex-wrap">
                          {post.frontMatter.tags.map((tagName: string) => (
                            <span key={tagName}>
                              <TagLink
                                tag={tagName}
                                className="mr-2 mb-2 px-3 py-1 bg-[#f1eeea] text-[#6f4e37] text-xs rounded-md hover:bg-[#e2ddd5] transition-colors"
                              />
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
