import React from "react";
import Image from "next/image";

export interface AppleStyleProjectCardProps {
  /** Project title */
  title: string;
  /** Project description - array of bullet points */
  description: string[];
  /** Project image URL */
  imageUrl: string;
  /** Project image alt text */
  imageAlt: string;
  /** Project technologies used */
  technologies: string[];
  /** Optional click handler */
  onClick?: () => void;
  /** Optional extra classes */
  className?: string;
  /** Whether this card is active (for carousel effect) */
  isActive?: boolean;
  /** Card position for styling */
  position?: "left" | "center" | "right";
  /** Project category for styling */
  category?: string;
  /** Badge text (like "New", "Free Engraving", etc.) */
  badge?: string;
  /** Price or status text */
  price?: string;
}

/**
 * Apple-style project card component with clean, minimalist design.
 * Features large product image, clean typography, and subtle shadows.
 */
export default function AppleStyleProjectCard({
  title,
  description,
  imageUrl,
  imageAlt,
  technologies,
  onClick,
  className,

  position = "center",

  badge,
  price,
}: AppleStyleProjectCardProps) {
  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "opacity-60 scale-95"; // Left card - semi-transparent and slightly smaller
      case "right":
        return "opacity-60 scale-95"; // Right card - semi-transparent and slightly smaller
      default:
        return "opacity-100 scale-100"; // Center card - full opacity and size
    }
  };

  return (
    <div
      className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 w-[380px] h-[720px] ${getPositionClasses()} ${
        className || ""
      }`}
      onClick={onClick}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Image Section - Reduced height for more content space */}
      <div className="relative w-full h-[200px] bg-gray-50 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section - Increased height for more text */}
      <div className="p-6 flex flex-col h-[520px]">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
          {title}
        </h3>

        {/* Description - More compact bullet points */}
        <ul className="text-gray-600 leading-relaxed mb-4 space-y-1.5 flex-1">
          {description.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-2 mt-0.5 text-xs flex-shrink-0">
                •
              </span>
              <span className="flex-1 text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {/* Technology Tags - More compact */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="font-medium bg-gray-100 text-gray-700 rounded-full px-2.5 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Price or Status */}
        {price && (
          <div className="text-base font-semibold text-gray-900">{price}</div>
        )}
      </div>
    </div>
  );
}
