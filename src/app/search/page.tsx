import { searchPosts } from "@/lib/mdx";
import Layout from "@/components/Layout";
import Link from "next/link";
import TagLink from "@/components/TagLink";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const results = query ? await searchPosts(query) : [];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          「{query}」の検索結果
        </h1>

        {!query && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">検索キーワードを入力してください。</p>
          </div>
        )}

        {query && results.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              検索結果がありません
            </h2>
            <p className="text-gray-600 mb-4">
              別のキーワードで検索するか、以下をお試しください：
            </p>
            <ul className="text-gray-600 list-disc list-inside text-left max-w-md mx-auto">
              <li>キーワードの綴りを確認する</li>
              <li>より一般的なキーワードを使用する</li>
              <li>キーワードの数を減らしてみる</li>
            </ul>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              {results.length}件の結果が見つかりました
            </p>

            <div className="space-y-8">
              {results.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {post.frontMatter.title}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <time dateTime={post.frontMatter.date}>
                          {format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                        </time>
                        <span className="mx-2">•</span>
                        <span>
                          {post.frontMatter.viewCount || 0}回表示
                        </span>
                      </div>
                      {post.frontMatter.excerpt && (
                        <p className="text-gray-600 mb-4">
                          {post.frontMatter.excerpt}
                        </p>
                      )}
                      {post.frontMatter.tags && (
                        <div className="flex flex-wrap">
                          {post.frontMatter.tags.map((tag: string) => (
                            <span key={tag}>
                              <TagLink
                                tag={tag}
                                className="mr-2 mb-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full hover:bg-gray-200 transition-colors"
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