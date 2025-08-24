import React from "react";
import Image from "next/image";

export interface ProjectCardProps {
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
}

/**
 * A project card component with image on top and bullet-point description below.
 * Features hover effects and technology tags.
 */
export default function ProjectCard({
  title,
  description,
  imageUrl,
  imageAlt,
  technologies,
  onClick,
  className,
  isActive = true,
  position = "center",
  category,
}: ProjectCardProps) {
  // Check if we should use compact styling for "All" category
  const isCompactMode = category === "All";
  // Use isActive to subtly adjust opacity when inactive
  const activeStateClasses = isActive ? "" : "opacity-90";

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "opacity-60 rounded-xl relative"; // Left card - semi-transparent, no transform scaling
      case "right":
        return "opacity-60 rounded-xl relative"; // Right card - semi-transparent, no transform scaling
      default:
        return "opacity-100 rounded-xl"; // Center card - no transform scaling
    }
  };

  // Unified dimensions for all cards to keep consistent style
  const getCardDimensions = () => {
    // Increase container size to show more text without changing font size
    // Slightly shorten height per request while keeping width
    return isCompactMode ? "w-80 h-[440px]" : "w-[440px] h-[640px]";
  };

  return (
    <div
      className={`group relative overflow-hidden bg-white shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${getCardDimensions()} ${getPositionClasses()} ${activeStateClasses} ${
        className || ""
      }`}
      onClick={onClick}
    >
      {/* Image Section */}
      <div
        className={`relative w-full overflow-hidden ${
          isCompactMode ? "h-32" : "h-40"
        }`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay with project title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <h3 className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </h3>
      </div>

      {/* Content Section */}
      <div className={`${isCompactMode ? "p-4" : "p-6"}`}>
        {/* Title (visible on mobile, hidden on hover) */}
        <h3
          className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:hidden ${
            isCompactMode ? "text-lg mb-2" : "text-xl mb-3"
          }`}
        >
          {title}
        </h3>

        {/* Description - Bullet Points */}
        <ul
          className={`text-gray-600 leading-relaxed mb-4 space-y-1 ${
            isCompactMode ? "text-sm mb-3" : "text-base mb-4"
          }`}
        >
          {description.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-black dark:text-white mr-2 mt-1 text-xs">
                ●
              </span>
              <span className="flex-1 text-gray-600 dark:text-gray-300">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Technology Tags */}
        <div
          className={`flex flex-wrap gap-3 mb-6 ${
            isCompactMode ? "gap-2 mb-4" : "gap-3 mb-6"
          }`}
        >
          {technologies.map((tech, index) => (
            <span
              key={index}
              className={`font-medium bg-blue-100/30 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full ${
                isCompactMode ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
