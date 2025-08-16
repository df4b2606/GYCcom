"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SkillCard from "@/components/ personal_page/skillCard";

export default function AboutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const categories = [
    "All",
    "Programming",
    "Front end",
    "Backend",
    "Framework",
    "Tool",
    "Language",
    "Hobby",
  ];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const skills = [
    // Language / Programming
    { name: "Java", category: "Language", color: "#f97316" },
    { name: "Python", category: "Language", color: "#10b981" },
    { name: "TypeScript", category: "Language", color: "#3b82f6" },

    // Front end
    { name: "React", category: "Front end", color: "#22d3ee" },
    { name: "Next.js", category: "Front end", color: "#111827" },

    // Backend / Framework
    { name: "Spring Boot", category: "Framework", color: "#16a34a" },
    { name: "Node.js", category: "Backend", color: "#059669" },

    // Tools
    { name: "Docker", category: "Tool", color: "#0ea5e9" },
    { name: "Git", category: "Tool", color: "#ef4444" },

    // Hobby (examples)
    { name: "Photography", category: "Hobby", color: "#a78bfa" },
    { name: "Travel", category: "Hobby", color: "#f472b6" },
  ];
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-1 md:pt-0 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title - Typewriter */}
          <TypewriterTitle />
          {/* Center Card: image left + bio right */}
          <div className="mt-2 md:mt-4 w-full flex  items-center justify-center ">
            <div className="max-w-5xl w-full mx-auto rounded-3xl shadow-2xl border border-white/60 overflow-hidden bg-white/85 grid md:grid-cols-3 md:h-[350px]">
              {/* Left Image (edge-to-edge) */}
              <div className="relative h-48 md:h-full md:col-span-1 w-full">
                <Image
                  src="/aboutMePic.jpg"
                  alt="About me"
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Right Bio */}
              <div className="md:col-span-2 p-6 md:p-8 text-left md:overflow-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                  👋 About Me
                </h2>
                <p
                  className="text-gray-700 text-sm md:text-base leading-6 md:leading-7 tracking-normal max-w-3xl"
                  lang="en"
                  style={{
                    textAlign: "justify",
                    textJustify: "inter-word",
                    hyphens: "manual",
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                  }}
                >
                  My name is Yuechen Guo and you can also call me David. I am a
                  second-year M.S. student in Electrical and Computer
                  Engineering at the University of Washington (GPA 3.9/4.0). I’m
                  driven by building human-centered technology and turning ideas
                  into practical products. With a strong CS foundation and
                  extensive project and interdisciplinary experience, I learn
                  fast and deliver reliably. I’m goal-oriented,
                  self-disciplined, and collaborative. Java is my primary
                  working language; I’m also comfortable with front-end
                  development and Python. Beyond coding, photography and travel
                  offer me another way to experience the world.
                </p>
              </div>
            </div>
          </div>
          {/* Bouncing scroll hint */}
          <div className="absolute inset-x-0 bottom-8 flex flex-col items-center justify-center gap-2">
            <span className="text-sm md:text-base text-gray-800/80">
              Scroll down to see my skills and project experience
            </span>
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-gray-800/80 animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Category row */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors backdrop-blur-sm ${
                  activeCategory === cat
                    ? "bg-white/80 text-gray-900 border-white/60 shadow"
                    : "bg-white/20 text-gray-800 border-white/40 hover:bg-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredSkills.map((s) => (
              <SkillCard key={s.name} name={s.name} accentColor={s.color} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Typewriter headline component
function TypewriterTitle() {
  const fullText = "Hello World! I'm GYC";
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const speed = 80; // ms per char

  useEffect(() => {
    if (idx > fullText.length) return;
    const t = setTimeout(() => {
      setDisplay(fullText.slice(0, idx));
      setIdx((v) => v + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [idx]);

  useEffect(() => {
    setIdx(0);
    setDisplay("");
  }, []);

  return (
    <h1 className="text-4xl md:text-6xl font-bold mb-10 text-gray-800 mb-6 font-mono -mt-30 md:-mt-28">
      {display}
      <span className="inline-block w-1.5 h-8 md:h-10 bg-gray-800 ml-1 align-middle animate-pulse" />
    </h1>
  );
}
