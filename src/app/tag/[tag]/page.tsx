import Link from "next/link";
import Layout from "@/components/Layout";
import { getPostsByTag } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { notFound } from "next/navigation";

export default async function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Layout>
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            タグ
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            「{decodedTag}」の記事
          </h1>
          <p className="text-gray-600">
            「{decodedTag}」に関連する記事が{posts.length}件見つかりました。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="block group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">記事のサムネイル</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap mb-2">
                    {post.frontMatter.tags &&
                      post.frontMatter.tags.slice(0, 2).map((t: string) => (
                        <span
                          key={t}
                          className={`mr-2 mb-2 px-2 py-1 text-xs rounded-md ${
                            t === decodedTag
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                    {post.frontMatter.title}
                  </h3>
                  <time className="text-sm text-gray-600 mb-3 block">
                    {format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", {
                      locale: ja,
                    })}
                  </time>
                  {post.frontMatter.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.frontMatter.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </Layout>
  );
}