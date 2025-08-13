"use client";

import { useEffect, useRef, useState } from "react";

export type AboutMeButtonVariant = "solid" | "gradient";

export interface AboutMeButtonProps {
  href?: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  variant?: AboutMeButtonVariant;
}

const AboutMeButton = ({
  href = "/about",
  label = "About Me",
  className = "",
  fullWidth = false,
  variant = "solid",
}: AboutMeButtonProps) => {
  const [sparkles, setSparkles] = useState<
    {
      id: string;
      leftPercent: number;
      topPercent: number;
      sizePx: number;
      durationMs: number;
      delayMs: number;
    }[]
  >([]);

  const intervalRef = useRef<number | null>(null);

  const generateSparkles = () => {
    const count = 2 + Math.floor(Math.random() * 3);

    const avoidCenter = { x: 50, y: 50, rx: 14, ry: 12 };
    const minDistance = 12;

    const positions: { leftPercent: number; topPercent: number }[] = [];

    const leftStart = 58;
    const leftEnd = 88;
    const jitter = 4;
    const anchors = Array.from({ length: count }).map((_, i) => {
      const base = leftStart + ((i + 1) / (count + 1)) * (leftEnd - leftStart);
      const j = (Math.random() * 2 - 1) * jitter;
      return Math.min(90, Math.max(55, base + j));
    });

    const sampleTop = () => 38 + Math.random() * 28;

    const isValid = (p: { leftPercent: number; topPercent: number }) => {
      const inAvoid =
        Math.abs(p.leftPercent - avoidCenter.x) < avoidCenter.rx &&
        Math.abs(p.topPercent - avoidCenter.y) < avoidCenter.ry;
      if (inAvoid) return false;

      for (const q of positions) {
        const dx = p.leftPercent - q.leftPercent;
        const dy = p.topPercent - q.topPercent;
        const d = Math.hypot(dx, dy);
        if (d < minDistance) return false;
      }
      return true;
    };

    anchors.forEach((x) => {
      let attempts = 0;
      let pos = { leftPercent: x, topPercent: sampleTop() };
      while (!isValid(pos) && attempts < 25) {
        pos = { leftPercent: x, topPercent: sampleTop() };
        attempts += 1;
      }
      positions.push(pos);
    });

    const created = positions.map((pos, idx) => {
      const sizePx = 10 + Math.floor(Math.random() * 10);
      const durationMs = 900 + Math.floor(Math.random() * 700);
      const delayMs = idx * 120;
      return {
        id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        leftPercent: pos.leftPercent,
        topPercent: pos.topPercent,
        sizePx,
        durationMs,
        delayMs,
      };
    });

    setSparkles(created);
    const maxMs = Math.max(...created.map((s) => s.durationMs + s.delayMs));
    window.setTimeout(() => setSparkles([]), maxMs + 80);
  };

  const handleSparkleEnter = () => {
    if (variant !== "gradient") return;
    generateSparkles();
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(generateSparkles, 900);
  };

  const handleSparkleLeave = () => {
    if (variant !== "gradient") return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSparkles([]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  if (variant === "solid") {
    return (
      <a
        href={href}
        className={`px-6 py-2 bg-white/90 text-black font-medium text-sm rounded-lg hover:bg-white transition-colors ${
          fullWidth ? "w-full sm:w-auto" : ""
        } backdrop-blur-sm ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`group block ${
        fullWidth ? "w-full sm:w-auto" : ""
      } ${className}`}
      onMouseEnter={handleSparkleEnter}
      onMouseLeave={handleSparkleLeave}
    >
      <div className="relative w-full overflow-hidden text-white/80 group-hover:text-white text-sm font-medium rounded-lg py-2 text-center transition duration-300 backdrop-blur-sm bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 group-hover:from-orange-500 group-hover:via-amber-400 group-hover:to-fuchsia-600 group-hover:saturate-150 group-hover:brightness-110">
        <span className="relative z-10">{label}</span>
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{
              left: `${s.leftPercent}%`,
              top: `${s.topPercent}%`,
              animationDuration: `${s.durationMs}ms`,
              animationDelay: `${s.delayMs}ms`,
            }}
          >
            <span
              className="relative block rotate-45"
              style={{
                width: `${s.sizePx}px`,
                height: `${s.sizePx}px`,
                backgroundImage:
                  "radial-gradient(circle at center, rgba(255,230,0,0.95) 0%, rgba(255,166,0,0.9) 55%, rgba(255,166,0,0.0) 70%)",
              }}
            >
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${s.sizePx * 2}px`,
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                }}
              />
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "2px",
                  height: `${s.sizePx * 2}px`,
                  background:
                    "linear-gradient(180deg, transparent, rgba(255,255,255,0.9), transparent)",
                }}
              />
            </span>
          </span>
        ))}
      </div>
    </a>
  );
};

export default AboutMeButton;
