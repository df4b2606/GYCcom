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
}: SkillCardProps) {
  const baseClass =
    "flex items-center justify-between rounded-lg border border-black/50 bg-gray-200 px-4 py-2 shadow-sm hover:shadow transition-colors";
  const interactiveClass = onClick ? " cursor-pointer hover:bg-gray-300" : "";
  const mergedClass = `${baseClass}${interactiveClass}${
    className ? ` ${className}` : ""
  }`;

  return (
    <div className={mergedClass} onClick={onClick}>
      <span className="text-sm font-medium text-gray-900 truncate pr-3">
        {name}
      </span>
      <span
        className="ml-3 h-8 w-4 rounded-md"
        style={{ backgroundColor: accentColor ?? "#3b82f6" }}
        aria-hidden="true"
      />
    </div>
  );
}
