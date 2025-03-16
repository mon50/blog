import MDXContent from "@/app/blog/[slug]/MDXcontent";
import Layout from "@/components/Layout";
import { getPostBySlug, serializeMDX } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { ParsedUrlQuery } from "querystring";

interface PageParams extends ParsedUrlQuery {
  slug: string;
}

export default async function BlogPost({ params }: { params: PageParams }) {
  const { slug } = params;
  const { frontMatter, content } = getPostBySlug(slug);
  const mdxSource = await serializeMDX(content);

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            TITLE:{frontMatter.title}
          </h1>
          <div className="flex items-center text-gray-600">
            <time dateTime={frontMatter.date}>
              TIME:
              {frontMatter.date
                ? format(parseISO(frontMatter.date), "MMMM d, yyyy")
                : "日付なし"}
            </time>

            <span className="mx-2">•</span>
            <div className="flex flex-wrap">
              {frontMatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        <div className="prose prose-lg max-w-none">
          <MDXContent mdxSource={mdxSource} />
        </div>
      </article>
    </Layout>
  );
}
