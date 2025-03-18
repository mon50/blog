import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import Layout from "@/components/Layout";
import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale";

export default async function Home() {
  const posts = await getAllPosts();
  
  // フィーチャード記事（最新の記事）
  const featuredPost = posts[0];
  
  // その他の記事
  const otherPosts = posts.slice(1);

  return (
    <Layout>
      <div className="space-y-12">
        {/* ヒーローセクション */}
        <section className="relative bg-gray-900 text-white rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="relative z-20 p-8 md:p-12 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              最新のガジェット情報、レビュー、比較をお届け
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              スマートフォン、オーディオ、PC周辺機器など、様々なガジェットの情報を発信しています。
            </p>
            <Link 
              href="/category/featured" 
              className="inline-block bg-white text-gray-900 font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              注目の記事をチェック
            </Link>
          </div>
        </section>

        {/* フィーチャード記事 */}
        {featuredPost && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              注目の記事
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    {/* プレースホルダー画像 - 実際の記事画像に置き換える */}
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">記事のサムネイル画像</span>
                    </div>
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="flex flex-wrap mb-3">
                      {featuredPost.frontMatter.tags && featuredPost.frontMatter.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                      {featuredPost.frontMatter.title}
                    </h3>
                    <time className="text-sm text-gray-600 mb-4 block">
                      {format(parseISO(featuredPost.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                    </time>
                    <p className="text-gray-600 mb-4">
                      {featuredPost.frontMatter.excerpt || "この記事の内容をチェックしてください..."}
                    </p>
                    <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                      続きを読む
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* カテゴリーリンク */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">カテゴリー</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {[
              { name: "スマートフォン", slug: "smartphone", icon: "📱" },
              { name: "オーディオ", slug: "audio", icon: "🎧" },
              { name: "PC・周辺機器", slug: "pc", icon: "💻" },
              { name: "スマートウォッチ", slug: "smartwatch", icon: "⌚" }
            ].map((category) => (
              <Link 
                key={category.slug}
                href={`/category/${category.slug}`}
                className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 最新の記事 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">最新の記事</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
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
                      {post.frontMatter.tags && post.frontMatter.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {post.frontMatter.title}
                    </h3>
                    <time className="text-sm text-gray-600 mb-3 block">
                      {post.frontMatter.date && format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              すべての記事を見る
            </Link>
          </div>
        </section>

        {/* メルマガ登録 */}
        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">最新情報をお届けします</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            新しいガジェット情報やレビュー記事などを、いち早くお届けします。メールアドレスをご登録ください。
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="メールアドレス" 
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                登録
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
