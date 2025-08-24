"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";
import LatestUpdatesCard from "@/components/home_components/LatestUpdatesCard";
import { useTheme } from "@/components/common/ThemeProvider";

// Main Home Component
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate overlay opacity based on scroll position
  // 初始透明度0.7，滚动300像素后完全消失
  const overlayOpacity = Math.max(0.7 - scrollY / 300, 0);

  // no extra state needed for responsive nav

  // Light-mode homepage mimics the provided design exactly
  if (!isDark) {
    return (
      <div className="min-h-screen bg-gray-100 pb-20">
        {/* Script logo and simple top nav */}
        <header className="max-w-6xl mx-auto pt-8 px-6 md:px-8">
          <div className="flex items-center justify-center">
            <div className="[font-family:var(--font-logo)] text-5xl bg-[linear-gradient(to_bottom,#34d399,rgba(255,255,255,0.08)_48.5%,rgba(255,255,255,0.28)_49.5%,rgba(255,255,255,0.28)_50.5%,rgba(255,255,255,0.08)_51.5%,#38bdf8)] bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              GYC.com
            </div>
          </div>
          <div className="mt-6 relative">
            {/* Responsive row/column nav */}
            <nav
              className={`flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-12 text-lg sm:text-xl font-medium text-gray-800 tracking-wide italic font-serif px-4`}
            >
              {[
                { label: "Home", href: "/" },
                { label: "Blogs", href: "/blogs" },
                { label: "Moments", href: "/moments" },
                { label: "About", href: "/about" },
                { label: "History", href: "/history" },
                { label: "Friend Links", href: "/friends" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-black px-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Card layout on gray background */}
        <div className="max-w-6xl mx-auto mt-6 space-y-6 px-6 md:px-8">
          {/* Hero banner card - same style as tiles */}
          <div className="relative w-full aspect-21-9 rounded-2xl overflow-hidden shadow">
            <Image
              src="/DSC07098.jpg"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            {/* Arrows */}
            <button
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white w-8 h-8 rounded flex items-center justify-center"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white w-8 h-8 rounded flex items-center justify-center"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {/* Tags and title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex gap-2 mb-3">
                {["DESIGN", "FASHION", "FRIENDS"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded bg-pink-200/90 text-gray-800 text-xs font-semibold tracking-wide shadow"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-white text-2xl md:text-3xl font-semibold drop-shadow">
                Hairstyles that are easier to manage
              </h2>
            </div>
          </div>

          {/* Three feature tiles */}
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { src: "/PersonalBlog.jpg", label: "TRENDS" },
                { src: "/BECU.jpg", label: "DESIGN" },
                { src: "/DSC07098.jpg", label: "STYLE PICKS" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative w-full aspect-16-9 rounded-2xl overflow-hidden shadow"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-x-0 bottom-3 flex justify-center">
                    <span className="px-4 py-1 rounded bg-pink-400/90 text-white text-sm font-medium shadow">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/DSC07098.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden z-10">
        {/* Dynamic Overlay */}
        {isDark ? (
          <div
            className="absolute inset-0 bg-black transition-opacity duration-100 ease-out z-10"
            style={{ opacity: overlayOpacity }}
          />
        ) : (
          <div className="absolute inset-0 bg-white/60 z-10" />
        )}

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to GYC.com
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Capturing moments, building experiences, sharing stories
          </p>
          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
            <Link
              href="/about"
              className={`px-6 py-2 font-medium text-sm rounded-lg transition-all w-full sm:w-auto backdrop-blur-sm border ${
                isDark
                  ? "border-white/60 text-white hover:border-white hover:bg-white/20"
                  : "border-gray-700 text-gray-900 hover:bg-black/5"
              }`}
            >
              Learn More About Me
            </Link>
            <button
              className={`px-6 py-2 font-medium text-sm rounded-lg transition-all w-full sm:w-auto backdrop-blur-sm border ${
                isDark
                  ? "border-white/60 text-white hover:border-white hover:bg-white/20"
                  : "border-gray-700 text-gray-900 hover:bg-black/5"
              }`}
            >
              I Am Feeling Lucky
            </button>
          </div>
        </div>

        {/* Personal Info Card - Top Right */}
        <PersonalInfoCard className="absolute top-20 right-6 w-72 hidden lg:block z-30" />

        {/* Latest Updates Card - Right Lower (moved further down) */}
        <LatestUpdatesCard className="absolute right-6 top-96 w-72 hidden lg:block z-30" />
      </section>
    </div>
  );
}
