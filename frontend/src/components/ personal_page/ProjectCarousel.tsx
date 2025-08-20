import React, { useState } from "react";
import ProjectCard from "./ProjectCard";

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  className?: string;
  category?: string;
}

export default function ProjectCarousel({
  projects,
  className,
  category,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move one card at a time instead of three
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
        <ProjectCard
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
      {/* Navigation Arrows */}
      <button
        onClick={prevProjects}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-blue-400 hover:bg-blue-500 border-2 border-blue-300 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-125 shadow-2xl hover:shadow-blue-400/50 animate-pulse hover:animate-none"
        aria-label="Previous projects"
      >
        <svg
          className="w-7 h-7"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-blue-400 hover:bg-blue-500 border-2 border-blue-300 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-125 shadow-2xl hover:shadow-blue-400/50 animate-pulse hover:animate-none"
        aria-label="Next projects"
      >
        <svg
          className="w-7 h-7"
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

      {/* Projects Container */}
      <div className="relative flex items-center justify-center min-h-[300px] px-32 overflow-hidden">
        <div className="flex items-center gap-8 justify-center">
          {visibleProjects}
        </div>
      </div>
    </div>
  );
}
