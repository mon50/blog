"use client";

import MDXComponents from "@/components/MDXcomponents";
import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React, { useEffect } from "react";

interface MDXContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ mdxSource }: MDXContentProps) {
  // Add scroll behavior for heading links
  useEffect(() => {
    const addHeadingLinks = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const headingCounts: {
        [key: string]: number;
        h1: number;
        h2: number;
        h3: number;
        h4: number;
        h5: number;
        h6: number;
      } = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };

      headings.forEach((heading) => {
        if (heading.id && heading.querySelector("a")) return;

        const tagName = heading.tagName.toLowerCase();
        headingCounts[tagName]++;

        const id = `${tagName}-${headingCounts[tagName]}`;
        heading.id = id;
      });
    };

    setTimeout(addHeadingLinks, 100);
  }, [mdxSource]);

  return (
    <article className="prose dark:prose-invert prose-img:rounded-xl prose-a:text-[#6f4e37] prose-a:no-underline hover:prose-a:text-[#5a3e2c] max-w-none">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </article>
  );
}
