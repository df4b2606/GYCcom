"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDeviceId } from "../../utils/deviceId";

interface InstagramCardProps {
  className?: string;
}

const InstagramCard = ({ className = "" }: InstagramCardProps) => {
  // Use a fixed article ID for the about me card
  const ABOUT_ME_ARTICLE_ID = 999999;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42); // Start with some initial likes
  const [deviceId, setDeviceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize device ID - only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = getDeviceId();
      setDeviceId(id);

      // Load saved like state from localStorage
      const savedLikeState = localStorage.getItem(
        `like_${ABOUT_ME_ARTICLE_ID}_${id}`
      );
      if (savedLikeState) {
        const { isLiked: savedIsLiked, likeCount: savedCount } =
          JSON.parse(savedLikeState);
        setIsLiked(savedIsLiked);
        setLikeCount(savedCount);
      }
    }
  }, []);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!deviceId || isLoading) return;

    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate the like toggle locally
      // In a real app, you'd call the API
      const newIsLiked = !isLiked;
      const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

      setIsLiked(newIsLiked);
      setLikeCount(newLikeCount);

      // Save to localStorage for persistence
      localStorage.setItem(
        `like_${ABOUT_ME_ARTICLE_ID}_${deviceId}`,
        JSON.stringify({ isLiked: newIsLiked, likeCount: newLikeCount })
      );

      // Uncomment this if you want to use the real API
      /*
      const response = await toggleLike({
        articleId: ABOUT_ME_ARTICLE_ID,
        deviceId,
      });
      
      setIsLiked(response.isLiked);
      setLikeCount(response.likeCount);
      */
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
      className={`w-full mx-auto md:w-auto md:mx-0 lg:ml-auto lg:mr-0 grid md:grid-cols-[340px_340px] max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl ${className}`}
    >
      {/* Left: Photo grid stacked with UW brand image below to form a rectangle */}
      <div className="relative w-full overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
        <div className="relative w-full aspect-square">
          <Image
            src="/aboutMePic.jpg"
            alt="About me"
            fill
            className="object-cover bg-black"
            priority
          />
        </div>
        <div className="relative w-full h-24 md:h-44">
          <Image
            src="/UWBrand-PurpleBackground.jpg"
            alt="University of Washington brand"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right: Author header, like, and caption */}
      <div className="relative flex flex-col bg-white rounded-b-lg md:rounded-r-lg md:rounded-l-none shadow-lg overflow-hidden">
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
              <span className="font-semibold">gyc_david</span> My full name is
              Yuechen Guo and you can also call me David. I am a second-year
              M.S. student in Electrical and Computer Engineering at the
              University of Washington (GPA 3.9/4.0). I will graduate in June
              2026.
            </p>
            <p className="mb-2">
              I’m a software engineer driven by solving complex problems and
              turning ideas into real-world products. With a strong computer
              science foundation and internship experience, I focus on designing
              scalable, reliable, and secure systems. I enjoy understanding user
              needs, evaluating different solutions, and building technology
              that delivers meaningful impact.
            </p>
            <p className="mb-2">
              📌 Currently seeking full-time software engineer opportunities.
              Let&apos;s connect!
            </p>
            <p className="text-blue-600 font-medium">
              #JobSearch #UW #Seattle #Java #Python #26ng
            </p>
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
            OCTOBER 1
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

export default InstagramCard;
