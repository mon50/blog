import Image, { ImageProps } from "next/image";

import AffiliateLink from "@/components/AffiliateLink";
import Tweet from "@/components/Tweet";
import Date from "@/components/Date";

const MDXComponents = {
  Image: (props: ImageProps) => <Image {...props} />,
  AffiliateLink: AffiliateLink,
  Tweet: Tweet,
  Date: Date,
  // 他のカスタムコンポーネントを追加
};

export default MDXComponents;
