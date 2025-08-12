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
  // Keep a copy of the full list to compute categories so they don't disappear when filtering
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Currently selected category id for server-side filtering
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const categories = useMemo<CategoryItem[]>(() => {
    const source = allArticles.length > 0 ? allArticles : articles;
    const nameToItem = new Map<string, CategoryItem>();
    source.forEach((article) => {
      const c = article.category as unknown;
      let name: string | undefined;
      let color: string | undefined;
      let id: number | undefined;
      if (typeof c === "string") {
        name = c;
      } else if (c && typeof c === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj = c as any;
        name = obj?.name ?? obj?.title ?? undefined;
        color = obj?.color;
        id = typeof obj?.id === "number" ? obj.id : undefined;
      }
      if (!name) return;
      const key = String(name);
      const existing = nameToItem.get(key);
      if (existing) {
        existing.count = (existing.count ?? 0) + 1;
        if (!existing.color && color) existing.color = color;
        if (!existing.id && id) existing.id = id;
      } else {
        nameToItem.set(key, { id, name: key, count: 1, color });
      }
    });
    return Array.from(nameToItem.values()).sort(
      (a, b) => (b.count ?? 0) - (a.count ?? 0)
    );
  }, [articles, allArticles]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getArticleList(
          selectedCategory != null
            ? { category: String(selectedCategory) }
            : undefined
        );
        // Ensure articles is an array
        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data);
          if (selectedCategory == null) {
            setAllArticles(response.data);
          }
        } else {
          setArticles([]);
          if (selectedCategory == null) {
            setAllArticles([]);
          }
        }
      } catch (error) {
        console.error("❌ Failed to fetch articles:", error);
        setError("Failed to fetch articles, please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

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

      {/* Content area using grid so the sidebar participates in normal flow */}
      <div className="relative z-10 px-6 pb-24 pt-24">
        <div className="max-w-8xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-6">
          {/* Main column */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              All Blogs
            </h1>
            <BlogsListCard
              articles={articles}
              loading={loading}
              error={error}
            />
          </div>
          {/* Sidebar column */}
          <div className="hidden lg:block">
            <div className="flex flex-col gap-6">
              <PersonalInfoCard />
              <CategoryCard
                categories={categories}
                selected={selectedCategory}
                onSelect={(id) => setSelectedCategory(id)}
              />
              <TagsCard />
              <LatestUpdatesCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
