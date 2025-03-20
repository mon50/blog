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

      headings.forEach((heading) => {
        // Skip if already processed
        if (heading.id && heading.querySelector("a")) return;

        // Create ID from heading content
        const id =
          heading.textContent
            ?.toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-") || "";

        heading.id = id;
      });
    };

    // Run once after content is loaded
    setTimeout(addHeadingLinks, 100);
  }, [mdxSource]);

  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-img:rounded-xl prose-a:text-[#6f4e37] prose-a:no-underline hover:prose-a:text-[#5a3e2c] max-w-none">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </article>
  );
}
