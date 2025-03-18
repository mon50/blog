"use client";

import Link from "next/link";

interface TagLinkProps {
  tag: string;
  className?: string;
}

export default function TagLink({ tag, className = "" }: TagLinkProps) {
  return (
    <Link
      href={`/tag/${tag}`}
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {tag}
    </Link>
  );
}