"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, getArticleList } from "@/api/article";

export interface GuessYouLikeProps {
  className?: string;
  excludeShortUrl?: string;
  limit?: number;
}

const GuessYouLike = ({
  className = "",
  excludeShortUrl,
  limit = 3,
}: GuessYouLikeProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getArticleList();
        setArticles(res.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const candidates = articles
    .filter((a) => (excludeShortUrl ? a.shortUrl !== excludeShortUrl : true))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);

  // Helpers for compact card visuals
  const getThumbnailColor = (index: number) => {
    const colors = [
      "from-green-400 to-blue-500",
      "from-blue-400 to-purple-500",
      "from-green-500 to-emerald-600",
      "from-orange-400 to-red-500",
      "from-purple-400 to-pink-500",
      "from-gray-400 to-blue-500",
      "from-yellow-400 to-orange-500",
      "from-pink-400 to-purple-500",
    ];
    return colors[index % colors.length];
  };

  const getArticleIcon = (title: string, index: number) => {
    const icons = ["📱", "💻", "🔧", "🚀", "📚", "🎨", "📷", "🌐"];
    return icons[index % icons.length];
  };

  return (
    <aside
      className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4">Guess you like</h3>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : candidates.length === 0 ? (
        <div className="text-gray-400 text-sm">No recommendations</div>
      ) : (
        <div className="space-y-4">
          {candidates.map((a, index) => (
            <Link key={a.id} href={`/blogs/${a.shortUrl}`} className="block">
              <article className="bg-white/10 rounded-xl p-5 border border-white/10 hover:border-white/30 transition-all">
                <div className="flex items-start gap-5">
                  <div
                    className={`w-28 h-16 rounded-lg bg-gradient-to-r ${getThumbnailColor(
                      index
                    )} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}
                  >
                    {getArticleIcon(a.title, index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-base mb-1 line-clamp-2">
                      {a.title}
                    </h4>
                    {a.excerpt && (
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {a.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};

export default GuessYouLike;
