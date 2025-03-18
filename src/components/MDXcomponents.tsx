import Image, { ImageProps } from "next/image";
import React, { ReactNode } from "react";

import AffiliateLink from "@/components/AffiliateLink";
import Tweet from "@/components/Tweet";
import Date from "@/components/Date";

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
      containerClass: "bg-blue-50 border-blue-300 text-blue-800",
      iconClass: "text-blue-500",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
      title: "情報"
    },
    warn: {
      containerClass: "bg-yellow-50 border-yellow-300 text-yellow-800",
      iconClass: "text-yellow-500",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: "注意"
    },
    alert: {
      containerClass: "bg-red-50 border-red-300 text-red-800",
      iconClass: "text-red-500",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
      title: "警告"
    }
  };

  const { containerClass, iconClass, icon, title } = styles[type];

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-md ${containerClass}`}>
      <div className="flex items-center mb-2">
        <span className={`mr-2 ${iconClass}`}>{icon}</span>
        <span className="font-bold">{title}</span>
      </div>
      <div className="ml-6">{children}</div>
    </div>
  );
};

// MDXコンポーネント
const MDXComponents = {
  Image: (props: ImageProps) => {
    const { alt = '', ...rest } = props;
    return <Image alt={alt} {...rest} />;
  },
  AffiliateLink: AffiliateLink,
  Tweet: Tweet,
  Date: Date,
  Note: Note,
  
  // カスタムラッパー
  wrapper: ({ children }: { children: ReactNode }) => {
    const content = React.Children.toArray(children);
    
    // シンプルに処理するために文字列に変換
    const processedContent = processNotes(content);
    
    return <>{processedContent}</>;
  }
};

// Note処理のためのヘルパー関数
function processNotes(children: React.ReactNode[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let currentNoteType: NoteType | null = null;
  let currentNoteContent: React.ReactNode[] = [];
  let i = 0;
  
  while (i < children.length) {
    const child = children[i];
    
    if (typeof child === 'string') {
      // 開始タグを検出
      const startMatch = child.match(/:::note\s+(info|warn|alert)/);
      if (startMatch && !currentNoteType) {
        currentNoteType = startMatch[1] as NoteType;
        
        // 開始タグの後のテキストを処理
        const restContent = child.replace(/:::note\s+(info|warn|alert)/, '').trim();
        if (restContent) {
          currentNoteContent.push(restContent);
        }
      }
      // 終了タグを検出
      else if (child.includes(':::') && currentNoteType) {
        // 終了タグ前のテキストを取得
        const beforeEnd = child.split(':::')[0].trim();
        if (beforeEnd) {
          currentNoteContent.push(beforeEnd);
        }
        
        // Noteを追加
        result.push(
          <Note key={`note-${result.length}`} type={currentNoteType}>
            {currentNoteContent}
          </Note>
        );
        
        // 終了タグ後のテキストを処理
        const afterEnd = child.split(':::').slice(1).join(':::').trim();
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
      }
      else {
        result.push(child);
      }
    }
    // 非テキスト要素
    else if (currentNoteType) {
      currentNoteContent.push(child);
    }
    else {
      result.push(child);
    }
    
    i++;
  }
  
  // 終了していないNoteがあれば追加
  if (currentNoteType) {
    result.push(
      <Note key={`note-${result.length}`} type={currentNoteType}>
        {currentNoteContent}
      </Note>
    );
  }
  
  return result;
}

export default MDXComponents;