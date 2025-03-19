import Link from "next/link";
import { getAllPosts, getMostViewedPosts } from "@/lib/mdx";
import Layout from "@/components/Layout";
import TagLink from "@/components/TagLink";
import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale";

export default async function Home() {
  const posts = await getAllPosts();
  const popularPosts = await getMostViewedPosts(3); // 人気ランキング上位3件
  
  // フィーチャード記事（最新の記事）
  const featuredPost = posts[0];
  
  // その他の記事
  const otherPosts = posts.slice(1);

  return (
    <Layout>
      <div className="space-y-12">
        {/* ヒーローセクション */}
        <section className="relative bg-[#2d2926] text-white rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d2926] to-transparent z-10"></div>
          <div className="relative z-20 p-8 md:p-12 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              シックな雰囲気の中で楽しむガジェット情報
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              最新のガジェット情報やレビューを、カフェのような落ち着いた雰囲気でお届けします。
            </p>
            <Link 
              href="/tag/featured" 
              className="btn-secondary inline-block"
            >
              注目の記事をチェック
            </Link>
          </div>
        </section>

        {/* フィーチャード記事 */}
        {featuredPost && (
          <section>
            <h2 className="text-2xl font-bold text-[#2d2926] mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#bd8c7d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              注目の記事
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="card md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  {/* プレースホルダー画像 - 実際の記事画像に置き換える */}
                  <div className="absolute inset-0 bg-[#e2ddd5] flex items-center justify-center">
                    <span className="text-[#6f4e37]">記事のサムネイル画像</span>
                  </div>
                </div>
                <div className="p-6 md:w-1/2">
                  <div className="flex flex-wrap mb-3">
                    {featuredPost.frontMatter.tags && featuredPost.frontMatter.tags.map((tag: string) => (
                      <span key={tag}>
                        <TagLink
                          tag={tag}
                          className="mr-2 mb-2 px-2 py-1 bg-[#f1eeea] text-[#6f4e37] text-xs rounded-md hover:bg-[#e2ddd5] transition-colors"
                        />
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d2926] group-hover:text-[#6f4e37] transition-colors duration-300 mb-3">
                    {featuredPost.frontMatter.title}
                  </h3>
                  <time className="text-sm text-[#6f4e37] mb-4 block">
                  {featuredPost.frontMatter.date && format(parseISO(featuredPost.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                  </time>
                  <p className="text-[#3c3732] mb-4">
                    {featuredPost.frontMatter.excerpt || "この記事の内容をチェックしてください..."}
                  </p>
                  <span className="inline-flex items-center text-[#6f4e37] font-medium group-hover:text-[#5a3e2c]">
                    続きを読む
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* 人気ランキング */}
        <section>
          <h2 className="text-2xl font-bold text-[#2d2926] mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#bd8c7d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            人気ランキング
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {popularPosts.map((post, index) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="block group relative"
              >
                <div className="card overflow-hidden">
                  <div className="relative">
                    <div className="relative h-48 bg-[#e2ddd5] overflow-hidden">
                      {post.frontMatter.thumbnail ? (
                        <img 
                          src={post.frontMatter.thumbnail} 
                          alt={post.frontMatter.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#6f4e37]">記事のサムネイル</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 w-10 h-10 bg-[#7d5a46] rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap mb-2">
                      {post.frontMatter.tags && post.frontMatter.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag}>
                          <TagLink
                            tag={tag}
                            className="mr-2 mb-2 px-2 py-1 bg-[#f1eeea] text-[#6f4e37] text-xs rounded-full hover:bg-[#e2ddd5] transition-colors"
                          />
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-[#2d2926] group-hover:text-[#7d5a46] transition-colors duration-300 mb-2 line-clamp-2">
                      {post.frontMatter.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <time className="text-[#6f4e37]">
                        {post.frontMatter.date && format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                      </time>
                      <span className="text-[#6f4e37] flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post.frontMatter.viewCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* カテゴリーリンク */}
        <section>
          <h2 className="text-2xl font-bold text-[#2d2926] mb-6">カテゴリー</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {[
              { name: "ガジェット", slug: "gadget", icon: "📱" },
              { name: "レビュー", slug: "review", icon: "🔍" },
              { name: "使い方ガイド", slug: "howto", icon: "📖" },
              { name: "ニュース", slug: "news", icon: "📰" }
            ].map((category) => (
              <Link 
                key={category.slug}
                href={`/tag/${category.slug}`}
                className="card p-6 text-center"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-[#2d2926]">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 最新の記事 */}
        <section>
          <h2 className="text-2xl font-bold text-[#2d2926] mb-6">最新の記事</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="block group"
              >
                <div className="card h-full flex flex-col">
                  <div className="relative h-48 bg-[#e2ddd5] flex items-center justify-center">
                    <span className="text-[#6f4e37]">記事のサムネイル</span>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex flex-wrap mb-2">
                      {post.frontMatter.tags && post.frontMatter.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag}>
                          <TagLink
                            tag={tag}
                            className="mr-2 mb-2 px-2 py-1 bg-[#f1eeea] text-[#6f4e37] text-xs rounded-md hover:bg-[#e2ddd5] transition-colors"
                          />
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-[#2d2926] group-hover:text-[#6f4e37] transition-colors duration-300 mb-2">
                      {post.frontMatter.title}
                    </h3>
                    <time className="text-sm text-[#6f4e37] block mt-auto">
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
              className="btn-primary"
            >
              すべての記事を見る
            </Link>
          </div>
        </section>

        {/* ニュースレター登録 */}
        <section className="bg-[#f1eeea] rounded-lg p-8 text-center border border-[#e2ddd5]">
          <h2 className="text-2xl font-bold text-[#2d2926] mb-4">最新情報をお届けします</h2>
          <p className="text-[#3c3732] mb-6 max-w-2xl mx-auto">
            新しいガジェット情報やレビュー記事などを、いち早くお届けします。メールアドレスをご登録ください。
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="メールアドレス" 
                className="flex-grow px-4 py-2 rounded-l-md border border-[#d2c6b2] focus:ring-[#6f4e37] focus:border-[#6f4e37]"
              />
              <button className="bg-[#6f4e37] text-white px-4 py-2 rounded-r-md hover:bg-[#5a3e2c] transition-colors">
                登録
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
