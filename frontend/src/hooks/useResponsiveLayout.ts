"use client";

import { useState, useEffect, useRef } from "react";

interface UseResponsiveLayoutOptions {
  // Breakpoint at which to switch from horizontal to vertical layout
  switchBreakpoint?: number;
  // Minimum width for horizontal layout (in pixels)
  minHorizontalWidth?: number;
  // Debounce delay for resize events (in ms)
  debounceDelay?: number;
}

interface UseResponsiveLayoutReturn {
  // Whether to use vertical layout (true) or horizontal layout (false)
  isVerticalLayout: boolean;
  // Ref to attach to the container element
  containerRef: React.RefObject<HTMLDivElement>;
  // Current window width
  windowWidth: number;
  // Whether the layout switch was triggered by reaching right edge
  isEdgeTriggered: boolean;
}

export const useResponsiveLayout = ({
  switchBreakpoint = 1024, // lg breakpoint
  minHorizontalWidth = 800,
  debounceDelay = 100,
}: UseResponsiveLayoutOptions = {}): UseResponsiveLayoutReturn => {
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isEdgeTriggered, setIsEdgeTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleResize = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        const width = window.innerWidth;
        setWindowWidth(width);

        // Check if Instagram card would reach the right edge
        const shouldBeVertical =
          width < switchBreakpoint ||
          width < minHorizontalWidth ||
          checkInstagramCardEdgePosition();

        setIsVerticalLayout(shouldBeVertical);

        // Determine if this was triggered by edge detection
        setIsEdgeTriggered(
          width >= switchBreakpoint &&
            width >= minHorizontalWidth &&
            checkInstagramCardEdgePosition()
        );
      }, debounceDelay);
    };

    // Check if Instagram card would extend beyond viewport or container
    const checkInstagramCardEdgePosition = (): boolean => {
      if (!containerRef.current) return false;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      // Instagram card has a max-width of approximately 720px (based on grid-cols-[minmax(320px,1fr)_720px])
      // We'll check if the right edge of the card would extend beyond a reasonable margin
      const instagramCardWidth = 720;
      const rightMargin = 64; // 16px padding on each side + some buffer

      // Check if the card would extend beyond the viewport with margin
      return (
        containerRect.left + containerRect.width - instagramCardWidth <
        rightMargin
      );
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [switchBreakpoint, minHorizontalWidth, debounceDelay]);

  return {
    isVerticalLayout,
    containerRef,
    windowWidth,
    isEdgeTriggered,
  };
};
