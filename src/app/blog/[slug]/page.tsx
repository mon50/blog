import MDXContent from "@/app/blog/[slug]/MDXcontent";
import Layout from "@/components/Layout";
import { getPostBySlug, getAllPosts, serializeMDX } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";

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

  // 記事の表示回数（実際の実装ではDBから取得する）
  const viewCount = Math.floor(Math.random() * 100) + 10; // ダミーデータ

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
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
        
        <article className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2ddd5]">
          <header className="p-6 md:p-8 border-b border-[#e2ddd5]">
            {/* タグ */}
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
            
            {/* タイトル */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2d2926] mb-4 leading-tight">
              {frontMatter.title}
            </h1>
            
            {/* メタ情報 */}
            <div className="flex items-center text-[#6f4e37] text-sm mb-2">
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
            </div>
            
            {/* 執筆者情報（オプション） */}
            <div className="flex items-center mt-6 p-4 bg-[#f9f7f5] rounded-md border border-[#e2ddd5]">
              <div className="w-12 h-12 bg-[#d2c6b2] rounded-full mr-4 flex items-center justify-center text-[#2d2926] font-bold text-xl">
                そ
              </div>
              <div>
                <p className="font-medium text-[#2d2926]">そた</p>
                <p className="text-sm text-[#6f4e37]">ガジェットと暮らしをテーマに発信するブロガー</p>
              </div>
            </div>
          </header>
          
          {/* 記事本文 */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none prose-headings:text-[#2d2926] prose-headings:font-medium prose-a:text-[#6f4e37] prose-a:decoration-[#d2c6b2] prose-a:decoration-2 prose-blockquote:border-l-[#bd8c7d] prose-blockquote:bg-[#f9f7f5] prose-blockquote:py-1 prose-blockquote:italic prose-strong:text-[#6f4e37]">
              <MDXContent mdxSource={mdxSource} />
            </div>
          </div>
          
          {/* シェアボタン */}
          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-[#e2ddd5]">
            <div className="flex items-center justify-between">
              <p className="font-medium text-[#3c3732]">この記事をシェア:</p>
              <div className="flex space-x-3">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontMatter.title)}&url=${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-[#f1eeea] rounded-md hover:bg-[#e2ddd5] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6f4e37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-[#f1eeea] rounded-md hover:bg-[#e2ddd5] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6f4e37]" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href={`https://line.me/R/msg/text/?${encodeURIComponent(frontMatter.title)}%0D%0A${encodeURIComponent(`https://example.com/blog/${slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-[#f1eeea] rounded-md hover:bg-[#e2ddd5] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6f4e37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.433.596-.064.021-.13.031-.196.031-.211 0-.41-.101-.535-.275l-2.449-3.105v2.753c0 .346-.283.629-.63.629-.345 0-.627-.283-.627-.629V8.108c0-.272.174-.509.433-.595.064-.022.13-.032.193-.032.213 0 .413.098.537.272l2.449 3.104V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-5.741 0c0 .346-.282.629-.631.629-.345 0-.627-.283-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.283-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .346-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
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
    </Layout>
  );
}
