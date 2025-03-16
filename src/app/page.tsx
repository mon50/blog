import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import Layout from "@/components/Layout";
import { parseISO, format } from "date-fns";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <Layout>
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exploring ideas, sharing insights, and documenting my journey.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="block group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-2">
                      {post.frontMatter.title}
                    </h3>
                    <time className="text-sm text-gray-600 mb-3 block">
                      {format(parseISO(post.frontMatter.date), "MMMM d, yyyy")}
                    </time>
                    {post.frontMatter.tags && (
                      <div className="flex flex-wrap mt-2">
                        {post.frontMatter.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
