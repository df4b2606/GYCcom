import React from "react";

interface InlineCodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function InlineCodeBlock({
  children,
  className,
}: InlineCodeBlockProps) {
  return (
    <code
      className={`bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono ${
        className || ""
      }`}
    >
      {children}
    </code>
  );
}
