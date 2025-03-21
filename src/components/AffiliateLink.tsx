import React from "react";
import Image from "next/image";

interface AffiliateLinkProps {
  title: string;
  imageUrl: string;
  price?: string;
  description?: string;
  rating?: number;
  amazonUrl?: string;
  rakutenUrl?: string;
  yahooUrl?: string;
}

const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  title,
  imageUrl,
  price,
  description,
  rating = 0,
  amazonUrl,
  rakutenUrl,
  yahooUrl,
}) => {
  const shortTitle = title.length > 50 ? title.slice(0, 50) + "..." : title;
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // 塗りつぶし星
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    // 半分星
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGradient)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>,
      );
    }

    // 空星
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    return stars;
  };

  return (
    <div className="bg-white border border-[#e2ddd5] rounded-lg shadow-md overflow-hidden my-8">
      <div className="p-4 bg-[#f9f7f5] border-b border-[#e2ddd5] flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[#bd8c7d] mr-2"
          fill="currentColor"
          viewBox="0 0 576 512"
        >
          <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
        </svg>
        <span className="font-medium text-[#2d2926]">商品紹介</span>
      </div>
      <div className="md:flex">
        <div className="md:w-1/3 relative bg-[#f1eeea] flex items-center justify-center" style={{ aspectRatio: '3/2' }}>
          {imageUrl ? (
            <div className="relative w-full h-full" style={{ aspectRatio: '3/2' }}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain p-4"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full text-[#d2c6b2]">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className="text-xl font-bold mt-[-0.5rem] mb-3 text-[#2d2926]">
            {shortTitle}
          </h3>

          {rating > 0 && (
            <div className="flex items-center mb-3">
              <div className="flex mr-1">{renderStars(rating)}</div>
              <span className="text-sm text-[#6f4e37]">
                {rating.toFixed(1)}
              </span>
            </div>
          )}

          {price && (
            <div className="text-lg font-bold text-[#c13a28] mb-3">{price}</div>
          )}

          {description && (
            <p className="text-[#6f4e37] mb-4 text-sm line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex flex-col md:flex-row gap-3 mt-4">
            {amazonUrl && (
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center px-5 py-2.5 bg-[#FFE5CC] text-[#B12704] text-base rounded-md font-medium hover:bg-[#FFD1A3] transition-colors"
              >
                Amazonで見る
              </a>
            )}
            {rakutenUrl && (
              <a
                href={rakutenUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center px-5 py-2.5 bg-[#FFF0F0] text-[#BF0000] text-base rounded-md font-medium hover:bg-[#FFD6D6] transition-colors"
              >
                楽天市場で見る
              </a>
            )}

            {yahooUrl && (
              <a
                href={yahooUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center px-5 py-2.5 bg-[#FF0033] text-white rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Yahoo!
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-3 bg-[#f9f7f5] border-t border-[#e2ddd5] text-xs text-[#6f4e37] text-center">
        ※価格や商品情報は記事公開時点のものであり、変更される場合があります。
      </div>
    </div>
  );
};

export default AffiliateLink;
