import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  experimental: {
    turbotrace: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gadgetmitchy.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/I/**'
      }
    ],
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
