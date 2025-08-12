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
  limit = 5,
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

  return (
    <aside
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4">Guess you like</h3>
      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : candidates.length === 0 ? (
        <div className="text-gray-400 text-sm">No recommendations</div>
      ) : (
        <ul className="space-y-3">
          {candidates.map((a) => (
            <li key={a.id} className="group">
              <Link
                href={`/blogs/${a.shortUrl}`}
                className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="text-gray-200 text-sm font-medium truncate group-hover:text-blue-300">
                  {a.title}
                </div>
                <div className="text-gray-500 text-xs">
                  {new Date(a.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default GuessYouLike;
