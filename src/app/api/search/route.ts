import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/mdx";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "検索クエリが必要です" }, { status: 400 });
  }

  try {
    const searchResults = await searchPosts(query);
    
    // クライアントに必要な情報だけを返す
    const formattedResults = searchResults.map(post => ({
      slug: post.slug,
      title: post.frontMatter.title,
      excerpt: post.frontMatter.excerpt,
      date: post.frontMatter.date 
        ? format(parseISO(post.frontMatter.date), "yyyy年MM月dd日", { locale: ja })
        : "日付なし",
      tags: post.frontMatter.tags || [],
      thumbnail: post.frontMatter.thumbnail || null,
      viewCount: post.frontMatter.viewCount || 0
    }));
    
    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "検索処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}