import Layout from "@/components/Layout";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2ddd5]">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-64 md:h-auto bg-[#f1eeea] flex items-center justify-center p-6">
              <div className="w-48 h-48 rounded-full bg-[#d2c6b2] flex items-center justify-center text-[#2d2926] text-7xl font-bold">
                そ
              </div>
            </div>
            <div className="p-8 md:p-10 md:w-2/3">
              <h1 className="text-3xl font-bold text-[#2d2926] mb-6 border-b pb-4 border-[#e2ddd5]">
                Profile
              </h1>

              <div className="prose max-w-none prose-headings:text-[#2d2926] prose-a:text-[#6f4e37]">
                <p className="text-lg text-[#3c3732] mb-6">
                  はじめまして。
                </p>
                <p className="text-[#3c3732] mb-6">
                  ガジェットと暮らしをテーマのガジェットブログ『あああ』を運営しています、そたです。
                </p>
                <p className="text-[#3c3732] mb-6">
                  このページでは、自身のプロフィールや当ブログについて紹介していきます。
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="w-32 font-medium text-[#2d2926]">名前</div>
                  <div className="text-[#3c3732]">そた</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 font-medium text-[#2d2926]">現在地</div>
                  <div className="text-[#3c3732]">東京</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 font-medium text-[#2d2926]">年齢</div>
                  <div className="text-[#3c3732]">30代</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2ddd5] p-8">
          <h2 className="text-2xl font-bold text-[#2d2926] mb-6 border-b pb-4 border-[#e2ddd5]">
            SNS
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-[#f9f7f5] rounded-md hover:bg-[#f1eeea] transition-colors group"
            >
              <div className="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[#2d2926] group-hover:text-[#6f4e37]">X (Twitter)</div>
                <div className="text-sm text-[#6f4e37]">@example</div>
              </div>
            </a>

            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-[#f9f7f5] rounded-md hover:bg-[#f1eeea] transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[#2d2926] group-hover:text-[#6f4e37]">Instagram</div>
                <div className="text-sm text-[#6f4e37]">@example</div>
              </div>
            </a>

            <a 
              href="https://youtube.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-[#f9f7f5] rounded-md hover:bg-[#f1eeea] transition-colors group"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[#2d2926] group-hover:text-[#6f4e37]">YouTube</div>
                <div className="text-sm text-[#6f4e37]">@example</div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e2ddd5] p-8">
          <h2 className="text-2xl font-bold text-[#2d2926] mb-6 border-b pb-4 border-[#e2ddd5]">
            お問い合わせ
          </h2>

          <div className="prose max-w-none">
            <p className="text-[#3c3732] mb-6">
              製品レビューのご依頼やお問い合わせは、以下の方法でご連絡ください。
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Link href="/contact" className="btn-primary text-center">
              お問い合わせフォーム
            </Link>
            <a 
              href="https://twitter.com/messages/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-[#1a91da] transition-colors text-center flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              X (Twitter) DM
            </a>
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-center flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058z" clipRule="evenodd" />
              </svg>
              Instagram DM
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
