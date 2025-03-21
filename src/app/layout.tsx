import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

// 丸ゴシック体（カフェっぽい雰囲気に合う）
const mplusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mplus-rounded",
  display: "swap",
});

// サブフォント
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// モノスペースフォント
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gadget Blog",
  description: "最新のガジェット情報、レビュー、比較をお届けするブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${mplusRounded.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
