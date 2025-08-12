"use client";

import { useEffect, useMemo, useState } from "react";
import { Article, getArticleList } from "@/api/article";
import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";
import LatestUpdatesCard from "@/components/home_components/LatestUpdatesCard";
import TagsCard from "@/components/home_components/TagsCard";
import { BlogsListCard } from "@/components/blogs_page";
import CategoryCard, {
  CategoryItem,
} from "@/components/blogs_page/CategoryCard";
import Image from "next/image";

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categories = useMemo<CategoryItem[]>(() => {
    const nameToItem = new Map<string, CategoryItem>();
    articles.forEach((article) => {
      const c = article.category as unknown;
      let name: string | undefined;
      let color: string | undefined;
      if (typeof c === "string") {
        name = c;
      } else if (c && typeof c === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj = c as any;
        name = obj?.name ?? obj?.title ?? undefined;
        color = obj?.color;
      }
      if (!name) return;
      const key = String(name);
      const existing = nameToItem.get(key);
      if (existing) {
        existing.count = (existing.count ?? 0) + 1;
        if (!existing.color && color) existing.color = color;
      } else {
        nameToItem.set(key, { name: key, count: 1, color });
      }
    });
    return Array.from(nameToItem.values()).sort(
      (a, b) => (b.count ?? 0) - (a.count ?? 0)
    );
  }, [articles]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("🔍 Start fetching article list...");
        const response = await getArticleList();
        console.log("📡 API response:", response);
        console.log("📊 Response status:", response.status);
        console.log("📋 Response data:", response.data);
        console.log("📋 Data type:", typeof response.data);
        console.log("📋 Is array:", Array.isArray(response.data));

        // Ensure articles is an array
        if (response.data && Array.isArray(response.data)) {
          console.log("✅ Article data valid, setting to state");
          setArticles(response.data);
        } else {
          console.warn("⚠️ Article data invalid:", response.data);
          setArticles([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch articles:", error);
        setError("Failed to fetch articles, please try again later");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen relative">
        {/* Fixed background image, consistent with homepage */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/DSC07098.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">loading...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen relative">
        {/* Fixed background image, consistent with homepage */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/DSC07098.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image, consistent with homepage */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/DSC07098.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Constant overlay, no change on scroll, ensuring readability */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Right sidebar information area */}
      <div className="relative z-10">
        {/* Right sidebar cards container - using flexbox for vertical layout with automatic spacing */}
        <div className="absolute top-24 right-6 w-72 hidden lg:flex lg:flex-col lg:gap-6 z-10">
          {/* Personal Info Card */}
          <PersonalInfoCard />

          {/* Category Card */}
          <CategoryCard categories={categories} />

          {/* Tags Card */}
          <TagsCard />

          {/* Latest Updates Card */}
          <LatestUpdatesCard />
        </div>

        {/* Main Content - Responsive layout */}
        <div className="px-6 lg:pl-6 lg:pr-88 pb-48 pt-24">
          <div className="max-w-8xl lg:max-w-8xl mx-auto lg:mx-0">
            <BlogsListCard
              articles={articles}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
