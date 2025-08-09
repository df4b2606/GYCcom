"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [skillPositions, setSkillPositions] = useState<
    Array<{ x: number; y: number; dx: number; dy: number }>
  >([]);

  const skills = [
    { name: "Java", color: "bg-orange-600" },
    { name: "Spring Boot", color: "bg-green-600" },
    { name: "Django", color: "bg-green-700" },
    { name: "Cursor", color: "bg-purple-600" },
    { name: "React", color: "bg-blue-500" },
    { name: "Next.js", color: "bg-black" },
    { name: "TypeScript", color: "bg-blue-600" },
    { name: "Python", color: "bg-yellow-600" },
    { name: "MySQL", color: "bg-blue-700" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "Git", color: "bg-red-500" },
    { name: "Docker", color: "bg-blue-400" },
    { name: "AWS", color: "bg-orange-500" },
    { name: "VS Code", color: "bg-blue-400" },
    { name: "PostgreSQL", color: "bg-blue-800" },
  ];

  // 生成随机位置的函数
  const generateRandomPosition = () => ({
    x: Math.random() * 80 + 10, // 10% to 90%
    y: Math.random() * 80 + 10, // 10% to 90%
    dx: (Math.random() - 0.5) * 0.5, // 移动速度
    dy: (Math.random() - 0.5) * 0.5,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 初始化技能位置
    const positions = skills.map(() => generateRandomPosition());
    setSkillPositions(positions);

    // 启动漂浮动画
    const interval = setInterval(() => {
      setSkillPositions((prev) =>
        prev.map((pos) => {
          const newX = pos.x + pos.dx;
          const newY = pos.y + pos.dy;
          let newDx = pos.dx;
          let newDy = pos.dy;

          // 边界检测和反弹
          if (newX <= 5 || newX >= 95) newDx = -newDx;
          if (newY <= 5 || newY >= 95) newDy = -newDy;

          return {
            x: Math.max(5, Math.min(95, newX)),
            y: Math.max(5, Math.min(95, newY)),
            dx: newDx,
            dy: newDy,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-cyan-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
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
            Full Stack Developer & Creative Problem Solver
          </p>

          {/* Avatar and Skills Container */}
          <div className="relative w-full max-w-4xl mx-auto h-96 md:h-[500px]">
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

            {/* Floating Skills */}
            {skills.map((skill, index) => {
              const position = skillPositions[index];
              if (!position) return null;

              return (
                <div
                  key={skill.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                >
                  <div
                    className={`${skill.color} text-white px-3 py-2 md:px-4 md:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer text-sm md:text-base font-medium`}
                  >
                    {skill.name}
                  </div>
                </div>
              );
            })}
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
