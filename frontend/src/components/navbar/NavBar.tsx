"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../common/ThemeProvider";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const { isDark, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isDark
          ? "bg-black/30 border-b border-white/10"
          : "bg-white/70 border-b border-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
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
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                Blogs
              </Link>
              <Link
                href="/moments"
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                Moments
              </Link>

              {/* More Dropdown */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1`}
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
                className={`ml-2 rounded-full px-2 py-2 transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-black hover:bg-black/5"
                }`}
              >
                {isDark ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.64 13a9 9 0 01-11.64 8.65 9 9 0 0011.29-11.29c.23.84.35 1.73.35 2.64z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-6.343l1.414-1.414M6.343 17.657l-1.414 1.414m12.728 0l1.414 1.414M6.343 6.343L4.93 4.93M12 6a6 6 0 100 12 6 6 0 000-12z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              } focus:outline-none`}
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
                  Toggle Theme
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
