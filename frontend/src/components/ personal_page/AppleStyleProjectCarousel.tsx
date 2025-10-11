import React, { useState } from "react";
import AppleStyleProjectCard from "./AppleStyleProjectCard";

export interface Project {
  title: string;
  description: string[];
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  badge?: string;
  price?: string;
}

interface AppleStyleProjectCarouselProps {
  projects: Project[];
  className?: string;
  category?: string;
}

export default function AppleStyleProjectCarousel({
  projects,
  className,
  category,
}: AppleStyleProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move one card at a time
  const nextProjects = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProjects = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Get three projects to display
  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % projects.length;
      visible.push(projects[index]);
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects().map((project, index) => {
    let position: "left" | "center" | "right";
    if (index === 0) position = "left";
    else if (index === 1) position = "center";
    else position = "right";

    return (
      <div
        key={`${currentIndex}-${index}`}
        className="transition-all duration-700 ease-in-out"
      >
        <AppleStyleProjectCard
          {...project}
          isActive={true}
          position={position}
          category={category}
        />
      </div>
    );
  });

  return (
    <div className={`relative ${className || ""}`}>
      {/* Apple-style Navigation Arrows - Enhanced for dark background */}
      <button
        onClick={prevProjects}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/95 hover:bg-white border border-white/30 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
        aria-label="Previous projects"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextProjects}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/95 hover:bg-white border border-white/30 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
        aria-label="Next projects"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Projects Container with Apple-style layout */}
      <div className="relative flex items-center justify-center min-h-[800px] px-16 overflow-hidden">
        <div className="flex items-center gap-8 justify-center w-full">
          {visibleProjects}
        </div>
      </div>

      {/* Apple-style Page Indicators - Enhanced for dark background */}
      <div className="flex justify-center mt-8 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60 w-2"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
