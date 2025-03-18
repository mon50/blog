import Link from "next/link";
import dynamic from "next/dynamic";

// クライアントコンポーネントを動的にインポート
const SearchBar = dynamic(() => import("./SearchBar"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9f7f5]">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#e2ddd5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-gray-800">Gadget Blog</span>
            </Link>
            
            {/* デスクトップメニュー */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
                Profile
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 font-medium">
                Privacy Policy
              </Link>
              
              {/* 検索ボタン */}
              <button 
                type="button"
                className="text-gray-600 hover:text-gray-900"
                id="search-button"
                aria-expanded="false"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* モバイルメニューボタン */}
            <div className="flex items-center md:hidden">
              <button 
                type="button"
                className="text-gray-600 hover:text-gray-900 p-2"
                aria-label="メニューを開く"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 検索バー */}
          <div className="pt-2 pb-4 hidden md:block" id="search-container">
            <SearchBar />
          </div>
        </div>
        
        {/* モバイルメニュー - 初期状態では非表示 */}
        <div className="hidden md:hidden" id="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1 border-t">
            <Link href="/" className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/contact" className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/profile" className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900">
              Profile
            </Link>
            <Link href="/privacy" className="block py-2 text-base font-medium text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <div className="pt-2">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <footer className="bg-[#2d2926] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Gadget Blog</h3>
              <p className="text-gray-300 mb-4">最新のガジェット情報、レビュー、比較をお届けするブログです。</p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">カテゴリー</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tag/gadget" className="text-gray-300 hover:text-white">
                    ガジェット
                  </Link>
                </li>
                <li>
                  <Link href="/tag/review" className="text-gray-300 hover:text-white">
                    レビュー
                  </Link>
                </li>
                <li>
                  <Link href="/tag/howto" className="text-gray-300 hover:text-white">
                    使い方ガイド
                  </Link>
                </li>
                <li>
                  <Link href="/tag/news" className="text-gray-300 hover:text-white">
                    ニュース
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">サイト情報</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/profile" className="text-gray-300 hover:text-white">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
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
                className="inline-flex items-center bg-[#FFDD00] text-[#2d2926] px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
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
      </footer>
      
      {/* 検索とメニューの表示・非表示を制御するためのクライアントサイドスクリプト */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // 検索ボタンとコンテナ
              const searchButton = document.getElementById('search-button');
              const searchContainer = document.getElementById('search-container');
              
              // 検索ボタンクリックイベント
              if (searchButton && searchContainer) {
                searchContainer.classList.add('hidden');
                
                searchButton.addEventListener('click', function() {
                  searchContainer.classList.toggle('hidden');
                  const expanded = searchContainer.classList.contains('hidden') ? 'false' : 'true';
                  searchButton.setAttribute('aria-expanded', expanded);
                });
              }
              
              // モバイルメニューボタンとメニュー
              const mobileMenuButton = document.querySelector('button[aria-label="メニューを開く"]');
              const mobileMenu = document.getElementById('mobile-menu');
              
              // モバイルメニューボタンクリックイベント
              if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                  mobileMenu.classList.toggle('hidden');
                  const expanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
                  mobileMenuButton.setAttribute('aria-expanded', expanded);
                });
              }
            });
          `,
        }}
      />
    </div>
  );
}
