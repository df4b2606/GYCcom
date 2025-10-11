"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SkillCard from "@/components/ personal_page/skillCard";
import AppleStyleProjectCarousel from "@/components/ personal_page/AppleStyleProjectCarousel";
import ContactForm from "@/components/contact/ContactForm";
import InstagramCard from "@/components/ personal_page/InstagramCard";
import EducationInstagramCard from "@/components/ personal_page/EducationInstagramCard";
import SocialLinksPopup from "@/components/common/SocialLinksPopup";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export default function AboutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Use responsive layout hook to detect when to switch to vertical layout
  const { isVerticalLayout, containerRef } = useResponsiveLayout({
    switchBreakpoint: 1024, // lg breakpoint
    minHorizontalWidth: 800, // Minimum width for horizontal layout
    debounceDelay: 100,
  });
  const categories = [
    "Featured",
    "Computer languages",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "AI/ML",
    "Tools",
    "Foundations",
    "Spoken languages",
  ];
  const [activeCategory, setActiveCategory] = useState<string>("Featured");

  // Color mapping for frontend skill categories - DRY principle
  const frontendColors = {
    frameworks: "#facc15", // Blue-500
    frameworksDark: "##facc15", // Blue-800
    styling: "#32CD32", // Emerald-500

    stateManagement: "#8b5cf6", // Violet-500
    design: "#f97316", // Orange-500
    buildTools: "#ef4444", // Red-500
    deployment: "#14b8a6", // Teal-500
    coreLanguages: "#3b82f6", // Amber-400
  };

  // Color mapping for backend skill categories - DRY principle
  const backendColors = {
    frameworks: "#10b981", // Green-600 - Spring ecosystem
    frameworksDark: "#059669", // Green-700 - Spring Boot, Cloud
    webFrameworks: "#ff1493", // Emerald-500 - FastAPI, Django
    security: "#7c3aed", // Violet-600 - Spring Security
    databases: "#0ea5e9", // Sky-500 - PostgreSQL, MySQL
    caching: "#ef4444", // Red-500 - Redis, Caffeine
    monitoring: "#f59e0b", // Amber-500 - Prometheus, Actuator
    apis: "#8bf6f9", // Violet-500 - REST, OpenAPI, JWT
    testing: "#06b6d4", // Cyan-500 - JUnit, Testing
    baas: "#ff6b35", // Orange-500 - Firebase, BaaS platforms
    messageQueues: "#facc15", // Yellow - Kafka, RabbitMQ, SQS, Redis Pub/Sub
  };

  // Color mapping for other skill categories - DRY principle
  const otherColors = {
    // Database colors
    relational: "#0ea5e9", // Sky-500 - PostgreSQL, MySQL
    nosql: "#f97316", // Orange-500 - MongoDB, Redis
    orm: "#8b5cf6", // Violet-500 - MyBatisPlus, Hibernate
    querying: "#10b981", // Emerald-500 - SQL, Query optimization

    // DevOps colors
    cloud: "#ff9900", // Orange-500 - AWS, Azure, GCP
    containers: "#0ea5e9", // Sky-500 - Docker, Kubernetes
    cicd: "#8b5cf6", // Violet-500 - GitHub Actions, Jenkins
    monitoring: "#ef4444", // Red-500 - Prometheus, Grafana

    // AI/ML colors
    aiFrameworks: "#10b981", // Emerald-500 - TensorFlow, PyTorch
    aiAlgorithms: "#f97316", // Orange-500 - LSTM, Random Forest
    aiTools: "#3b82f6", // Blue-500 - OpenSMILE, SHAP
    aiApis: "#8b5cf6", // Violet-500 - OpenAI API, ML APIs

    // Tools colors
    ide: "#3b82f6", // Blue-500 - VS Code, IntelliJ
    testing: "#06b6d4", // Cyan-500 - Postman, JUnit
    version: "#f97316", // Orange-500 - Git, GitHub
    build: "#8b5cf6", // Violet-500 - Maven, npm

    // Foundations colors
    algorithms: "#06b6d4", // Cyan-500 - Data Structures, Algorithms
    design: "#84cc16", // Lime-500 - System Design, OOP
    patterns: "#f97316", // Orange-500 - Design Patterns, Principles
    security: "#ef4444", // Red-500 - Security, Compliance
  };
  const skills = [
    // Computer languages
    // Proficient Application (Green - #10b981)
    { name: "Java", category: "Computer languages", color: "#10b981" },
    { name: "Python", category: "Computer languages", color: "#10b981" },

    // Proficient (Blue - #3b82f6)
    { name: "JavaScript", category: "Computer languages", color: "#3b82f6" },
    { name: "SQL", category: "Computer languages", color: "#3b82f6" },
    { name: "TypeScript", category: "Computer languages", color: "#3b82f6" },
    { name: "HTML", category: "Computer languages", color: "#3b82f6" },
    { name: "CSS", category: "Computer languages", color: "#3b82f6" },

    // Familiar (Orange - #f97316)
    { name: "C++", category: "Computer languages", color: "#f97316" },
    { name: "C", category: "Computer languages", color: "#f97316" },
    { name: "MATLAB", category: "Computer languages", color: "#f97316" },

    // Frontend - Core Languages (Amber shades)
    { name: "HTML", category: "Frontend", color: frontendColors.coreLanguages },
    { name: "CSS", category: "Frontend", color: frontendColors.coreLanguages },
    {
      name: "JavaScript",
      category: "Frontend",
      color: frontendColors.coreLanguages,
    },
    {
      name: "TypeScript",
      category: "Frontend",
      color: frontendColors.coreLanguages,
    },

    // Frontend - Frameworks & Libraries (Blue shades)
    { name: "React", category: "Frontend", color: frontendColors.frameworks },
    {
      name: "Next.js",
      category: "Frontend",
      color: frontendColors.frameworks,
    },

    // Frontend - Styling & CSS (Green shades)
    {
      name: "Tailwind CSS",
      category: "Frontend",
      color: frontendColors.styling,
    },
    {
      name: "Bootstrap",
      category: "Frontend",
      color: frontendColors.styling,
    },

    // Frontend - State Management (Purple shades)
    {
      name: "Redux",
      category: "Frontend",
      color: frontendColors.stateManagement,
    },

    // Frontend - Design Tools (Orange shades)
    {
      name: "Figma Design",
      category: "Frontend",
      color: frontendColors.design,
    },

    // Frontend - Build Tools (Red shades)
    { name: "Vite", category: "Frontend", color: frontendColors.buildTools },

    // Backend - Core Languages (Amber shades)
    { name: "Java", category: "Backend", color: backendColors.frameworks },
    { name: "Python", category: "Backend", color: backendColors.frameworks },
    {
      name: "JavaScript",
      category: "Backend",
      color: backendColors.frameworks,
    },

    // Backend - Java Basics & JVM (Blue shades)
    { name: "JVM", category: "Backend", color: "#3b82f6" },
    { name: "Java Concurrency", category: "Backend", color: "#3b82f6" },
    { name: "Java Memory Model", category: "Backend", color: "#3b82f6" },
    { name: "Garbage Collection", category: "Backend", color: "#3b82f6" },

    // Backend - Web Frameworks (Emerald shades)
    {
      name: "FastAPI",
      category: "Backend",
      color: backendColors.webFrameworks,
    },
    { name: "Django", category: "Backend", color: backendColors.webFrameworks },
    {
      name: "Node.js",
      category: "Backend",
      color: backendColors.webFrameworks,
    },
    {
      name: "Express.js",
      category: "Backend",
      color: backendColors.webFrameworks,
    },

    // Backend - Spring Ecosystem (Green shades)
    {
      name: "Spring Web MVC",
      category: "Backend",
      color: backendColors.frameworksDark,
    },
    {
      name: "Spring Boot",
      category: "Backend",
      color: backendColors.frameworksDark,
    },
    {
      name: "Spring Cloud",
      category: "Backend",
      color: backendColors.frameworksDark,
    },
    {
      name: "Spring Data JPA",
      category: "Backend",
      color: backendColors.frameworksDark,
    },

    // Backend - Caching (Red shades)
    {
      name: "Caffeine Cache",
      category: "Backend",
      color: backendColors.caching,
    },

    // Backend - Security (Purple shades)
    {
      name: "Spring Security",
      category: "Backend",
      color: backendColors.security,
    },
    { name: "JWT", category: "Backend", color: backendColors.security },
    { name: "OAuth2", category: "Backend", color: backendColors.security },

    // Backend - Message Queues (Purple shades)
    {
      name: "Apache Kafka",
      category: "Backend",
      color: backendColors.messageQueues,
    },
    {
      name: "RabbitMQ",
      category: "Backend",
      color: backendColors.messageQueues,
    },
    {
      name: "AWS SQS",
      category: "Backend",
      color: backendColors.messageQueues,
    },
    {
      name: "Redis Pub/Sub",
      category: "Backend",
      color: backendColors.messageQueues,
    },

    // Backend - APIs & Documentation (Violet shades)
    { name: "REST API", category: "Backend", color: backendColors.apis },
    { name: "Swagger", category: "Backend", color: backendColors.apis },
    { name: "GraphQL", category: "Backend", color: backendColors.apis },

    // Backend - BaaS (Backend as a Service) (Orange shades)
    {
      name: "Firebase",
      category: "Backend",
      color: backendColors.baas,
    },

    // Backend - Testing (Cyan shades)
    { name: "Apifox", category: "Backend", color: backendColors.testing },
    { name: "JMeter", category: "Backend", color: backendColors.testing },
    { name: "Postman", category: "Backend", color: backendColors.testing },

    // Database - Relational Databases (Sky shades)
    { name: "PostgreSQL", category: "Database", color: otherColors.relational },
    { name: "MySQL", category: "Database", color: otherColors.relational },
    { name: "SQLite", category: "Database", color: otherColors.relational },

    // Database - NoSQL Databases (Orange shades)
    { name: "Redis", category: "Database", color: otherColors.nosql },
    { name: "MongoDB", category: "Database", color: otherColors.nosql },

    // Database - ORM & Data Access (Violet shades)
    { name: "MyBatisPlus", category: "Database", color: otherColors.orm },
    // Note: Spring Data JPA is already listed in Backend category
    { name: "Hibernate", category: "Database", color: otherColors.orm },

    // Database - Querying & Optimization (Emerald shades)

    {
      name: "Query Optimization",
      category: "Database",
      color: otherColors.querying,
    },
    {
      name: "Database Indexing",
      category: "Database",
      color: otherColors.querying,
    },

    // DevOps - Cloud Platforms (Orange shades)
    { name: "AWS", category: "DevOps", color: otherColors.cloud },
    { name: "Azure", category: "DevOps", color: otherColors.cloud },

    // DevOps - Containers & Orchestration (Sky shades)
    { name: "Docker", category: "DevOps", color: otherColors.containers },
    { name: "Kubernetes", category: "DevOps", color: otherColors.containers },

    // DevOps - CI/CD & Version Control (Violet shades)
    { name: "GitHub Actions", category: "DevOps", color: otherColors.cicd },
    // Note: Git is already listed in Tools category
    { name: "Jenkins", category: "DevOps", color: otherColors.cicd },

    // AI/ML - Frameworks & Libraries (Emerald shades)
    { name: "TensorFlow", category: "AI/ML", color: otherColors.aiFrameworks },
    { name: "PyTorch", category: "AI/ML", color: otherColors.aiFrameworks },

    {
      name: "Neural Networks",
      category: "AI/ML",
      color: otherColors.aiAlgorithms,
    },
    {
      name: "Random Forest",
      category: "AI/ML",
      color: otherColors.aiAlgorithms,
    },

    // AI/ML - Tools & Feature Engineering (Blue shades)

    // AI/ML - APIs & Services (Violet shades)
    { name: "OpenAI API", category: "AI/ML", color: otherColors.aiApis },
    {
      name: "OpenAI Realtime API",
      category: "AI/ML",
      color: otherColors.aiApis,
    },
    {
      name: "Gemini API",
      category: "AI/ML",
      color: otherColors.aiApis,
    },

    {
      name: "Hugging Face ",
      category: "AI/ML",
      color: otherColors.aiApis,
    },

    // Tools - IDEs & Editors (Blue shades)
    { name: "VS Code", category: "Tools", color: otherColors.ide },
    { name: "Cursor", category: "Tools", color: otherColors.ide },
    { name: "IntelliJ IDEA", category: "Tools", color: otherColors.ide },
    { name: "PyCharm", category: "Tools", color: otherColors.ide },
    { name: "Vim", category: "Tools", color: otherColors.ide },

    // Tools - Testing & Debugging (Cyan shades)
    { name: "Postman", category: "Tools", color: otherColors.testing },
    { name: "JUnit", category: "Tools", color: otherColors.testing },
    { name: "JMeter", category: "Tools", color: otherColors.testing },

    // Tools - Version Control & Scripting (Orange shades)
    { name: "Git", category: "Tools", color: otherColors.version },
    { name: "GitHub", category: "Tools", color: otherColors.version },
    { name: "Shell Scripting", category: "Tools", color: otherColors.version },

    // Tools - Build & Configuration (Violet shades)
    { name: "Maven", category: "Tools", color: otherColors.build },
    { name: "npm", category: "Tools", color: otherColors.build },
    { name: "Nacos", category: "Tools", color: otherColors.build },
    {
      name: "Configuration Management",
      category: "Tools",
      color: otherColors.build,
    },

    // Tools - Deployment & Hosting (Teal shades)
    { name: "Render", category: "Tools", color: "#14b8a6" },
    { name: "Vercel", category: "Tools", color: "#14b8a6" },
    { name: "Heroku", category: "Tools", color: "#14b8a6" },
    { name: "Netlify", category: "Tools", color: "#14b8a6" },
    { name: "AWS Amplify", category: "Tools", color: "#14b8a6" },

    // Foundations - Algorithms & Data Structures (Cyan shades)
    {
      name: "Data Structures",
      category: "Foundations",
      color: otherColors.algorithms,
    },
    {
      name: "Algorithms",
      category: "Foundations",
      color: otherColors.algorithms,
    },
    {
      name: "Time Complexity",
      category: "Foundations",
      color: otherColors.algorithms,
    },
    {
      name: "Space Complexity",
      category: "Foundations",
      color: otherColors.algorithms,
    },

    // Foundations - System Design & Architecture (Lime shades)
    {
      name: "Operating System",
      category: "Foundations",
      color: otherColors.design,
    },
    {
      name: "Computer Network",
      category: "Foundations",
      color: otherColors.design,
    },
    {
      name: "System Design",
      category: "Foundations",
      color: otherColors.design,
    },
    {
      name: "OOP",
      category: "Foundations",
      color: otherColors.design,
    },

    {
      name: "Design Patterns",
      category: "Foundations",
      color: otherColors.design,
    },

    // Foundations - Patterns & Principles (Orange shades)
    {
      name: "Microservices",
      category: "Foundations",
      color: otherColors.patterns,
    },
    {
      name: "SOLID Principles",
      category: "Foundations",
      color: otherColors.patterns,
    },
    {
      name: "CAP theorem",
      category: "Foundations",
      color: otherColors.patterns,
    },

    {
      name: "RESTful API",
      category: "Foundations",
      color: otherColors.patterns,
    },

    // Foundations - Security & Compliance (Red shades)
    { name: "PCI DSS", category: "Foundations", color: otherColors.security },
    {
      name: "Security Best Practices",
      category: "Foundations",
      color: otherColors.security,
    },
    {
      name: "Data Privacy",
      category: "Foundations",
      color: otherColors.security,
    },

    // Spoken languages
    { name: "Chinese", category: "Spoken languages", color: "#10b981" },
    { name: "English", category: "Spoken languages", color: "#3b82f6" },
    { name: "Japanese", category: "Spoken languages", color: "#f97316" },
  ];

  // Apple-style projects data with badges and pricing
  const projects = [
    {
      title: "Chatbook - Software Engineering Intern",
      description: [
        "Developed backend services for enterprise REST API appointment platform",
        "Built AWS-based asynchronous payment pipeline with EventBridge, Lambda, and SQS",
        "Processed payments with Helcim to ensure reliability, integrity, and PCI DSS compliance",
        "Achieved 1,000+ daily transactions at 99.5% success rate with idempotency",
        "Integrated AI voice agent with Twilio, OpenAI Realtime API achieving <500ms latency",
      ],
      imageUrl: "/chatbook.jpg",
      imageAlt: "Chatbook AI Platform",
      technologies: [
        "AWS",
        "Django",
        "EventBridge",
        "Lambda",
        "SQS",
        "Twilio",
        "OpenAI",
      ],
      badge: "Intern",
    },

    {
      title: "BECU - Capstone Project",
      description: [
        "Built a real-time system for financial transactions that detects deepfakes and caller duress during calls.",
        "Added live uploads and automated risk analysis for fraud/coercion detection.",
        "Implemented FastAPI on AWS EC2 with a JavaScript frontend for streaming processing.",
        "Cut latency 50% via async I/O and thread pooling.",
        "Designed a duress pipeline using OpenSMILE, SHAP+RFE, and an LSTM–Random Forest ensemble.",
        "Achieved 93% accuracy on real-world call data.",
      ],
      imageUrl: "/BECU.jpg",
      imageAlt: "VoiceShield System",
      technologies: [
        "FastAPI",
        "AWS EC2",
        "JavaScript",
        "OpenSMILE",
        "LSTM",
        "Random Forest",
      ],
      badge: "Capstone",
    },
    {
      title: "Vizard.ai-Software Engineering Intern",
      description: [
        "Developed Chrome extension leveraging Chrome Built-in AI for automated web usability evaluation and scoring system",
        "Implemented multimodal analysis pipeline combining DOM structure parsing with visual layer inspection using Prompt API",
        "Built comprehensive usability scoring system with weighted evaluation metrics and real-time report generation",
        "Achieved one-click usability analysis with local processing using Gemini Nano, ensuring privacy protection and sub-5s latency",
      ],
      imageUrl: "/vizard.jpg",
      imageAlt: "Heurix UX Inspector",
      technologies: [
        "Chrome Extension",
        "Chrome AI APIs",
        "Prompt API",
        "Summarizer API",
        "Writer API",
        "Proofreader API",
        "DOM Analysis",
        "Gemini Nano",
        "UX Heuristics",
      ],
      badge: "Intern",
    },
    {
      title: "Campus News Platform - Microservices",
      description: [
        "Built a microservices campus news platform with creator and user portals for publishing, scheduling, and real-time updates.",
        "Implemented article publishing and user interaction services.",
        "Managed config with Nacos and routed traffic via Spring Cloud Gateway.",
        "Secured services with JWT, Spring Security, and ThreadLocal context.",
        "Implemented a Redis delayed queue (Lists/ZSET) as a reusable service for scheduled publishing and async review.",
      ],
      imageUrl: "/schoolnews.jpg",
      imageAlt: "Campus News Platform",
      technologies: [
        "Spring Boot",
        "Spring Cloud",
        "MyBatisPlus",
        "Nacos",
        "JWT",
        "Spring Security",
      ],
      badge: "Academic",
    },
    {
      title: "AI Camera Assistant - Android",
      description: [
        "Built an AI camera in Kotlin with CameraX that analyzes photos in real time based on user prompts.",
        "Implemented a coroutine-based pipeline for capture, preprocessing, and asynchronous uploads.",
        "Connected to a Firebase backend for analysis results and telemetry.",
        "Ran A/B tests and UX experiments, reducing photo retake rates by 40%.",
      ],
      imageUrl: "/androidapp.png",
      imageAlt: "Android Finance App",
      technologies: [
        "Kotlin",
        "CameraX",
        "Coroutines",
        "Firebase",
        "Android SDK",
        "SQLite",
        "Retrofit",
        "Room Database",
        "Material Design",
      ],
      badge: "Mobile",
    },
    {
      title: "Gitlet - DIY Version Control System",
      description: [
        "Implemented basic Git operations in Java, replicating functionality of standard Git commands",
        "Developed core features including repository initialization, file staging, and commit management",
        "Built branch management system with creation, switching, and merging capabilities",
        "Applied comprehensive integration tests for each command using Makefile for automated build process",
      ],
      imageUrl: "/gitlet.jpg",
      imageAlt: "Gitlet Version Control System",
      technologies: [
        "Java",
        "File I/O",
        "Serialization",
        "Makefile",
        "Git Concepts",
        "Testing",
      ],
      badge: "Academic",
    },
    {
      title: "MapList Website",
      description: [
        "Adopted the MERN stack (MongoDB, Express.js, React.js, Node.js) with React.js and Redux to develop a web application",
        "On this website, users can bookmark map coordinates and share them with others",
        "Implemented a navigation bar, homepage, and user profile page featuring basic user interactions and post publishing functionalities",
        "Integrated MapTiler's API into the website, enabling users to perform various actions on the map",
      ],
      imageUrl: "/maplist.png",
      imageAlt: "Smart Map Website",
      technologies: [
        "React.js",
        "Express.js",
        "Node.js",
        "MongoDB",
        "Redux",
        "MapTiler API",
      ],
      badge: "Web App",
    },
    {
      title: "Personal Website - Full Stack",
      description: [
        "Built full‑stack site with Next.js + Tailwind CSS frontend and Spring Boot REST APIs, with CI/CD (Actions + Docker); 70% test coverage.",
        "Optimized queries via selective eager fetch, composite indexes, and in‑memory cache.",
        "Reduced latency from 280 ms to 20 ms; supports hundreds of concurrent requests.",
        "Implemented scalable like/vote with Redis+Lua (atomic ops) and scheduled async persistence to offload DB.",
      ],
      imageUrl: "/PersonalBlog.jpg",
      imageAlt: "Personal Website",
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "Spring Boot",
        "PostgreSQL",
        "Redis",
        "Docker",
        "GitHub Actions",
      ],
      badge: "Personal",
    },
  ];
  // Featured skills - derived from the main skills list to ensure DRY and consistent colors
  const featuredSkillNames = [
    "Java",
    "Python",
    "JavaScript",
    "C++",
    "TypeScript",
    "Spring Boot",
    "Spring Cloud",
    "Django",
    "React",
    "Next.js",
    "AWS",
    "Docker",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "TensorFlow",
    "Git",
    "OOP",
    "System Design",
    "Data Structures",
    "Algorithms",
    "Microservices",
    "REST API",
    "Firebase",
  ] as const;

  // Prefer colors from these categories when a skill appears in multiple places
  const categoryPreference = [
    "Frontend",
    "Computer languages",
    "Database",
    "DevOps",
    "AI/ML",
    "Tools",
    "Foundations",
    "Backend",
  ];

  const featuredSkills = featuredSkillNames.flatMap((name) => {
    const matches = skills.filter((s) => s.name === name);
    if (matches.length === 0) return [];
    const preferred =
      categoryPreference
        .map((cat) => matches.find((m) => m.category === cat))
        .find((m) => !!m) || matches[0];
    return [{ name, category: "Featured", color: preferred.color }];
  });

  const filteredSkills =
    activeCategory === "Featured"
      ? featuredSkills
      : skills.filter((s) => s.category === activeCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-300 via-orange-200 to-indigo-300 bg-fixed flex items-center justify-center">
        <div className="text-gray-800 dark:text-white text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-orange-200 to-indigo-300 bg-fixed relative overflow-hidden">
      {/* Return button */}
      <button
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-black/80 text-gray-800 dark:text-white px-2 sm:px-4 py-1.5 sm:py-2 shadow-md backdrop-blur transition-colors text-sm sm:text-base"
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
      <div className="relative z-10 min-h-screen px-4 sm:px-6 pt-12 sm:pt-16 md:pt-4 pb-24 md:pb-28">
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto w-full min-h-screen flex items-center justify-center lg:justify-start -mt-8 md:-mt-12 lg:-mt-20"
        >
          {/* Dynamic layout based on responsive detection */}
          <div
            className={`flex ${
              isVerticalLayout
                ? "flex-col"
                : "lg:grid lg:grid-cols-[minmax(280px,420px)_1fr]"
            } items-center justify-center lg:justify-start ${
              isVerticalLayout
                ? "gap-8 sm:gap-10 md:gap-12"
                : "gap-4 sm:gap-6 lg:gap-8 xl:gap-12"
            } w-full`}
          >
            {/* Title - Typewriter (left on large screens when horizontal, centered when vertical) */}
            <div
              className={`${
                isVerticalLayout ? "text-center" : "text-center lg:text-left"
              } justify-self-start w-full flex justify-center lg:justify-start ${
                isVerticalLayout ? "mt-8 sm:mt-12" : ""
              }`}
            >
              <TypewriterTitle />
            </div>
            {/* Instagram Style About Me Card (right on large screens when horizontal, centered below when vertical) */}
            <div
              className={`w-full flex items-center ${
                isVerticalLayout
                  ? "justify-center px-2"
                  : "justify-center lg:justify-end justify-self-end"
              } ${isVerticalLayout ? "" : "mt-6 lg:mt-0"}`}
            >
              <InstagramCard className="lg:ml-auto lg:mr-0 lg:w-auto" />
            </div>
          </div>
        </div>

        {/* Bouncing scroll hint - positioned at bottom of initial viewport only */}
        {!isVerticalLayout && (
          <div
            className={`absolute inset-x-0 flex flex-col items-center justify-center gap-2 pointer-events-none ${"bottom-16 md:bottom-18"}`}
          >
            <span className="text-sm md:text-base text-gray-800/80 dark:text-white/80 font-medium">
              Scroll down to explore my skills, projects, education, and career
              opportunities
            </span>
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-gray-800/80 dark:text-white/80 animate-bounce"
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
        )}
      </div>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative z-10 px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-24"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12 tracking-tight">
            Technical Skills
          </h2>

          {/* Category row */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-6 justify-center px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm border transition-colors backdrop-blur-sm whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-gray-900 border-white/60 shadow"
                    : "bg-white/20 text-gray-800 dark:text-white border-white/40 hover:bg-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid - unified format for all categories */}
          <div className="max-w-6xl mx-auto">
            <div className="min-h-[300px] sm:min-h-[400px] flex flex-col">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 px-2">
                {filteredSkills.map((s) => (
                  <SkillCard
                    key={`${s.category}-${s.name}`}
                    name={s.name}
                    accentColor={s.color}
                    size="normal"
                  />
                ))}
              </div>

              {/* Legend - show proficiency levels for Computer languages */}
              {activeCategory === "Computer languages" && (
                <div className="mt-12 flex justify-center">
                  <div className="bg-white/90 dark:bg-black/40 rounded-xl p-5 shadow-lg border border-white/60 dark:border-white/20 backdrop-blur-sm">
                    <div className="flex flex-col gap-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                        Proficiency Levels:
                      </span>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            Proficient Application
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            Proficient
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            Familiar
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Legend - show proficiency levels for Spoken languages */}
              {activeCategory === "Spoken languages" && (
                <div className="mt-12 flex justify-center">
                  <div className="bg-white/90 dark:bg-black/40 rounded-xl p-5 shadow-lg border border-white/60 dark:border-white/20 backdrop-blur-sm">
                    <div className="flex flex-col gap-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                        Language Proficiency Levels:
                      </span>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            Native
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            Proficiency
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            Beginner
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Legend / guidance card */}
              {activeCategory === "Featured" && (
                <div className="mt-8 flex justify-center">
                  <div className="bg-white/90 dark:bg-black/40 rounded-xl p-4 shadow-lg border border-white/60 dark:border-white/20 backdrop-blur-sm max-w-3xl">
                    <div className="flex flex-col gap-2 text-center">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Featured shows a curated set of skills. Colors are kept
                        consistent with their detailed categories. To see what
                        each color represents, switch to a specific category
                        above and a color legend will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Legend - only show for other non-Featured categories */}
              {activeCategory !== "Featured" &&
                activeCategory !== "Computer languages" &&
                activeCategory !== "Spoken languages" && (
                  <div className="mt-8 flex justify-center">
                    <div className="bg-white/90 dark:bg-black/40 rounded-xl p-4 shadow-lg border border-white/60 dark:border-white/20 backdrop-blur-sm">
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                          Legend:
                        </span>
                        {activeCategory === "Frontend" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: frontendColors.coreLanguages,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Core Languages
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: frontendColors.frameworks,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Frameworks
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: frontendColors.styling,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Styling
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor:
                                    frontendColors.stateManagement,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                State Management
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: frontendColors.design,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Design
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: frontendColors.buildTools,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Build Tools
                              </span>
                            </div>
                          </div>
                        ) : activeCategory === "Backend" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.frameworks,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Core Languages
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: "#3b82f6",
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Java Basics & JVM
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.webFrameworks,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Web Frameworks
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.frameworksDark,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Spring Ecosystem
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.caching,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Caching
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.security,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Security
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.messageQueues,
                                }}
                              ></div>
                              <span className="text-gray-70 dark:text-gray-30">
                                Message Queues
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.apis,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                APIs & Documentation
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.baas,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                BaaS
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: backendColors.testing,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Testing
                              </span>
                            </div>
                          </div>
                        ) : activeCategory === "Database" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.relational,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Relational DBs
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.nosql,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                NoSQL DBs
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.orm,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                ORM & Access
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.querying,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Querying
                              </span>
                            </div>
                          </div>
                        ) : activeCategory === "DevOps" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.cloud,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Cloud Platforms
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.containers,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Containers
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.cicd,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                CI/CD & Version
                              </span>
                            </div>
                          </div>
                        ) : activeCategory === "AI/ML" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.aiFrameworks,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Frameworks
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.aiAlgorithms,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Algorithms
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.aiTools,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Tools & Features
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.aiApis,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                APIs & Services
                              </span>
                            </div>
                          </div>
                        ) : activeCategory === "Tools" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.ide,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                IDEs & Editors
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.testing,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Testing & Debug
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.version,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Version Control & Scripting
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.build,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Build & Config
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: "#14b8a6",
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Deploy & Hosting
                              </span>
                            </div>
                          </div>
                        ) : activeCategory === "Foundations" ? (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.algorithms,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Algorithms & DS
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.design,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                System & Network
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.patterns,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Patterns & Principles
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{
                                  backgroundColor: otherColors.security,
                                }}
                              ></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Security & Compliance
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-blue-600"></div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              Color represents skill category
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Deep tech style with Apple cards */}
      <section id="projects" className="relative z-10 px-6 py-16 md:py-24">
        {/* High-tech backdrop for projects section */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-gray-900/95 to-indigo-950/95 backdrop-blur-sm">
          {/* High-tech floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[20rem] h-[20rem] bg-blue-800/20 rounded-full blur-2xl"></div>
            <div className="absolute top-12 -right-16 w-[16rem] h-[16rem] bg-cyan-800/25 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-16 w-[22rem] h-[22rem] bg-slate-700/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -right-8 w-[16rem] h-[16rem] bg-indigo-800/25 rounded-full blur-2xl"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight font-mono">
              Featured Projects ➕ Working Experience
            </h2>
          </div>

          {/* Apple-style Project Carousel on dark background */}
          <AppleStyleProjectCarousel projects={projects} />
        </div>
      </section>

      {/* Education & Contact Section - unified background */}
      <div className="relative z-10">
        {/* Unified warm gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-300/80 via-orange-200/80 to-indigo-300/80 backdrop-blur-sm">
          {/* Warm floating elements - positioned to avoid overlap with education cards */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[18rem] h-[18rem] bg-rose-400/20 rounded-full blur-2xl"></div>
            <div className="absolute top-12 -right-16 w-[15rem] h-[15rem] bg-orange-300/25 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[16rem] h-[16rem] bg-indigo-400/15 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 right-1/3 w-[18rem] h-[18rem] bg-rose-400/15 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -right-8 w-[14rem] h-[14rem] bg-pink-300/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Education Section */}
        <section
          id="education"
          className="relative z-20 px-4 sm:px-6 py-16 md:py-24 lg:px-6"
        >
          <div className="max-w-7xl mx-auto relative z-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12 tracking-tight">
              Education Background
            </h2>

            {/* Instagram-style Education Cards - Responsive Layout */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 px-2">
              {/* University of Washington - equal width */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <EducationInstagramCard
                  university="University of Washington"
                  degree="Master of Science in Electrical and Computer Engineering"
                  period="2024 - 2026"
                  gpa="3.9/4.0"
                  description="Participating in multiple internships to gain hands-on development skills, actively engaging in capstone projects, and learning fundamental computer science courses to build a solid foundation."
                  imageUrl="/uwphoto.jpg"
                  imageAlt="University of Washington"
                  articleId={999998}
                  initialLikes={32}
                  hashtags="#UW #ECE #Masters #SoftwareEngineering #Seattle #Internship"
                  dateText="MAY 31 2025"
                />
              </div>

              {/* Sun Yat-sen University - equal width */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <EducationInstagramCard
                  university="Sun Yat-sen University"
                  degree="
Bachelor of Engineering in Electronic Information Science and Technology"
                  period="2020 - 2024"
                  gpa="3.7/4.0"
                  description="Built a solid foundation in mathematics and physics, studied hardware signal processing and circuit-related knowledge, discovered interest in computer science, and established the aspiration to become a Software Development Engineer."
                  imageUrl="/sysuphoto.jpg"
                  imageAlt="Sun Yat-sen University"
                  articleId={999997}
                  initialLikes={28}
                  hashtags="#SYSU #SoftwareEngineering #Bachelors #Guangzhou #GPA #ComputerScience"
                  dateText="JUNE 18 2024"
                  reverseOnLg
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Career Section */}

        <section
          id="contact"
          className="relative z-10 px-4 sm:px-6 py-16 md:py-24"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight">
              😊 Ready to learn and contribute.
            </h2>

            <div className="mb-6 sm:mb-8 px-2">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 tracking-tight leading-relaxed">
                Open to Job Opportunities Across the World 🇺🇸 🇨🇳 🇯🇵 🇭🇰 🇪🇺 🇬🇧 🇦🇺
                🇸🇬 🇨🇦
              </h3>
            </div>

            {/* Contact Form */}
            <div className="mb-12">
              <ContactForm
                onSubmit={(data) => {
                  console.log("Contact form submitted:", data);
                  // Handle form submission here if needed
                }}
              />
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-24 md:h-32 relative z-10"></div>
      </div>

      {/* Fixed Social Links Popup */}
      <SocialLinksPopup
        linkedinUrl="https://linkedin.com/in/yuechenguo59/"
        githubUrl="https://github.com/df4b2606"
        emailAddress="yuechenguo59@gmail.com"
        resumeFileName="resume1003.pdf"
      />
    </div>
  );
}

// Typewriter headline component
function TypewriterTitle() {
  const fullText = "Hello World! I'm David Guo";
  const degreeText = "UW ECE Master's student";
  const skillsText = "Experienced in Java, Python, AWS, AI/ML";
  const roleText = "Open to Software Engineer Opportunities";
  const [display, setDisplay] = useState("");
  const [degreeDisplay, setDegreeDisplay] = useState("");
  const [skillsDisplay, setSkillsDisplay] = useState("");
  const [roleDisplay, setRoleDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [degreeIdx, setDegreeIdx] = useState(0);
  const [skillsIdx, setSkillsIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const speed = 80; // ms per char

  // Get responsive layout state
  const { isVerticalLayout } = useResponsiveLayout();

  // First text animation
  useEffect(() => {
    if (idx > fullText.length) return;
    const t = setTimeout(() => {
      setDisplay(fullText.slice(0, idx));
      setIdx((v) => v + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [idx]);

  // Degree text animation - starts simultaneously with main text
  useEffect(() => {
    if (degreeIdx > degreeText.length) return;
    const t = setTimeout(() => {
      setDegreeDisplay(degreeText.slice(0, degreeIdx));
      setDegreeIdx((v) => v + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [degreeIdx]);

  // Skills text animation - starts after degree text is done
  useEffect(() => {
    if (degreeIdx <= degreeText.length) return; // Wait for degree text to finish
    if (skillsIdx > skillsText.length) return;
    const t = setTimeout(() => {
      setSkillsDisplay(skillsText.slice(0, skillsIdx));
      setSkillsIdx((v) => v + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [skillsIdx, degreeIdx]);

  // Role text animation - starts after skills text is done
  useEffect(() => {
    if (skillsIdx <= skillsText.length) return; // Wait for skills text to finish
    if (roleIdx > roleText.length) return;
    const t = setTimeout(() => {
      setRoleDisplay(roleText.slice(0, roleIdx));
      setRoleIdx((v) => v + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [roleIdx, skillsIdx]);

  useEffect(() => {
    setIdx(0);
    setDisplay("");
    setDegreeIdx(0);
    setDegreeDisplay("");
    setSkillsIdx(0);
    setSkillsDisplay("");
    setRoleIdx(0);
    setRoleDisplay("");
  }, []);

  const breakIndex = fullText.indexOf("!") + 1;
  const firstLine = display.slice(0, Math.min(display.length, breakIndex));
  const secondLine =
    display.length > breakIndex ? display.slice(breakIndex) : "";

  return (
    <div
      className={`${
        isVerticalLayout
          ? "h-[300px] sm:h-[350px]"
          : "h-[350px] sm:h-[400px] md:h-[450px]"
      } flex flex-col justify-start`}
    >
      {/* Fixed position for main title */}
      <div
        className={`flex-shrink-0 ${
          isVerticalLayout
            ? "mb-2 sm:mb-4 mt-4 sm:mt-6"
            : "mb-4 sm:mb-6 mt-2 sm:mt-8"
        }`}
      >
        <h1
          className={`font-bold text-gray-900 dark:text-white tracking-tight ${
            isVerticalLayout
              ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          }`}
        >
          <div className="min-h-[2.4em] flex flex-col justify-start text-center lg:text-left">
            <span className="block leading-tight min-h-[1.2em]">
              {firstLine}
              {display.length <= breakIndex &&
                display.length < fullText.length && (
                  <span className="inline-block w-1 h-6 sm:h-8 md:h-10 bg-gray-900 dark:bg-white ml-1 align-middle animate-pulse" />
                )}
            </span>
            <span className="block leading-tight min-h-[1.2em]">
              {secondLine}
              {display.length > breakIndex &&
                display.length < fullText.length && (
                  <span className="inline-block w-1 h-6 sm:h-8 md:h-10 bg-gray-900 dark:bg-white ml-1 align-middle animate-pulse" />
                )}
            </span>
          </div>
        </h1>
      </div>

      {/* Fixed container for subtitle lines */}
      <div
        className={`flex-shrink-0 ${
          isVerticalLayout
            ? "space-y-1 sm:space-y-2 min-h-[5em] sm:min-h-[6em]"
            : "space-y-2 sm:space-y-4 min-h-[6em] sm:min-h-[7.2em]"
        } text-center lg:text-left`}
      >
        <p className="text-base sm:text-lg md:text-xl lg:text-xl font-serif italic text-purple-600 dark:text-purple-400 tracking-wide min-h-[1.5em] sm:min-h-[1.8em] leading-relaxed">
          {degreeDisplay}
          {degreeDisplay.length < degreeText.length && (
            <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-purple-600 dark:bg-purple-400 ml-1 align-middle animate-pulse" />
          )}
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl font-serif italic text-purple-600 dark:text-purple-400 tracking-wide min-h-[1.5em] sm:min-h-[1.8em] leading-relaxed">
          {skillsDisplay}
          {skillsDisplay && !roleDisplay && (
            <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-purple-600 dark:bg-purple-400 ml-1 align-middle animate-pulse" />
          )}
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl font-serif italic text-purple-600 dark:text-purple-400 tracking-wide min-h-[1.5em] sm:min-h-[1.8em] leading-relaxed">
          {roleDisplay}
          {roleDisplay && (
            <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-purple-600 dark:bg-purple-400 ml-1 align-middle animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}
