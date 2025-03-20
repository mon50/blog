"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 検索処理
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() === "") {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        if (!response.ok) throw new Error("検索に失敗しました");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // 検索結果の外側をクリックしたら結果を閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="記事を検索..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {showResults && query.trim() !== "" && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="flex justify-center items-center py-6">
              <svg
                className="animate-spin h-5 w-5 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-gray-600">検索中...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              検索結果がありません
            </div>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result.slug} className="border-b last:border-b-0">
                  <Link
                    href={`/blog/${result.slug}`}
                    className="block p-4 hover:bg-gray-50"
                    onClick={() => setShowResults(false)}
                  >
                    <p className="font-medium text-gray-800 mb-1">
                      {result.title}
                    </p>
                    {result.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {result.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{result.date}</p>
                  </Link>
                </li>
              ))}
              <li className="border-t">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="block p-3 text-center text-blue-600 hover:bg-gray-50 font-medium text-sm"
                  onClick={() => setShowResults(false)}
                >
                  すべての検索結果を見る
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
