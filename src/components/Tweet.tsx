import React from "react";

interface TweetProps {
  id: string;
  theme?: "light" | "dark";
  align?: "center" | "left" | "right";
}

const Tweet: React.FC<TweetProps> = ({ id, theme = "light", align = "center" }) => {
  const tweetRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const renderTweet = React.useCallback(() => {
    if (tweetRef.current && window.twttr) {
      // 既存の内容をクリア
      tweetRef.current.innerHTML = '';
      
      window.twttr.widgets
        .createTweet(id, tweetRef.current, {
          theme: theme,
          align: align,
          dnt: true, // DNTモード（トラッキング無効）
          lang: 'ja'
        })
        .then((el) => {
          setLoading(false);
          if (!el) {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [id, theme, align]);

  React.useEffect(() => {
    // TwitterウィジェットのAPI読み込み
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      
      script.onload = () => {
        if (tweetRef.current && window.twttr) {
          renderTweet();
        }
      };
      
      script.onerror = () => {
        setError(true);
        setLoading(false);
      };
      
      document.body.appendChild(script);
      
      return () => {
        // スクリプト読み込み中に別ページへ遷移した場合のクリーンアップ
        script.onload = null;
        script.onerror = null;
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else if (tweetRef.current) {
      renderTweet();
    }
  }, [id, theme, renderTweet]);

  return (
    <div className="my-8">
      <div 
        ref={tweetRef} 
        className={`overflow-hidden rounded-lg ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}
      />
      
      {loading && (
        <div className="flex justify-center items-center p-8 bg-gray-50 border rounded-lg">
          <svg className="animate-spin h-6 w-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">ツイートを読み込み中...</span>
        </div>
      )}
      
      {error && (
        <div className="p-6 bg-gray-50 border rounded-lg text-center">
          <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">ツイートを読み込めませんでした。</p>
          <a 
            href={`https://twitter.com/i/status/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline inline-flex items-center mt-2"
          >
            <span>Twitterで見る</span>
            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

// Windowオブジェクトに対してtwttrプロパティを追加
declare global {
  interface Window {
    twttr: {
      widgets: {
        createTweet: (
          id: string,
          element: HTMLElement,
          options?: {
            theme?: string;
            align?: string;
            dnt?: boolean;
            lang?: string;
          }
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

export default Tweet;
