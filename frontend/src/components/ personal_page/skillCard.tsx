import React from "react";

export interface SkillCardProps {
  /** Skill display name */
  name: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional extra classes to adjust spacing or layout */
  className?: string;
  /** Right accent color block; defaults to Tailwind blue-500. */
  accentColor?: string;
  /** Card size variant */
  size?: "normal" | "compact";
}

/**
 * A compact skill card: text inside, colored accent bar on the right.
 * Designed to be small and stack nicely in grids or lists.
 */
export default function SkillCard({
  name,
  onClick,
  className,
  accentColor,
  size = "normal",
}: SkillCardProps) {
  const isCompact = size === "compact";
  const baseClass = `flex items-center ${
    isCompact ? "justify-center" : "justify-between"
  } rounded-lg border border-black/50 bg-white shadow-sm hover:shadow transition-colors ${
    isCompact ? "px-2 py-1.5" : "px-4 py-2"
  }`;
  const interactiveClass = onClick ? " cursor-pointer hover:bg-gray-50" : "";
  const mergedClass = `${baseClass}${interactiveClass}${
    className ? ` ${className}` : ""
  }`;

  return (
    <div className={mergedClass} onClick={onClick}>
      <span className="text-sm font-medium text-gray-900 truncate">{name}</span>
      {!isCompact && (
        <span
          className="ml-3 h-8 w-4 rounded-md"
          style={{ backgroundColor: accentColor ?? "#3b82f6" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
