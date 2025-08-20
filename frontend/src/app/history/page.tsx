"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-300 via-orange-200 to-indigo-300 flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-orange-200 to-indigo-300 relative overflow-hidden">
      {/* Return button */}
      <button
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/70 hover:bg-white text-gray-800 px-4 py-2 shadow-md backdrop-blur transition-colors"
        aria-label="Return"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Return</span>
      </button>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-rose-300/60 rounded-full blur-3xl"></div>
        <div className="absolute top-24 -right-32 w-[26rem] h-[26rem] bg-indigo-300/60 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-32 w-[34rem] h-[34rem] bg-orange-300/60 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-16 w-[26rem] h-[26rem] bg-sky-300/60 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16 font-mono">
            Website Development History
          </h1>

          <div className="bg-white/95 rounded-2xl shadow-xl border border-white/60 backdrop-blur-sm overflow-hidden">
            {/* GitHub-style header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Commits
                  </h3>
                  <div className="flex items-center gap-2">
                    <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm">
                      <option>main</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Latest updates</span>
                </div>
              </div>
            </div>

            {/* Commits list */}
            <div className="divide-y divide-gray-200">
              {/* Commit group header */}
              <div className="px-6 py-3 bg-gray-50/50 text-sm text-gray-600 font-medium">
                Commits on Dec 2024
              </div>

              {/* Individual commits */}
              <div className="px-6 py-4 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span className="font-medium text-gray-800">
                        Add About Me page with skills showcase
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-9">
                      <span className="font-medium">GYC</span> committed 2 days
                      ago
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      a1b2c3d
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span className="font-medium text-gray-800">
                        Implement project carousel with responsive design
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-9">
                      <span className="font-medium">GYC</span> committed 3 days
                      ago
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      b2c3d4e
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span className="font-medium text-gray-800">
                        Add education background section
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-9">
                      <span className="font-medium">GYC</span> committed 4 days
                      ago
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      c3d4e5f
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Commit group header */}
              <div className="px-6 py-3 bg-gray-50/50 text-sm text-gray-600 font-medium">
                Commits on Nov 2024
              </div>

              <div className="px-6 py-4 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span className="font-medium text-gray-800">
                        Create blog system with category filtering
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-9">
                      <span className="font-medium">GYC</span> committed 2 weeks
                      ago
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      d4e5f6g
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span className="font-medium text-gray-800">
                        Setup Spring Boot backend with PostgreSQL
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-9">
                      <span className="font-medium">GYC</span> committed 3 weeks
                      ago
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      e5f6g7h
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 hover:bg-gray-50/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span className="font-medium text-gray-800">
                        Initial commit - Next.js project setup
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 ml-9">
                      <span className="font-medium">GYC</span> committed 1 month
                      ago
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      f6g7h8i
                    </code>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Showing recent development history</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View all commits →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-24 md:h-32"></div>
      </div>
    </div>
  );
}
