"use client";

import { useState, useEffect } from "react";
import { getDeviceId } from "../../utils/deviceId";
import { toggleLike } from "../../api/like";

export interface LikeButtonProps {
  articleId: number;
  initialLikeCount: number;
  initialIsLiked: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onLikeChange?: (
    articleId: number,
    newCount: number,
    newIsLiked: boolean
  ) => void;
}

const LikeButton = ({
  articleId,
  initialLikeCount,
  initialIsLiked,
  className = "",
  size = "md",
  onLikeChange,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [deviceId, setDeviceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize device ID - only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = getDeviceId();
      setDeviceId(id);
    }
  }, []);

  const sizeClasses = {
    sm: {
      icon: "w-4 h-4",
      text: "text-xs",
      button: "p-3",
    },
    md: {
      icon: "w-5 h-5",
      text: "text-sm",
      button: "p-4",
    },
    lg: {
      icon: "w-6 h-6",
      text: "text-base",
      button: "p-5",
    },
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!deviceId || isLoading) return;

    setIsLoading(true);

    try {
      const response = await toggleLike({
        articleId,
        deviceId,
      });

      // Debug logging (remove in production)
      console.log("Like response:", response);

      setIsLiked(response.isLiked);
      setLikeCount(response.likeCount);

      // Call the callback if provided
      if (onLikeChange) {
        onLikeChange(articleId, response.likeCount, response.isLiked);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Revert state on error - we need to use the previous state
      const previousIsLiked = !isLiked;
      const previousLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
    } finally {
      setIsLoading(false);
    }
  };

  // Debug logging - only on client side
  if (typeof window !== "undefined") {
    console.log("Rendering LikeButton:", {
      articleId,
      isLiked,
      likeCount,
      deviceId,
    });
  }

  return (
    <button
      onClick={handleLikeClick}
      disabled={isLoading}
      className={`flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none rounded-lg ${
        sizeClasses[size].button
      } ${className} relative overflow-hidden ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={isLiked ? "取消点赞" : "点赞"}
    >
      {/* Heart Icon with expansion effect */}
      <div className="relative">
        <svg
          className={`${sizeClasses[size].icon} transition-all duration-300 ${
            isLiked
              ? "text-red-500 fill-current scale-110"
              : "text-gray-400 fill-none stroke-current stroke-2"
          }`}
          viewBox="0 0 24 24"
          fill={isLiked ? "currentColor" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        {/* Expansion rings effect when liked - only once */}
        {isLiked && (
          <>
            <div
              className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse scale-150 opacity-0"
              style={{
                animationDuration: "0.6s",
                animationIterationCount: "1",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse scale-200 opacity-0"
              style={{
                animationDuration: "0.6s",
                animationIterationCount: "1",
                animationDelay: "0.1s",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full bg-red-500/5 animate-pulse scale-250 opacity-0"
              style={{
                animationDuration: "0.6s",
                animationIterationCount: "1",
                animationDelay: "0.2s",
              }}
            ></div>
          </>
        )}
      </div>

      {/* Like Count */}
      <span
        className={`font-medium ${sizeClasses[size].text} ${
          isLiked ? "text-red-500" : "text-gray-400"
        } transition-colors duration-300`}
      >
        {likeCount}
      </span>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
        </div>
      )}
    </button>
  );
};

export default LikeButton;
