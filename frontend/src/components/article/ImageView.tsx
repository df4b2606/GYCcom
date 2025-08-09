import React from "react";
import Image from "next/image";

interface ImageViewProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function ImageView({ src, alt, className }: ImageViewProps) {
  if (!src) return null;

  return (
    <>
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
        <Image
          src={src}
          alt={alt || "文章图片"}
          fill
          className={`object-cover ${className || ""}`}
        />
      </div>
      {alt && (
        <div className="text-center text-gray-400 text-sm mt-2 mb-4">{alt}</div>
      )}
    </>
  );
}
