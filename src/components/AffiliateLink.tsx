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
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // 塗りつぶし星
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // 半分星
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // 空星
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white border border-[#e2ddd5] rounded-lg shadow-md overflow-hidden my-8">
      <div className="p-4 bg-[#f9f7f5] border-b border-[#e2ddd5] flex items-center">
        <svg className="w-5 h-5 text-[#bd8c7d] mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm2 3H6a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1h-1v1a1 1 0 11-2 0V5H7v1a1 1 0 11-2 0V5z" clipRule="evenodd" />
        </svg>
        <span className="font-medium text-[#2d2926]">商品紹介</span>
      </div>
      <div className="md:flex">
        <div className="md:w-1/3 relative h-64 md:h-auto bg-[#f1eeea] flex items-center justify-center">
          {imageUrl ? (
            <div className="relative w-full h-64 md:h-full">
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
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className="text-xl font-bold mb-3 text-[#2d2926]">{title}</h3>
          
          {rating > 0 && (
            <div className="flex items-center mb-3">
              <div className="flex mr-1">
                {renderStars(rating)}
              </div>
              <span className="text-sm text-[#6f4e37]">{rating.toFixed(1)}</span>
            </div>
          )}
          
          {price && (
            <div className="text-lg font-bold text-[#c13a28] mb-3">
              {price}
            </div>
          )}
          
          {description && (
            <p className="text-[#6f4e37] mb-4 text-sm">{description}</p>
          )}
          
          <div className="flex flex-wrap gap-3 mt-4">
            {amazonUrl && (
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center px-5 py-2.5 bg-[#FF9900] text-[#2d2926] rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685h-.001zm3.186 7.705c-.209.189-.512.256-.75.096-1.058-.88-1.245-1.287-1.823-2.131-1.738 1.776-2.972 2.309-5.229 2.309-2.67 0-4.751-1.647-4.751-4.947 0-2.576 1.396-4.33 3.382-5.188 1.716-.761 4.113-.897 5.949-1.105v-.41c0-.753.06-1.642-.384-2.294-.385-.577-1.124-.815-1.775-.815-1.205 0-2.277.62-2.541 1.909-.054.293-.261.582-.545.596l-3.047-.333c-.258-.056-.545-.266-.469-.66.701-3.69 4.03-4.8 7.016-4.8 1.526 0 3.518.406 4.719 1.56 1.526 1.424 1.385 3.316 1.385 5.429v4.908c0 1.471.613 2.119 1.188 2.915.202.283.247.622-.01.833l-2.316 2.028h.001zm-13.205-5.414C4 12.694 4.086 13.086 4.086 13.5c0 4.5-4.5 4.5-6.25 5v-5.106C-.75 13.394.495 11.981 3.94 12.381z" />
                </svg>
                Amazonで見る
              </a>
            )}
            {rakutenUrl && (
              <a
                href={rakutenUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center px-5 py-2.5 bg-[#BF0000] text-white rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.552 6.238H16.93v2.51h4.625v1.598h-4.623v4.232h-1.96V4.64h6.58v1.598zM11.167 14.58h-1.96v-3.376H4.31V14.6h-1.96V4.638H4.31v4.867h4.897V4.66h1.96v9.92z" />
                </svg>
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
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.248 8.585l-3.293 5.11 1.413 6.04h-2.4l-1.2-4.832-3.227 4.833H4.44l4.24-5.968-1.287-5.352h2.32l1.08 4.259 3.067-4.259h2.389v.17z" />
                </svg>
                Yahoo!で見る
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
