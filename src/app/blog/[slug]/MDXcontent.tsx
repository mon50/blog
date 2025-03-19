"use client";

import MDXComponents from "@/components/MDXcomponents";
import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

interface MDXContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ mdxSource }: MDXContentProps) {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 max-w-none">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </article>
  );
}
