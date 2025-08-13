"use client";

import { useState } from "react";

export interface EnjoyActionsCardProps {
  className?: string;
  articleTitle?: string;
}

/**
 * EnjoyActionsCard
 * A reusable action block with Appreciate and Share buttons.
 * The background uses a subtle multi-color gradient with low opacity
 * so it feels lively but still fits a dark theme.
 */
const EnjoyActionsCard = ({
  className = "",
  articleTitle,
}: EnjoyActionsCardProps) => {
  const [appreciated, setAppreciated] = useState(false);

  const handleShare = async () => {
    try {
      const shareData = {
        title: articleTitle ?? "Article",
        text: articleTitle ?? "Article",
        url: typeof window !== "undefined" ? window.location.href : "",
      };
      const anyNavigator = navigator as unknown as {
        share?: (data: {
          title: string;
          text: string;
          url: string;
        }) => Promise<void>;
      };
      if (typeof navigator !== "undefined" && anyNavigator.share) {
        await anyNavigator.share(shareData);
      } else if (typeof window !== "undefined") {
        await navigator.clipboard?.writeText(shareData.url);
        alert("Link copied to clipboard");
      }
    } catch (e) {
      console.error("share failed", e);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 bg-[#111315] ${className}`}
    >
      {/* Decorative gradient background (subtle, multi-color) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Primary cool gradient: deep green to deep blue */}
        <div className="absolute -inset-16 bg-gradient-to-br from-emerald-400/20 via-teal-400/15 to-sky-500/20 blur-3xl" />
        {/* Secondary conic wash to add depth */}
        <div className="absolute -inset-24 bg-gradient-conic from-cyan-400/20 via-blue-500/15 to-emerald-400/15 blur-2xl" />
        {/* Corner glows (cool tones) */}
        <div className="absolute -top-10 left-1/3 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-emerald-300/30 to-transparent blur-xl" />
        <div className="absolute -bottom-12 -right-8 w-1/2 h-1/2 rounded-full bg-gradient-to-tl from-sky-500/30 to-transparent blur-xl" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10">
        <h3 className="text-white font-semibold text-lg mb-1">
          Enjoyed this article?
        </h3>
        <p className="text-gray-300 mb-4">
          Support the author or share with friends.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAppreciated(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              appreciated
                ? "bg-green-500/20 border-green-400/40 text-green-300"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
            }`}
            disabled={appreciated}
          >
            <span>Appreciate</span>
            {appreciated && <span>✓</span>}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
          >
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnjoyActionsCard;
