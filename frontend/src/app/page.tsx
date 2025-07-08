"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Navigation Component
interface NavigationProps {
  scrollY: number;
}

const Navigation = ({ scrollY }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate navbar opacity based on scroll position
  const navOpacity = Math.min(0.3 + scrollY / 1000, 0.3);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10 transition-all duration-300"
      style={{ backgroundColor: `rgba(0, 0, 0, ${navOpacity})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/shanhowen.jpg"
              alt="Flag"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span className="text-white text-xl font-bold">GYC.com</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Blogs
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Moments
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                More
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-sm rounded-lg mt-2">
              <a
                href="#"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors"
              >
                Blogs
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors"
              >
                Moments
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors"
              >
                More
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Personal Info Card Component
interface PersonalInfoCardProps {
  className?: string;
}

const PersonalInfoCard = ({ className = "" }: PersonalInfoCardProps) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">G</span>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">GYC</h3>
          <p className="text-gray-300 text-sm">Web Developer</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          Shanghai, China
        </div>
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          Available for projects
        </div>
      </div>
    </div>
  );
};

// Latest Updates Card Component
interface LatestUpdatesCardProps {
  className?: string;
}

const LatestUpdatesCard = ({ className = "" }: LatestUpdatesCardProps) => {
  const updates = [
    {
      time: "2h ago",
      content: "Published new blog post about React development",
    },
    { time: "1d ago", content: "Updated portfolio with latest projects" },
    { time: "3d ago", content: "Shared moments from recent photography trip" },
  ];

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        Latest Updates
      </h3>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
            <p className="text-gray-300 text-sm">{update.content}</p>
            <p className="text-gray-400 text-xs mt-1">{update.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="relative bg-black/80 backdrop-blur-sm text-white py-12 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About GYC
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mission
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Photography
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consulting
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: hello@gyc.com</li>
              <li>Phone: +86 138 0000 0000</li>
              <li>Shanghai, China</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 GYC.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

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
      {/* Navigation */}
      <Navigation scrollY={scrollY} />

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
            <button className="px-6 py-2 bg-white/90 text-black font-medium text-sm rounded-lg hover:bg-white transition-colors w-full sm:w-auto backdrop-blur-sm">
              Learn More About Me
            </button>
            <button className="px-6 py-2 border border-white/60 text-white font-medium text-sm rounded-lg hover:border-white hover:bg-white/20 transition-all w-full sm:w-auto backdrop-blur-sm">
              I Am Feeling Lucky
            </button>
          </div>
        </div>

        {/* Personal Info Card - Top Right */}
        <PersonalInfoCard className="absolute top-20 right-6 w-80 hidden lg:block z-30" />

        {/* Latest Updates Card - Right Lower */}
        <LatestUpdatesCard className="absolute right-6 bottom-32 w-80 hidden lg:block z-30" />
      </section>

      {/* Photo Viewing Section */}
      <section className="relative h-screen z-10">
        {/* Photo Info Card - Bottom Right */}
        <div className="absolute bottom-6 right-6 w-80 bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-white/20 hidden lg:block">
          <div className="mb-4">
            <h3 className="text-white text-lg font-semibold mb-2">
              关于这张照片
            </h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <span className="text-white">拍摄地点：</span>上海外滩
              </p>
              <p>
                <span className="text-white">拍摄时间：</span>2024年春季
              </p>
              <p>
                <span className="text-white">设备：</span>Sony A7R5
              </p>
              <p>
                <span className="text-white">镜头：</span>FE 24-70mm f/2.8 GM
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              这张照片捕捉了上海外滩的现代都市风貌，展现了城市绿意与现代建筑的和谐共存。透过树叶的光影变化，记录了这座城市独特的魅力时刻。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
