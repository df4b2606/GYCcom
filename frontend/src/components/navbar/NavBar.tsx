"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../common/ThemeProvider";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Check if we're on homepage in light mode
  const isHomepageLight = pathname === "/" && !isDark;
  const isHomepage = pathname === "/";

  // Debug log (remove in production)
  if (typeof window !== "undefined") {
    console.log("NavBar Debug:", { pathname, isDark, isHomepageLight });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle clicking outside of more menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    if (isMoreMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMoreMenuOpen]);

  // 避免水合不匹配，使用固定样式
  if (!mounted) {
    return null; // 或者返回一个占位符
  }

  return (
    <nav
      className={`relative z-[9999] transition-all duration-300 ${
        isHomepage
          ? "bg-transparent border-transparent backdrop-blur-0"
          : isDark
          ? "bg-black/30 border-b border-white/10 backdrop-blur-sm"
          : "bg-white/70 border-b border-black/10 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/shanhowen.jpg"
                alt="Flag"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span
                className={`text-xl ${
                  isHomepageLight
                    ? "text-white font-bold"
                    : isDark
                    ? "text-white font-bold"
                    : "text-gray-900 font-bold"
                }`}
              >
                GYC.com
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className={`px-3 py-2 text-sm transition-colors ${
                  isHomepageLight
                    ? "text-white font-bold hover:text-gray-200"
                    : isDark
                    ? "text-gray-300 hover:text-white font-medium"
                    : "text-gray-700 hover:text-black font-medium"
                }`}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className={`px-3 py-2 text-sm transition-colors ${
                  isHomepageLight
                    ? "text-white font-bold hover:text-gray-200"
                    : isDark
                    ? "text-gray-300 hover:text-white font-medium"
                    : "text-gray-700 hover:text-black font-medium"
                }`}
              >
                Blogs
              </Link>
              <Link
                href="/moments"
                className={`px-3 py-2 text-sm transition-colors ${
                  isHomepageLight
                    ? "text-white font-bold hover:text-gray-200"
                    : isDark
                    ? "text-gray-300 hover:text-white font-medium"
                    : "text-gray-700 hover:text-black font-medium"
                }`}
              >
                Moments
              </Link>

              {/* More Dropdown */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`px-3 py-2 text-sm transition-colors flex items-center space-x-1 ${
                    isHomepageLight
                      ? "text-white font-bold hover:text-gray-200"
                      : isDark
                      ? "text-gray-300 hover:text-white font-medium"
                      : "text-gray-700 hover:text-black font-medium"
                  }`}
                >
                  <span>More</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isMoreMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMoreMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 backdrop-blur-sm rounded-lg shadow-lg ${
                      isDark
                        ? "bg-black/80 border border-white/10"
                        : "bg-white border border-black/10"
                    }`}
                  >
                    <div className="py-1">
                      <Link
                        href="/about"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-gray-300 hover:text-white hover:bg-white/10"
                            : "text-gray-700 hover:text-black hover:bg-black/5"
                        }`}
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        About Me
                      </Link>
                      <Link
                        href="/history"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-gray-300 hover:text-white hover:bg-white/10"
                            : "text-gray-700 hover:text-black hover:bg-black/5"
                        }`}
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        History
                      </Link>
                      <Link
                        href="/friends"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-gray-300 hover:text-white hover:bg-white/10"
                            : "text-gray-700 hover:text-black hover:bg-black/5"
                        }`}
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        Friend Links
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <button
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className={`ml-2 px-3 py-2 text-sm transition-colors ${
                  isHomepageLight
                    ? "text-white font-bold hover:text-gray-200"
                    : isDark
                    ? "text-gray-300 hover:text-white font-medium"
                    : "text-gray-700 hover:text-black font-medium"
                }`}
              >
                {isDark ? "Change to Light Mode" : "Change to Dark Mode"}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none ${
                isHomepageLight
                  ? "text-white hover:text-gray-200"
                  : isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
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
            <div
              className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-sm rounded-lg mt-2 ${
                isDark ? "bg-black/40" : "bg-white/80"
              }`}
            >
              <Link
                href="/"
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } block px-3 py-2 text-base font-medium transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } block px-3 py-2 text-base font-medium transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/moments"
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } block px-3 py-2 text-base font-medium transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Moments
              </Link>

              {/* Mobile More Menu */}
              <div className="border-t border-white/10 pt-2">
                <div className="text-gray-400 text-xs font-medium px-3 py-1 uppercase tracking-wide">
                  More
                </div>
                <Link
                  href="/about"
                  className={`${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } block px-3 py-2 text-base font-medium transition-colors pl-6`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Me
                </Link>
                <Link
                  href="/history"
                  className={`${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } block px-3 py-2 text-base font-medium transition-colors pl-6`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  History
                </Link>
                <Link
                  href="/friends"
                  className={`${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } block px-3 py-2 text-base font-medium transition-colors pl-6`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Friend Links
                </Link>
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } block px-3 py-2 text-base font-medium transition-colors pl-6`}
                >
                  {isDark ? "Change to Light Mode" : "Change to Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
