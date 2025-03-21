import Link from "next/link";
import Layout from "@/components/Layout";
import { getPostsByCategory } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const categories = {
    gadget: {
      title: "ガジェット",
      description:
        "",
      icon: "📱",
    },
    furniture: {
      title: "家具",
      description:
        "",
      icon: "🪑",
    },
    travel: {
      title: "旅行",
      description:
        "",
      icon: "🏖️",
    },
    chat: {
      title: "雑談",
      description:
        "",
      icon: "🚀",
    },
  };

  if (!(slug in categories)) {
    notFound();
  }

  const posts = await getPostsByCategory(categories[slug as keyof typeof categories].title);
  const category = categories[slug as keyof typeof categories];

  return (
    <Layout>
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-4xl mb-4">{category.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {category.title}
          </h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              このカテゴリーの記事はまだありません。
            </p>
          </div>
        ) : (
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
                        post.frontMatter.tags.slice(0, 2).map((tag: string) => (
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
                      {format(parseISO(post.frontMatter.date), "yyyy/MM/dd", {
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
        )}
      </div>
    </Layout>
  );
}
