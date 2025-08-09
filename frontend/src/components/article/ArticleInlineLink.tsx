import React from "react";

interface ArticleInlineLinkProps {
  href?: string;
  children: React.ReactNode;
  linkTitle?: React.ReactNode;
  linkUrl?: string;
  className?: string;
}

export default function ArticleInlineLink({
  href,
  children,
  linkTitle,
  linkUrl,
  className,
}: ArticleInlineLinkProps) {
  const url = href || linkUrl;

  if (!url) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-blue-400 hover:text-blue-300 underline transition-colors ${
        className || ""
      }`}
    >
      {children || linkTitle}
    </a>
  );
}
