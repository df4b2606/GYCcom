"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AboutPage() {
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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
            Hello, I&apos;m <span className="text-blue-600">GYC</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Full Stack Developer & Creative Problem Solver & Amateur
            Photographer
          </p>

          {/* Avatar Container */}
          <div className="relative w-full max-w-4xl mx-auto h-64 md:h-72">
            {/* Central Avatar */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                {/* 真实照片 - 使用您的照片 */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/personal.jpg"
                    alt="GYC Profile"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🌟 Hello World!
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                欢迎来到我的个人空间！我是一名充满热情的全栈开发者，
                专注于创建美观且功能强大的Web应用。我喜欢探索新技术，
                解决复杂问题，并将创意想法转化为现实。
              </p>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <code className="text-blue-600 font-mono text-sm md:text-base">
                  console.log(&quot;Hello World! 🚀 Ready to create amazing
                  things!&quot;);
                </code>
              </div>

              <p className="text-gray-600">
                ✨ 让我们一起创造更多精彩的项目吧！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
