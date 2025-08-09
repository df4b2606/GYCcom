import React from "react";

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <div className="my-4">
      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg border-b border-gray-700">
        <span className="text-sm font-mono">{language}</span>
      </div>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-b-lg overflow-x-auto">
        <code className="font-mono text-sm">{value}</code>
      </pre>
    </div>
  );
}
