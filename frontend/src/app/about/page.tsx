"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SkillCard from "@/components/ personal_page/skillCard";
import ProjectCarousel from "@/components/ personal_page/ProjectCarousel";

export default function AboutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const categories = [
    "All",
    "Programming languages",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tools",
    "Foundations",
    "Spoken languages",
    "Hobbies",
  ];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const skills = [
    // Programming languages
    { name: "Java", category: "Programming languages", color: "#f97316" },
    { name: "Python", category: "Programming languages", color: "#10b981" },
    { name: "TypeScript", category: "Programming languages", color: "#3b82f6" },
    { name: "JavaScript", category: "Programming languages", color: "#f59e0b" },

    // Frontend
    { name: "React", category: "Frontend", color: "#22d3ee" },
    { name: "Next.js", category: "Frontend", color: "#111827" },
    { name: "HTML/CSS", category: "Frontend", color: "#8b5cf6" },

    // Backend
    { name: "Spring Boot", category: "Backend", color: "#16a34a" },
    { name: "Node.js", category: "Backend", color: "#059669" },
    { name: "Express.js", category: "Backend", color: "#7c3aed" },

    // Database
    { name: "PostgreSQL", category: "Database", color: "#0ea5e9" },
    { name: "MySQL", category: "Database", color: "#f97316" },
    { name: "MongoDB", category: "Database", color: "#10b981" },

    // DevOps
    { name: "Docker", category: "DevOps", color: "#0ea5e9" },
    { name: "Git", category: "DevOps", color: "#ef4444" },
    { name: "CI/CD", category: "DevOps", color: "#8b5cf6" },

    // Tools
    { name: "VS Code", category: "Tools", color: "#3b82f6" },
    { name: "IntelliJ IDEA", category: "Tools", color: "#f59e0b" },
    { name: "Postman", category: "Tools", color: "#ef4444" },

    // Foundations
    { name: "Data Structures", category: "Foundations", color: "#06b6d4" },
    { name: "Algorithms", category: "Foundations", color: "#84cc16" },
    { name: "System Design", category: "Foundations", color: "#f97316" },

    // Spoken languages
    { name: "English", category: "Spoken languages", color: "#8b5cf6" },
    { name: "Chinese", category: "Spoken languages", color: "#ef4444" },

    // Hobbies
    { name: "Photography", category: "Hobbies", color: "#a78bfa" },
    { name: "Travel", category: "Hobbies", color: "#f472b6" },
    { name: "Reading", category: "Hobbies", color: "#10b981" },
  ];

  // Sample projects data - 6 projects for carousel
  const projects = [
    {
      title: "Personal Blog System",
      description:
        "A full-stack blog application built with Next.js, Spring Boot, and PostgreSQL. Features include article management, category filtering, and responsive design.",
      imageUrl: "/personal.jpg",
      imageAlt: "Personal Blog System",
      technologies: ["Next.js", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/yourusername/blog-system",
      demoUrl: "https://your-blog-demo.com",
    },
    {
      title: "E-commerce Platform",
      description:
        "A modern e-commerce solution with user authentication, product management, shopping cart, and payment integration using Stripe.",
      imageUrl: "/shanhowen.jpg",
      imageAlt: "E-commerce Platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/yourusername/ecommerce",
      demoUrl: "https://your-ecommerce-demo.com",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration, and progress tracking features.",
      imageUrl: "/DSC07098.jpg",
      imageAlt: "Task Management App",
      technologies: ["Vue.js", "Spring Boot", "MySQL", "WebSocket"],
      githubUrl: "https://github.com/yourusername/task-manager",
    },
    {
      title: "AI Chat Assistant",
      description:
        "An intelligent chatbot powered by machine learning, featuring natural language processing and context-aware responses.",
      imageUrl: "/personal.jpg",
      imageAlt: "AI Chat Assistant",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      githubUrl: "https://github.com/yourusername/ai-chat",
      demoUrl: "https://your-ai-chat-demo.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "A beautiful weather application with real-time data, 7-day forecasts, and interactive charts using OpenWeatherMap API.",
      imageUrl: "/shanhowen.jpg",
      imageAlt: "Weather Dashboard",
      technologies: ["React", "Chart.js", "OpenWeatherMap API", "CSS3"],
      githubUrl: "https://github.com/yourusername/weather-app",
      demoUrl: "https://your-weather-demo.com",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website showcasing projects, skills, and professional experience with smooth animations.",
      imageUrl: "/DSC07098.jpg",
      imageAlt: "Portfolio Website",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/yourusername/portfolio",
      demoUrl: "https://your-portfolio-demo.com",
    },
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
            <div className="max-w-5xl w-full mx-auto rounded-3xl shadow-2xl border border-white/60 overflow-hidden bg-white grid md:grid-cols-3 md:h-[350px]">
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
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 font-mono">
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
              Scroll down to explore my skills, projects, education, and career
              opportunities
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 font-mono">
            Technical Skills
          </h2>

          {/* Category row */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors backdrop-blur-sm ${
                  activeCategory === cat
                    ? "bg-white text-gray-900 border-white/60 shadow"
                    : "bg-white/20 text-gray-800 border-white/40 hover:bg-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Conditional rendering based on active category */}
          {activeCategory === "All" ? (
            // All skills - text block format
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 rounded-2xl p-8 md:p-12 shadow-xl border border-white/60 backdrop-blur-sm">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  I work with a wide range of technologies, including:
                </p>

                <div className="space-y-6 text-gray-700">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4 min-w-fit">
                      <span className="text-2xl mr-2">💻</span>
                      <span className="font-semibold">Languages:</span>
                    </div>
                    <span className="text-base leading-relaxed">
                      C/C++, Python, TypeScript/JavaScript, Go, Lua, Java, C#,
                      Kotlin, CUDA
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4 min-w-fit">
                      <span className="text-2xl mr-2">🌐</span>
                      <span className="font-semibold">Web Development:</span>
                    </div>
                    <span className="text-base leading-relaxed">
                      React, Redux, Zustand, Next.js, Vue.js, Angular, Tailwind
                      CSS, HTML/CSS
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4 min-w-fit">
                      <span className="text-2xl mr-2">⚙️</span>
                      <span className="font-semibold">
                        Backend Development:
                      </span>
                    </div>
                    <span className="text-base leading-relaxed">
                      Express, NestJS, Django, Flask, FastAPI, Spring Boot, Gin,
                      gRPC
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4 min-w-fit">
                      <span className="text-2xl mr-2">💾</span>
                      <span className="font-semibold">Data Management:</span>
                    </div>
                    <span className="text-base leading-relaxed">
                      MySQL, PostgreSQL, MongoDB, Redis, Mongoose, Elasticsearch
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4 min-w-fit">
                      <span className="text-2xl mr-2">🔧</span>
                      <span className="font-semibold">DevOps & Tools:</span>
                    </div>
                    <span className="text-base leading-relaxed">
                      Git, Docker, K8s, AWS/GCP/Azure, Terraform, Jenkins, CI/CD
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-base">
                    This portfolio site is built with modern technologies
                    including{" "}
                    <span className="font-semibold text-gray-800">Next.js</span>
                    ,{" "}
                    <span className="font-semibold text-gray-800">
                      TypeScript
                    </span>
                    , and{" "}
                    <span className="font-semibold text-gray-800">
                      Tailwind CSS
                    </span>
                    , hosted on{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold underline"
                    >
                      Vercel
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Specific category - card grid format
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredSkills.map((s) => (
                <SkillCard
                  key={s.name}
                  name={s.name}
                  accentColor={s.color}
                  size="normal"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 font-mono">
            Featured Projects ➕ Working Experience
          </h2>

          {/* Project Carousel */}
          <ProjectCarousel projects={projects} />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 font-mono">
            Education Background
          </h2>

          <div className="space-y-8">
            {/* University of Washington */}
            <div className="bg-white/90 rounded-2xl p-6 md:p-8 shadow-xl border border-white/60 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 font-mono">
                    University of Washington
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold">
                    Master of Science in Electrical and Computer Engineering
                  </p>
                </div>
                <div className="text-gray-600 font-medium mt-2 md:mt-0">
                  <p>2023 - 2025</p>
                  <p className="text-blue-600 font-bold">GPA: 3.9/4.0</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Focusing on software engineering, system design, and advanced
                computer science fundamentals. Coursework includes algorithms,
                data structures, distributed systems, and machine learning.
              </p>
            </div>

            {/* Sun Yat-sen University */}
            <div className="bg-white/90 rounded-2xl p-6 md:p-8 shadow-xl border border-white/60 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 font-mono">
                    Sun Yat-sen University
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold">
                    Bachelor of Engineering in Software Engineering
                  </p>
                </div>
                <div className="text-gray-600 font-medium mt-2 md:mt-0">
                  <p>2019 - 2023</p>
                  <p className="text-blue-600 font-bold">GPA: 3.8/4.0</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Comprehensive foundation in software engineering principles,
                programming languages, and computer science fundamentals.
                Coursework included object-oriented programming, database
                systems, web development, and software project management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Career Section */}
      <section id="contact" className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 font-mono">
            😊 Let&apos;s Work Together
          </h2>

          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 font-mono">
              Seeking Full-Time Software Engineer Opportunities
            </h3>
            <p className="text-gray-800 text-lg leading-relaxed max-w-3xl mx-auto">
              I&apos;m actively looking for a full-time software engineer
              position where I can contribute my technical skills and passion
              for building innovative solutions. I&apos;m excited to join a team
              that values collaboration, continuous learning, and making a
              positive impact.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-xl font-semibold text-gray-800">
              Feel free to contact me!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Email Button */}
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email Me
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <p className="text-gray-700 text-sm">
              I&apos;m available for immediate start and open to discussing
              opportunities that align with my skills and interests.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-24 md:h-32"></div>
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
