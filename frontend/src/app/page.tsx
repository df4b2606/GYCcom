"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/common/ThemeProvider";

// Current Time Component
const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");
  const { isDark } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`text-lg font-mono ${
        isDark ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {currentTime}
    </div>
  );
};

// Main Home Component
export default function Home() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [isExpanding, setIsExpanding] = useState(false);

  const handleHeroClick = () => {
    setIsExpanding(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      router.push("/about");
    }, 800); // Match the animation duration
  };

  // Light-mode homepage with new WordPress-inspired design
  if (!isDark) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Warm Gradient Background - scrollable, starts from very top */}
        <section
          className={`relative overflow-hidden -mt-16 bg-gradient-to-br from-slate-800 via-emerald-900 to-blue-900 bg-fixed cursor-pointer transition-all duration-800 ease-out ${
            isExpanding ? "h-screen opacity-0" : "h-[60vh] opacity-100"
          }`}
          onClick={handleHeroClick}
        >
          <div className="absolute inset-0 z-0"></div>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              <span className="font-serif italic">
                Open to Software Engineer Work
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-6 drop-shadow-md">
              Graduating in 2026
            </p>

            {/* Portfolio CTA */}
            <div className="group flex flex-col items-center text-white hover:text-emerald-400 transition-colors duration-300 cursor-pointer">
              <span className="text-lg md:text-xl font-semibold mb-2 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md">
                Click to view my Portfolio
              </span>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-6">
            {/* Recommended for you title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recommended for you
              </h2>

              {/* Current Time Display */}
              <div className="mb-6">
                <CurrentTime />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Resume Preview Card */}
                <a
                  href="/resume1003.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src="/resume.jpg"
                      alt="David Guo Resume Preview"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                    {/* Resume Preview Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                          Resume Preview
                        </h3>
                        <p className="text-lg drop-shadow-md">
                          Click anywhere to view my professional resume
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        RESUME
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      David Guo - Software Engineer
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>Updated December 2024</span>
                      <span className="mx-2">•</span>
                      <span>PDF Document</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      View my comprehensive resume showcasing technical skills,
                      professional experience, and educational background in
                      software engineering and computer science...
                    </p>
                    <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                      View Resume
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Social Media Links Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* LinkedIn Card */}
                  <a
                    href="https://linkedin.com/in/yuechenguo59/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-32 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          PROFESSIONAL
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        LinkedIn Profile
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Connect with me on LinkedIn for professional
                        networking...
                      </p>
                      <div className="text-xs text-blue-600 font-medium">
                        View Profile →
                      </div>
                    </div>
                  </a>

                  {/* GitHub Card */}
                  <a
                    href="https://github.com/df4b2606"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          CODE
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        GitHub Repository
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Explore my open source projects and code
                        contributions...
                      </p>
                      <div className="text-xs text-gray-600 font-medium">
                        View Repos →
                      </div>
                    </div>
                  </a>

                  {/* Xiaohongshu Card */}
                  <a
                    href="https://www.xiaohongshu.com/user/profile/610f63610000000001003a2e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-32 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          LIFESTYLE
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        Xiaohongshu
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Follow my lifestyle content and photography on 小红书...
                      </p>
                      <div className="text-xs text-red-600 font-medium">
                        Follow Me →
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-3">
                {/* Latest Posts Title */}
                <div className="bg-white shadow-md p-6">
                  <h3 className="text-gray-900 font-semibold text-lg">
                    Latest posts
                  </h3>
                </div>

                {/* Blog Under Development Items */}
                {[
                  {
                    title: "Featured Article 1",
                    category: "BLOG UNDER DEVELOPMENT",
                    icon: "📝",
                  },
                  {
                    title: "Featured Article 2",
                    category: "BLOG UNDER DEVELOPMENT",
                    icon: "📸",
                  },
                  {
                    title: "Featured Article 3",
                    category: "BLOG UNDER DEVELOPMENT",
                    icon: "🎯",
                  },
                  {
                    title: "Featured Article 4",
                    category: "BLOG UNDER DEVELOPMENT",
                    icon: "🚀",
                  },
                ].map((post, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md p-4 opacity-60"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shadow-sm rounded">
                        <span className="text-2xl">{post.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          {post.category}
                        </p>
                        <h4 className="text-sm font-medium text-gray-500 leading-tight">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Blog feature is still under development, launch
                          delayed
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Author Info Card */}
                <div className="bg-white shadow-md p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src="/personal.jpg"
                        alt="GYC Profile"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold text-lg">
                        GYC
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Content Creator & Developer
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">
                    Sharing stories through photography and technology. Based in
                    Seattle, available for projects worldwide.
                  </p>

                  {/* Social Icons */}
                  <div className="flex items-center gap-3 mb-4">
                    {[
                      {
                        src: "/icons/email.svg",
                        alt: "Email",
                        href: "mailto:davidguo59@outlook.com",
                      },
                      {
                        src: "/icons/github.svg",
                        alt: "GitHub",
                        href: "https://github.com/df4b2606",
                      },
                      {
                        src: "/icons/linkedin.svg",
                        alt: "LinkedIn",
                        href: "https://www.linkedin.com/in/yuechenguo59/",
                      },
                      { src: "/icons/wechat.svg", alt: "WeChat", href: "#" },
                      {
                        src: "/icons/xiaohongshu.svg",
                        alt: "Xiaohongshu",
                        href: "https://www.xiaohongshu.com/user/profile/610f63610000000001003a2e",
                      },
                    ].map((icon) => (
                      <a
                        key={icon.alt}
                        href={icon.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                        aria-label={icon.alt}
                      >
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </a>
                    ))}
                  </div>

                  {/* Subscribe Button */}
                  <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 hover:bg-blue-700 transition-colors shadow-md">
                    Subscribe Me
                  </button>
                </div>

                {/* Most Liked Articles Card - Commented out */}
                {/* 
                <div className="bg-white shadow-md p-4 h-38">
                  <h3 className="text-gray-900 font-semibold text-lg mb-3">
                    Most Liked Articles
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Building Modern Web Applications",
                      "Photography Composition Tips",
                      "Travel Photography Guide",
                    ].map((title, index) => (
                      <h4
                        key={index}
                        className="text-sm font-medium text-gray-900 leading-tight truncate"
                      >
                        {title}
                      </h4>
                    ))}
                  </div>
                </div>
                */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Warm Gradient Background - scrollable, starts from very top */}
      <section
        className={`relative overflow-hidden -mt-16 bg-gradient-to-br from-slate-800 via-emerald-900 to-blue-900 bg-fixed cursor-pointer transition-all duration-800 ease-out ${
          isExpanding ? "h-screen opacity-0" : "h-[60vh] opacity-100"
        }`}
        onClick={handleHeroClick}
      >
        <div className="absolute inset-0 z-0"></div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="font-serif italic">
              Open to Software Engineer Work
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-6 drop-shadow-md">
            Graduating June 2026
          </p>

          {/* Portfolio CTA */}
          <div className="group flex flex-col items-center text-white hover:text-emerald-400 transition-colors duration-300 cursor-pointer">
            <span className="text-lg md:text-xl font-semibold mb-2 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md">
              Click to view my Portfolio
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Recommended for you title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-2">
              Recommended for you
            </h2>

            {/* Current Time Display */}
            <div className="mb-6">
              <CurrentTime />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Resume Preview Card */}
              <a
                href="/resume1003.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src="/resume.jpg"
                    alt="David Guo Resume Preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
                  {/* Resume Preview Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                        Resume Preview
                      </h3>
                      <p className="text-lg drop-shadow-md">
                        Click anywhere to view my professional resume
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-600 text-green-100 text-sm font-medium rounded-full">
                      RESUME
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 group-hover:text-green-400 transition-colors">
                    David Guo - Software Engineer
                  </h2>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <span>Updated December 2024</span>
                    <span className="mx-2">•</span>
                    <span>PDF Document</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    View my comprehensive resume showcasing technical skills,
                    professional experience, and educational background in
                    software engineering and computer science...
                  </p>
                  <div className="inline-flex items-center text-green-400 font-medium group-hover:text-green-300 transition-colors">
                    View Resume
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Social Media Links Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LinkedIn Card */}
                <a
                  href="https://linkedin.com/in/yuechenguo59/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-32 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-blue-600 text-blue-100 text-xs font-medium rounded-full">
                        PROFESSIONAL
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                      LinkedIn Profile
                    </h3>
                    <p className="text-xs text-gray-300 mb-2">
                      Connect with me on LinkedIn for professional networking...
                    </p>
                    <div className="text-xs text-blue-400 font-medium">
                      View Profile →
                    </div>
                  </div>
                </a>

                {/* GitHub Card */}
                <a
                  href="https://github.com/df4b2606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-gray-600 text-gray-200 text-xs font-medium rounded-full">
                        CODE
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-100 mb-2 group-hover:text-gray-300 transition-colors">
                      GitHub Repository
                    </h3>
                    <p className="text-xs text-gray-300 mb-2">
                      Explore my open source projects and code contributions...
                    </p>
                    <div className="text-xs text-gray-400 font-medium">
                      View Repos →
                    </div>
                  </div>
                </a>

                {/* Xiaohongshu Card */}
                <a
                  href="https://www.xiaohongshu.com/user/profile/610f63610000000001003a2e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-32 bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-red-600 text-red-100 text-xs font-medium rounded-full">
                        LIFESTYLE
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-100 mb-2 group-hover:text-red-400 transition-colors">
                      Xiaohongshu
                    </h3>
                    <p className="text-xs text-gray-300 mb-2">
                      Follow my lifestyle content and photography on 小红书...
                    </p>
                    <div className="text-xs text-red-400 font-medium">
                      Follow Me →
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-3">
              {/* Latest Posts Title */}
              <div className="bg-gray-800 shadow-md p-6">
                <h3 className="text-gray-100 font-semibold text-lg">
                  Latest posts
                </h3>
              </div>
              {/* Blog Under Development Items */}
              {[
                {
                  title: "Featured Article 1",
                  category: "BLOG UNDER DEVELOPMENT",
                  icon: "📝",
                },
                {
                  title: "Featured Article 2",
                  category: "BLOG UNDER DEVELOPMENT",
                  icon: "📸",
                },
                {
                  title: "Featured Article 3",
                  category: "BLOG UNDER DEVELOPMENT",
                  icon: "🎯",
                },
                {
                  title: "Featured Article 4",
                  category: "BLOG UNDER DEVELOPMENT",
                  icon: "🚀",
                },
              ].map((post, index) => (
                <div
                  key={index}
                  className="bg-gray-800 shadow-md p-4 opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-700 flex items-center justify-center shadow-sm rounded">
                      <span className="text-2xl">{post.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {post.category}
                      </p>
                      <h4 className="text-sm font-medium text-gray-400 leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Blog feature is still under development, launch delayed
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Author Info Card */}
              <div className="bg-gray-800 shadow-md p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/personal.jpg"
                      alt="GYC Profile"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-100 font-semibold text-lg">GYC</h3>
                    <p className="text-gray-300 text-sm">
                      Content Creator & Developer
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  Sharing stories through photography and technology. Based in
                  Shanghai, available for projects worldwide.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mb-4">
                  {[
                    {
                      src: "/icons/email.svg",
                      alt: "Email",
                      href: "mailto:davidguo59@outlook.com",
                    },
                    {
                      src: "/icons/github.svg",
                      alt: "GitHub",
                      href: "https://github.com/df4b2606",
                    },
                    {
                      src: "/icons/linkedin.svg",
                      alt: "LinkedIn",
                      href: "https://www.linkedin.com/in/yuechenguo59/",
                    },
                    { src: "/icons/wechat.svg", alt: "WeChat", href: "#" },
                    {
                      src: "/icons/xiaohongshu.svg",
                      alt: "Xiaohongshu",
                      href: "https://www.xiaohongshu.com/user/profile/610f63610000000001003a2e",
                    },
                  ].map((icon) => (
                    <a
                      key={icon.alt}
                      href={icon.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 transition-colors shadow-sm"
                      aria-label={icon.alt}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </a>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 hover:bg-blue-700 transition-colors shadow-md">
                  Subscribe Me
                </button>
              </div>
              {/* Most Liked Articles Card - Commented out */}
              {/* 
              <div className="bg-gray-800 shadow-md p-4 h-38">
                <h3 className="text-gray-100 font-semibold text-lg mb-3">
                  Most Liked Articles
                </h3>
                <div className="space-y-2">
                  {[
                    "Building Modern Web Applications",
                    "Photography Composition Tips",
                    "Travel Photography Guide",
                  ].map((title, index) => (
                    <h4
                      key={index}
                      className="text-sm font-medium text-gray-200 leading-tight truncate"
                    >
                      {title}
                    </h4>
                  ))}
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
