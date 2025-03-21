"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar";

export default function Layout({
  children,
  heroMode = false,
}: {
  children: React.ReactNode;
  heroMode?: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // スクロール検出 - パフォーマンス最適化
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // スクロールイベントを間引く（スロットリング）
    let isScrolling = false;
    const throttledScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [scrolled]);

  // ホームページかどうか
  const isHomePage = pathname === "/";

  // ヘッダークラス - ホームページのHero表示用
  const headerClasses =
    isHomePage && heroMode && !scrolled
      ? "bg-transparent absolute top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-center w-full"
      : "bg-white shadow-sm sticky top-0 z-50 border-b border-[#e2ddd5] transition-all duration-500 ease-in-out";

  // 検索ボタンをクリックしたとき
  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
    // 検索が表示されたらフォーカスする
    if (!searchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // モバイルメニュー表示切替
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f5]">
      <header className={headerClasses}>
        <div
          className={`${isHomePage && heroMode && !scrolled ? "w-full max-w-4xl" : "max-w-6xl w-full"} mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span
                className={`font-bold text-xl ${isHomePage && heroMode && !scrolled ? "text-white" : "text-gray-800"}`}
              >
                Gadget Blog
              </span>
            </Link>

            {/* デスクトップメニュー */}
            <div
              className={`hidden md:flex items-center ${isHomePage && heroMode && !scrolled ? "space-x-5" : "space-x-7"}`}
            >
              <Link
                href="/"
                className={`font-medium ${
                  isHomePage && heroMode && !scrolled
                    ? "text-white hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <Link
                href="/contact"
                className={`font-medium ${
                  isHomePage && heroMode && !scrolled
                    ? "text-white hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contact
              </Link>
              <Link
                href="/profile"
                className={`font-medium ${
                  isHomePage && heroMode && !scrolled
                    ? "text-white hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile
              </Link>
              <Link
                href="/privacy"
                className={`font-medium ${
                  isHomePage && heroMode && !scrolled
                    ? "text-white hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Privacy Policy
              </Link>

              {/* 検索ボタン - PCの場合は虫眼鏡のみ表示 */}
              <button
                type="button"
                className={`transition-all duration-300 relative overflow-hidden ${
                  isHomePage && heroMode && !scrolled
                    ? "text-white hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={toggleSearch}
                aria-expanded={searchExpanded ? "true" : "false"}
              >
                <span
                  className={`transition-all duration-500 flex items-center justify-center transform ${searchExpanded ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
                  style={{ width: "20px", height: "20px" }}
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <span
                  className={`absolute inset-0 transition-all duration-500 flex items-center justify-center transform ${searchExpanded ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
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
                </span>
              </button>
            </div>

            {/* モバイルメニューボタン */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className={`p-2 ${
                  isHomePage && heroMode && !scrolled
                    ? "text-white hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="メニューを開く"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen ? "true" : "false"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* PC用検索バー - クリックで表示/非表示 */}
          <div
            className={`pt-2 pb-4 hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${searchExpanded ? "h-16 opacity-100" : "h-0 opacity-0"}`}
          >
            <div className="transform-gpu will-change-transform animate-slideDown">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* モバイルメニュー - 改良版 */}
        <div
          className={`md:hidden overflow-hidden ${mobileMenuOpen ? "block" : "hidden h-0"}`}
        >
          <div
            className={`${mobileMenuOpen ? "animate-slideDown" : ""} transform-gpu will-change-transform`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1 border-t bg-[#f9f7f5]">
              <Link
                href="/"
                className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/profile"
                className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/privacy"
                className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <div className="pt-4 pb-2">
                <SearchBar />
              </div>

              {/* 人気記事ランキング - モバイル用 */}
              <div className="mt-6 pt-4 border-t border-[#e2ddd5]">
                <h3 className="text-lg font-bold text-[#2d2926] mb-4">
                  人気記事ランキング
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#e2ddd5] flex items-center justify-center rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-in-out">
                      <span className="text-[#6f4e37] text-xs">サムネイル</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#2d2926] line-clamp-2">
                        <Link
                          href="/blog/demo-news1"
                          className="hover:text-[#7d5a46]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          最新のガジェットトレンドと2025年の予測
                        </Link>
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-[#6f4e37]">2024.3.1</span>
                        <span className="mx-2 text-xs text-[#6f4e37]">•</span>
                        <span className="text-xs text-[#6f4e37]">
                          182 views
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#e2ddd5] flex items-center justify-center rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-in-out">
                      <span className="text-[#6f4e37] text-xs">サムネイル</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#2d2926] line-clamp-2">
                        <Link
                          href="/blog/demo-review1"
                          className="hover:text-[#7d5a46]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          最新ワイヤレスイヤホン比較レビュー
                        </Link>
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-[#6f4e37]">
                          2024.2.15
                        </span>
                        <span className="mx-2 text-xs text-[#6f4e37]">•</span>
                        <span className="text-xs text-[#6f4e37]">
                          156 views
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#e2ddd5] flex items-center justify-center rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-in-out">
                      <span className="text-[#6f4e37] text-xs">サムネイル</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#2d2926] line-clamp-2">
                        <Link
                          href="/blog/first-post"
                          className="hover:text-[#7d5a46]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          新しいガジェットブログをはじめました
                        </Link>
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-[#6f4e37]">2024.1.1</span>
                        <span className="mx-2 text-xs text-[#6f4e37]">•</span>
                        <span className="text-xs text-[#6f4e37]">
                          122 views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8">
        {children}
      </main>

      <footer className="bg-[#2d2926] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg text-gray-100 font-semibold mb-4">Gadget Blog</h3>
              <p className="text-gray-300 mb-4">
                最新のガジェット情報、レビュー、比較をお届けするブログです。
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg text-gray-100 font-semibold mb-4">カテゴリー</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/tag/gadget"
                    className="text-gray-300 hover:text-white"
                  >
                    ガジェット
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tag/review"
                    className="text-gray-300 hover:text-white"
                  >
                    レビュー
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tag/howto"
                    className="text-gray-300 hover:text-white"
                  >
                    使い方ガイド
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tag/news"
                    className="text-gray-300 hover:text-white"
                  >
                    ニュース
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-gray-100 font-semibold mb-4">サイト情報</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <p className="text-gray-300 mb-4 md:mb-0">
                © {new Date().getFullYear()} Gadget Blog. All rights reserved.
              </p>
              <a
      href="https://www.buymeacoffee.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center bg-[#FFDD00] text-[#2d2926] px-4 py-2 rounded-md font-medium transition-colors w-30"
    >
      <img src="/icons/bmc-button.svg" alt="Buy Me a Coffee" className="h-10 w-full" />
    </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
