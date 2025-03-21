import Image, { ImageProps } from "next/image";
import React, { ReactNode } from "react";

import AffiliateLink from "@/components/AffiliateLink";
import Tweet from "@/components/Tweet";
import Date from "@/components/Date";
import YouTube from "@/components/Youtube";

// Noteコンポーネント
type NoteType = "info" | "warn" | "alert";

interface NoteProps {
  children: ReactNode;
  type?: NoteType;
}

const Note: React.FC<NoteProps> = ({ children, type = "info" }) => {
  // タイプに基づくスタイルとアイコン
  const styles = {
    info: {
      containerClass: "bg-[#f1eeea] border-[#d2c6b2] text-[#2d2926]",
      iconClass: "text-[#7d5a46]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
      title: "情報",
    },
    warn: {
      containerClass: "bg-[#f9f7f5] border-[#bd8c7d] text-[#3c3732]",
      iconClass: "text-[#bd8c7d]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: "注意",
    },
    alert: {
      containerClass: "bg-[#e2ddd5] border-[#7d5a46] text-[#2d2926]",
      iconClass: "text-[#5a3e2c]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
      title: "警告",
    },
  };

  const { containerClass, icon, title } = styles[type];

  return (
    <div className={`p-4 mb-6 rounded-lg border-l-4 ${containerClass}`}>
      <div className="flex items-center mb-2">
        {icon}
        <span className="ml-2 font-medium">{title}</span>
      </div>
      <div className="ml-6">{children}</div>
    </div>
  );
};


// MDXコンポーネント
const MDXComponents = {
  Image: (props: ImageProps) => {
    const { alt = "", style, className, ...rest } = props;
    // width/heightが指定されていない場合は、aspectRatio: '3/2'のスタイルを追加
    const hasExplicitDimensions = typeof props.width === 'number' && typeof props.height === 'number';
    
    const containerStyle = !hasExplicitDimensions ? 
      { ...style, aspectRatio: '3/2', position: 'relative' as const, display: 'block' } : 
      style;
    
    // スタイルに基づいて画像を表示
    if (!hasExplicitDimensions) {
      return (
        <div style={containerStyle} className={className}>
          <Image 
            alt={alt} 
            fill
            className="object-cover"
            {...rest} 
          />
        </div>
      );
    }
    
    return <Image alt={alt} className={className} style={style} {...rest} />;
  },
  AffiliateLink: AffiliateLink,
  Tweet: Tweet,
  YouTube: YouTube,
  Date: Date,
  Note: Note,

  // 表関連のコンポーネント
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table {...props} className="table-auto border-collapse w-full">
        {props.children}
      </table>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} className="bg-gray-50">
      {props.children}
    </thead>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th {...props} className="border px-4 py-2 bg-gray-200">
      {props.children}
    </th>
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} className="even:bg-gray-50">
      {props.children}
    </tr>
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td {...props} className="border px-4 py-2">
      {props.children}
    </td>
  ),

  // カスタムラッパー
  wrapper: ({ children }: { children: ReactNode }) => {
    const content = React.Children.toArray(children);

    // シンプルに処理するために文字列に変換
    const processedContent = processNotes(content);

    return <>{processedContent}</>;
  },
};

// Note処理のためのヘルパー関数
function processNotes(children: React.ReactNode[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let currentNoteType: NoteType | null = null;
  let currentNoteContent: React.ReactNode[] = [];
  let i = 0;

  while (i < children.length) {
    const child = children[i];

    if (typeof child === "string") {
      // 開始タグを検出
      const startMatch = child.match(/:::note\s+(info|warn|alert)/);
      if (startMatch && !currentNoteType) {
        currentNoteType = startMatch[1] as NoteType;

        // 開始タグの後のテキストを処理
        const restContent = child
          .replace(/:::note\s+(info|warn|alert)/, "")
          .trim();
        if (restContent) {
          currentNoteContent.push(restContent);
        }
      }
      // 終了タグを検出
      else if (child.includes(":::") && currentNoteType) {
        // 終了タグ前のテキストを取得
        const beforeEnd = child.split(":::")[0].trim();
        if (beforeEnd) {
          currentNoteContent.push(beforeEnd);
        }

        // Noteを追加
        result.push(
          <Note key={`note-${result.length}`} type={currentNoteType}>
            {currentNoteContent}
          </Note>,
        );

        // 終了タグ後のテキストを処理
        const afterEnd = child.split(":::").slice(1).join(":::").trim();
        if (afterEnd) {
          result.push(afterEnd);
        }

        // リセット
        currentNoteType = null;
        currentNoteContent = [];
      }
      // 通常のテキスト
      else if (currentNoteType) {
        currentNoteContent.push(child);
      } else {
        result.push(child);
      }
    }
    // 非テキスト要素
    else if (currentNoteType) {
      currentNoteContent.push(child);
    } else {
      result.push(child);
    }

    i++;
  }

  // 終了していないNoteがあれば追加
  if (currentNoteType) {
    result.push(
      <Note key={`note-${result.length}`} type={currentNoteType}>
        {currentNoteContent}
      </Note>,
    );
  }

  return result;
}

export default MDXComponents;
