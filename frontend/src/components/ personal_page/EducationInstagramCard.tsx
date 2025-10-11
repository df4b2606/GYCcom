"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDeviceId } from "../../utils/deviceId";

interface EducationInstagramCardProps {
  className?: string;
  university: string;
  degree: string;
  period: string;
  gpa: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  articleId: number;
  initialLikes: number;
  hashtags: string;
  dateText?: string; // Display date at the bottom
  // When true, flip image/content order on desktop to achieve horizontal symmetry
  reverseOnLg?: boolean;
}

const EducationInstagramCard = ({
  className = "",
  university,
  degree,
  period,
  gpa,
  description,
  imageUrl,
  imageAlt,
  articleId,
  initialLikes,
  hashtags,
  dateText,
  reverseOnLg = false,
}: EducationInstagramCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [deviceId, setDeviceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize device ID - only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = getDeviceId();
      setDeviceId(id);

      // Load saved like state from localStorage
      const savedLikeState = localStorage.getItem(`like_${articleId}_${id}`);
      if (savedLikeState) {
        const { isLiked: savedIsLiked, likeCount: savedCount } =
          JSON.parse(savedLikeState);
        setIsLiked(savedIsLiked);
        setLikeCount(savedCount);
      }
    }
  }, [articleId]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!deviceId || isLoading) return;

    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate the like toggle locally
      const newIsLiked = !isLiked;
      const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

      setIsLiked(newIsLiked);
      setLikeCount(newLikeCount);

      // Save to localStorage for persistence
      localStorage.setItem(
        `like_${articleId}_${deviceId}`,
        JSON.stringify({ isLiked: newIsLiked, likeCount: newLikeCount })
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Revert state on error
      const previousIsLiked = !isLiked;
      const previousLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full mx-auto grid grid-cols-1 md:grid-cols-2 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl ${className}`}
    >
      {/* University photo - top on mobile/tablet, left on desktop */}
      <div
        className={`relative w-full overflow-hidden rounded-t-lg md:rounded-t-none ${
          reverseOnLg
            ? "md:rounded-r-lg md:order-2"
            : "md:rounded-l-lg md:order-1"
        }`}
      >
        <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover bg-black"
            priority
          />
        </div>
      </div>

      {/* Author header, like, and caption - bottom on mobile/tablet, right on desktop */}
      <div
        className={`relative flex flex-col bg-white rounded-b-lg md:rounded-b-none shadow-lg overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] ${
          reverseOnLg
            ? "md:rounded-l-lg md:order-1"
            : "md:rounded-r-lg md:order-2"
        }`}
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="relative w-8 h-8 mr-3">
            <Image
              src="/aboutMePic.jpg"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900">gyc_david</h3>
            <p className="text-xs text-gray-500">Seattle, WA</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 overflow-visible">
          {/* Caption */}
          <div className="text-sm text-gray-900">
            <p className="mb-2">
              <span className="font-semibold">gyc_david</span> 🎓 {university}
            </p>
            <p className="mb-2">
              <strong>{degree}</strong>
              <br />
              {period}
              <br />
              GPA: {gpa}
            </p>
            <p className="mb-2">{description}</p>
            <p className="text-blue-600 font-medium">{hashtags}</p>
          </div>

          {/* Like Row (only like button) */}
          <div className="flex items-center mt-4">
            <button
              onClick={handleLikeClick}
              disabled={isLoading}
              className={`transition-all duration-300 hover:scale-110 focus:outline-none ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <div className="relative">
                <svg
                  className={`w-6 h-6 transition-all duration-300 ${
                    isLiked
                      ? "text-red-500 fill-current scale-110"
                      : "text-gray-700 fill-none stroke-current stroke-2"
                  }`}
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {isLiked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </button>
            <p className="ml-3 font-semibold text-sm text-gray-900">
              {likeCount} likes
            </p>
          </div>
        </div>

        {/* Footer: Time */}
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {typeof dateText === "string" && dateText.trim().length > 0
              ? dateText
              : "JUNE 18 2024"}
          </p>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationInstagramCard;
