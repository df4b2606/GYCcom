"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";
import LatestUpdatesCard from "@/components/home_components/LatestUpdatesCard";

// Main Home Component
export default function Home() {
  const [scrollY, setScrollY] = useState(0);

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
        <div
          className="absolute inset-0 bg-black transition-opacity duration-100 ease-out z-10"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to GYC.com
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
            Capturing moments, building experiences, sharing stories
          </p>
          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
            <Link
              href="/about"
              className="px-6 py-2 border border-white/60 text-white font-medium text-sm rounded-lg hover:border-white hover:bg-white/20 transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              Learn More About Me
            </Link>
            <button className="px-6 py-2 border border-white/60 text-white font-medium text-sm rounded-lg hover:border-white hover:bg-white/20 transition-all w-full sm:w-auto backdrop-blur-sm">
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
