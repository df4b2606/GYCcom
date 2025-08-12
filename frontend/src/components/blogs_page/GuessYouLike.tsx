"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, getArticleList } from "@/api/article";
import BlogsListCard from "./BlogsListCard";

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
      className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4">Guess you like</h3>
      <BlogsListCard articles={candidates} loading={loading} error={null} />
    </aside>
  );
};

export default GuessYouLike;
