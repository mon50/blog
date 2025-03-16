"use client";

import MDXComponents from "@/components/MDXcomponents";
import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ mdxSource }: MDXContentProps) {
  return <MDXRemote {...mdxSource} components={MDXComponents} />;
}
