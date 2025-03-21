import { getAllPosts, getAllTags } from "@/lib/mdx";
import Layout from "@/components/Layout";
import Link from "next/link";
import TagLink from "@/components/TagLink";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2d2926] mb-6">
          すべての記事
        </h1>

        {/* タグフィルター */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-[#2d2926] mb-3">
            タグで絞り込む
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="px-3 py-1.5 bg-[#f1eeea] text-[#6f4e37] rounded-md hover:bg-[#e2ddd5] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* 記事一覧 */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="overflow-hidden relative md:flex">
                  <div
                    className="md:w-1/3 relative bg-[#e2ddd5] overflow-hidden"
                    style={{ aspectRatio: "3/2" }}
                  >
                    {post.frontMatter.thumbnail ? (
                      <img
                        src={post.frontMatter.thumbnail}
                        alt={post.frontMatter.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="text-[#6f4e37]">記事のサムネイル</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 md:w-2/3">
                    <div className="flex flex-wrap mb-3">
                      {post.frontMatter.tags &&
                        post.frontMatter.tags.map((tag: string) => (
                          <span key={tag}>
                            <TagLink
                              tag={tag}
                              className="mr-2 mb-2 px-2 py-1 bg-[#f1eeea] text-[#6f4e37] text-xs rounded-md hover:bg-[#e2ddd5] transition-colors"
                            />
                          </span>
                        ))}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#2d2926] group-hover:text-[#6f4e37] transition-colors mb-2">
                      {post.frontMatter.title}
                    </h2>
                    <div className="flex items-center text-sm text-[#6f4e37] mb-3">
                      <time dateTime={post.frontMatter.date || ""}>
                        {post.frontMatter.date
                          ? format(
                              parseISO(post.frontMatter.date),
                              "yyyy/MM/dd",
                              { locale: ja },
                            )
                          : "日付なし"}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{post.frontMatter.viewCount || 0}回表示</span>
                    </div>
                    {post.frontMatter.excerpt && (
                      <p className="text-[#3c3732] mb-4 line-clamp-3">
                        {post.frontMatter.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center text-[#6f4e37] font-medium group-hover:text-[#5a3e2c]">
                      続きを読む
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
