import React from "react";

interface TweetProps {
  id: string;
}

const Tweet: React.FC<TweetProps> = ({ id }) => {
  React.useEffect(() => {
    // Twitterウィジェットの読み込み
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="my-6">
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/i/status/${id}`}></a>
      </blockquote>
    </div>
  );
};

export default Tweet;
