import React from "react";
import Image from "next/image";

interface AffiliateLinkProps {
  title: string;
  imageUrl: string;
  amazonUrl?: string;
  rakutenUrl?: string;
}

const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  title,
  imageUrl,
  amazonUrl,
  rakutenUrl,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden my-6">
      <div className="md:flex">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
          <div className="flex flex-wrap gap-3">
            {amazonUrl && (
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition-colors"
              >
                Amazonで見る
              </a>
            )}
            {rakutenUrl && (
              <a
                href={rakutenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                楽天で見る
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateLink;
