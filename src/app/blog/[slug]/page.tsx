import MDXContent from "@/app/blog/[slug]/MDXcontent";
import Layout from "@/components/Layout";
import { getPostBySlug, getAllPosts, serializeMDX, getMostViewedPosts } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import Image from "next/image";

interface PageParams extends ParsedUrlQuery {
  slug: string;
}

export default async function BlogPost({ params }: { params: PageParams }) {
  const { slug } = params;
  const { frontMatter, content } = getPostBySlug(slug);
  const mdxSource = await serializeMDX(content);
  
  // 関連記事を取得（同じタグを持つ記事）
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== slug && 
      post.frontMatter.tags && 
      frontMatter.tags && 
      post.frontMatter.tags.some((tag: string) => 
        frontMatter.tags.includes(tag)
      )
    )
    .slice(0, 3); // 最大3件まで表示

  // 人気記事を取得
  const popularPosts = await getMostViewedPosts(5);

  // 記事の表示回数（実際の実装ではDBから取得する）
  const viewCount = Math.floor(Math.random() * 100) + 10; // ダミーデータ

  // 見出しを抽出して目次を作成 (簡易的な方法)
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^#+\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const line = match[0];
    const level = line.indexOf(' ');
    const text = line.slice(level).trim();
    const id = text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* パンくずリスト */}
        <nav className="text-sm text-[#6f4e37] mb-6">
          <ol className="flex items-center space-x-1">
            <li>
              <Link href="/" className="hover:text-[#5a3e2c]">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#5a3e2c]">
                Blog
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li className="truncate max-w-xs">
              <span className="text-[#2d2926]">{frontMatter.title}</span>
            </li>
          </ol>
        </nav>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2ddd5]">
              <header className="p-6 md:p-8 border-b border-[#e2ddd5]">
                {/* カテゴリ表示 */}
                {frontMatter.category && (
                  <div className="mb-4">
                    <Link 
                      href={`/category/${frontMatter.category}`}
                      className="inline-block bg-[#6f4e37] text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-[#5a3e2c] transition-colors"
                    >
                      {frontMatter.category}
                    </Link>
                  </div>
                )}
                
                {/* タイトル - より大きく目立つように */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2926] mb-6 leading-tight">
                  {frontMatter.title}
                </h1>
                
                {/* タグ - デザイン改善 */}
                <div className="flex flex-wrap mb-4">
                  {frontMatter.tags?.map((tag: string) => (
                    <Link 
                      href={`/tag/${tag}`} 
                      key={tag}
                      className="mr-2 mb-2 px-3 py-1 bg-[#f1eeea] text-[#6f4e37] text-sm rounded-md hover:bg-[#e2ddd5] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                
                {/* メタ情報 - よりリッチに */}
                <div className="flex items-center text-[#6f4e37] text-sm mb-4 border-b border-[#e2ddd5] pb-4">
                  <time dateTime={frontMatter.date} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {frontMatter.date
                      ? format(parseISO(frontMatter.date), "yyyy年MM月dd日", { locale: ja })
                      : "日付なし"}
                  </time>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {viewCount}回表示
                  </div>
                  {frontMatter.readingTime && (
                    <>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {frontMatter.readingTime}分で読めます
                      </div>
                    </>
                  )}
                </div>
                
                {/* アイキャッチ画像 - より大きく */}
                {frontMatter.thumbnail && (
                  <div className="relative h-64 md:h-96 bg-[#e2ddd5] rounded-lg overflow-hidden mb-6">
                    <Image 
                      src={frontMatter.thumbnail} 
                      alt={frontMatter.title || "記事のサムネイル"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}
                
                {/* 執筆者情報 - よりリッチに */}
                <div className="flex items-center p-4 bg-[#f9f7f5] rounded-md border border-[#e2ddd5]">
                  <div className="w-14 h-14 bg-[#d2c6b2] rounded-full mr-4 flex items-center justify-center text-[#2d2926] font-bold text-xl">
                    そ
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#2d2926] text-lg">そた</p>
                    <p className="text-sm text-[#6f4e37] mb-1">ガジェットと暮らしをテーマに発信するブロガー</p>
                    <div className="flex space-x-2">
                      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-[#6f4e37] hover:text-[#5a3e2c]">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-[#6f4e37] hover:text-[#5a3e2c]">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </header>
              
              {/* 記事本文 - スタイル強化 */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none prose-headings:text-[#2d2926] prose-headings:font-bold prose-headings:border-b prose-headings:border-[#e2ddd5] prose-headings:pb-2 prose-headings:mb-4 prose-a:text-[#6f4e37] prose-a:decoration-[#d2c6b2] prose-a:decoration-2 prose-a:font-medium prose-blockquote:border-l-[#bd8c7d] prose-blockquote:bg-[#f9f7f5] prose-blockquote:py-1 prose-strong:text-[#6f4e37] prose-strong:font-bold prose-code:text-[#bd8c7d] prose-code:bg-[#f9f7f5] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                  <MDXContent mdxSource={mdxSource} />
                </div>
              </div>
              
              {/* シェアボタン - デザイン改善 */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-[#e2ddd5]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="font-medium text-[#3c3732]">この記事をシェア:</p>
                  <div className="flex space-x-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontMatter.title)}&url=${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#1877F2] text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href={`https://line.me/R/msg/text/?${encodeURIComponent(frontMatter.title)}%0D%0A${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#06C755] text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.433.596-.064.021-.13.031-.196.031-.211 0-.41-.101-.535-.275l-2.449-3.105v2.753c0 .346-.283.629-.63.629-.345 0-.627-.283-.627-.629V8.108c0-.272.174-.509.433-.595.064-.022.13-.032.193-.032.213 0 .413.098.537.272l2.449 3.104V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-5.741 0c0 .346-.282.629-.631.629-.345 0-.627-.283-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.283-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .346-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                      </svg>
                    </a>
                    <a 
                      href={`mailto:?subject=${encodeURIComponent(frontMatter.title)}&body=${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                      className="w-10 h-10 flex items-center justify-center bg-[#6f4e37] text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
            
            {/* 関連記事 */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-[#2d2926] mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#bd8c7d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  関連記事
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post.slug}
                      className="block group"
                    >
                      <div className="card h-full flex flex-col">
                        <div className="relative h-40 bg-[#e2ddd5] flex items-center justify-center">
                          <span className="text-[#6f4e37]">記事のサムネイル</span>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="text-lg font-medium text-[#2d2926] group-hover:text-[#6f4e37] transition-colors duration-300 mb-2 line-clamp-2">
                            {post.frontMatter.title}
                          </h3>
                          <time className="text-sm text-[#6f4e37] block mt-auto">
                            {format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* サイドバー - 新規追加 */}
          <div className="hidden lg:block">
            <div className="space-y-8 sticky top-24">
              {/* 目次 */}
              {headings.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2ddd5]">
                  <h3 className="text-lg font-bold text-[#2d2926] mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#bd8c7d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    目次
                  </h3>
                  <nav className="text-sm">
                    <ul className="space-y-3">
                      {headings.map((heading, index) => (
                        <li 
                          key={index} 
                          className={`${
                            heading.level === 1 ? "" : 
                            heading.level === 2 ? "ml-2" : 
                            heading.level === 3 ? "ml-4" : 
                            "ml-6"
                          }`}
                        >
                          <a 
                            href={`#${heading.id}`} 
                            className="text-[#7d5a46] hover:text-[#5a3e2c] transition-colors duration-150 flex items-center group"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#bd8c7d] mr-2 group-hover:bg-[#7d5a46] transition-colors"></span>
                            <span className="group-hover:underline underline-offset-2">{heading.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
              
              {/* 人気記事 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2ddd5]">
                <h3 className="text-lg font-bold text-[#2d2926] mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#bd8c7d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  人気記事
                </h3>
                <div className="space-y-5">
                  {popularPosts.map((post, index) => (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post.slug}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full border-2 border-[#f1eeea]">
                        {post.frontMatter.thumbnail ? (
                          <img 
                            src={post.frontMatter.thumbnail}
                            alt={post.frontMatter.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#f1eeea] flex items-center justify-center text-[#7d5a46] font-medium">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#2d2926] font-medium line-clamp-2 group-hover:text-[#7d5a46] transition-colors">
                          {post.frontMatter.title}
                        </h4>
                        <span className="text-xs text-[#6f4e37]">
                          {post.frontMatter.date && format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", { locale: ja })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* プロモーションエリア */}
              <div className="bg-[#f1eeea] p-6 rounded-xl shadow-sm border border-[#e2ddd5] text-center">
                <h3 className="text-lg font-bold text-[#2d2926] mb-2">ブログをサポートする</h3>
                <p className="text-sm text-[#6f4e37] mb-4">
                  当ブログのコンテンツを気に入っていただけましたら、サポートいただけるとうれしいです。
                </p>
                <a 
                  href="https://www.buymeacoffee.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-[#FFDD00] text-[#2d2926] px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors w-full"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 884 1279" fill="none">
                    <path d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z" fill="#0D0C22"></path>
                    <path d="M803.896 388.891L802.916 389.166L803.896 388.891Z" fill="#0D0C22"></path>
                    <path d="M791.484 297.377C791.359 297.361 791.237 297.332 791.118 297.29C791.111 297.371 791.111 297.453 791.118 297.534C791.252 297.516 791.379 297.462 791.484 297.377Z" fill="#0D0C22"></path>
                    <path d="M791.113 297.529H791.244V297.447L791.113 297.529Z" fill="#0D0C22"></path>
                    <path d="M803.111 388.726L804.591 387.883L805.142 387.573L805.641 387.04C804.702 387.444 803.846 388.016 803.111 388.726Z" fill="#0D0C22"></path>
                    <path d="M793.669 299.515L792.223 298.138L791.243 297.605C791.77 298.535 792.641 299.221 793.669 299.515Z" fill="#0D0C22"></path>
                    <path d="M430.019 1186.18C428.864 1186.68 427.852 1187.46 427.076 1188.45L427.988 1187.87C428.608 1187.3 429.485 1186.63 430.019 1186.18Z" fill="#0D0C22"></path>
                    <path d="M641.187 1144.63C641.187 1143.33 640.551 1143.57 640.705 1148.21C640.705 1147.84 640.86 1147.46 640.929 1147.1C641.015 1146.27 641.084 1145.46 641.187 1144.63Z" fill="#0D0C22"></path>
                    <path d="M619.284 1186.18C618.129 1186.68 617.118 1187.46 616.342 1188.45L617.254 1187.87C617.873 1187.3 618.751 1186.63 619.284 1186.18Z" fill="#0D0C22"></path>
                    <path d="M281.304 1196.06C280.427 1195.3 279.354 1194.8 278.207 1194.61C279.136 1195.06 280.065 1195.51 280.684 1195.85L281.304 1196.06Z" fill="#0D0C22"></path>
                    <path d="M247.841 1164.01C247.704 1162.66 247.288 1161.35 246.619 1160.16C247.093 1161.39 247.489 1162.66 247.806 1163.94L247.841 1164.01Z" fill="#0D0C22"></path>
                    <path d="M472.623 590.836C426.682 583.931 377.504 620.178 372.844 667.052C368.902 783.634 480.045 738.125 478.673 816.571C477.691 915.687 367.347 863.828 340.147 913.868C337.108 917.414 334.071 920.782 331.189 924.287L333.219 920.782C270.452 1011.77 252.417 920.782 295.686 898.796C316.551 883.807 346.831 850.687 355.981 825.654C377.055 746.271 32.4189 629.889 13.017 865.733C-1.76141 1050.2 140.758 1200 331.946 1200C469.305 1200 600.485 1193.54 759.85 1120.96C674.795 1010.77 599.598 934.159 475.135 854.783C484.276 850.972 493.204 845.022 501.532 837.695C591.594 745.632 751.89 843.744 819.104 720.853C714.187 726.615 625.645 659.989 625.645 659.989C625.645 659.989 668.028 600.832 710.59 591.233C753.151 581.634 906.79 519.657 872.126 429.485C837.463 339.314 772.757 335.126 702.236 363.435C631.715 391.744 610.607 476.729 610.607 476.729C610.607 476.729 456.38 596.755 472.623 590.836Z" fill="#0D0C22"></path>
                  </svg>
                  コーヒーをごちそうする
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
