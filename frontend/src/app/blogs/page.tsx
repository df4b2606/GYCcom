"use client";

import { useEffect, useMemo, useState } from "react";
import { Article, getArticleList } from "@/api/article";
import { getTagList } from "@/api/tag";
import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";
import LatestUpdatesCard from "@/components/home_components/LatestUpdatesCard";
import TagsCard from "@/components/home_components/TagsCard";
import { BlogsListCard } from "@/components/blogs_page";
import CategoryCard, {
  CategoryItem,
} from "@/components/blogs_page/CategoryCard";
import Image from "next/image";
import { useTheme } from "@/components/common/ThemeProvider";

// Tag item type for local use
interface TagItem {
  name: string;
  count: number;
}

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isDark } = useTheme();
  // Keep a copy of the full list to compute categories so they don't disappear when filtering
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Currently selected category id for server-side filtering
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // Currently selected tags for filtering
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // Tags loaded directly from API
  const [tags, setTags] = useState<TagItem[]>([]);

  // Load tags directly from API (much faster!)
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTagList();
        if (response.data && Array.isArray(response.data)) {
          // Convert Tag[] to TagItem[] and sort by usage count
          const tagItems: TagItem[] = response.data
            .map((tag) => ({
              name: tag.name,
              count: tag.usageCount || 0,
            }))
            .sort((a, b) => b.count - a.count); // Sort by usage count descending
          setTags(tagItems);
        } else {
          setTags([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch tags:", error);
        setTags([]);
      }
    };

    fetchTags();
  }, []); // Only run once on component mount

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

  // Get selected category name
  const selectedCategoryName = useMemo(() => {
    if (selectedCategory === null) return null;
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category?.name || null;
  }, [selectedCategory, categories]);

  // Handle tag selection
  const handleTagSelect = (tagName: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagName)) {
        return prev.filter((tag) => tag !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  // Remove specific tag
  const removeTag = (tagName: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagName));
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        let response;

        // Step 1: Get base articles (by category or all)
        if (selectedCategory != null) {
          // Start with category filtering
          response = await getArticleList({
            category: String(selectedCategory),
          });
        } else {
          // Get all articles
          response = await getArticleList();
        }

        // Ensure articles is an array
        if (response.data && Array.isArray(response.data)) {
          let filteredArticles = response.data;

          // Step 2: Apply tag filtering on the category-filtered results (client-side)
          if (selectedTags.length > 0) {
            filteredArticles = filteredArticles.filter((article) => {
              // Check if article has any of the selected tags (OR logic for tags)
              if (!article.tags || !Array.isArray(article.tags)) return false;

              return selectedTags.some((selectedTag) => {
                return article.tags!.some((articleTag) => {
                  const tagName =
                    typeof articleTag === "string"
                      ? articleTag
                      : articleTag.name;
                  return tagName === selectedTag;
                });
              });
            });
          }

          setArticles(filteredArticles);

          // Only update allArticles when no filters are applied
          if (selectedCategory == null && selectedTags.length === 0) {
            setAllArticles(response.data);
          }
        } else {
          setArticles([]);
          if (selectedCategory == null && selectedTags.length === 0) {
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
  }, [selectedCategory, selectedTags]);

  if (loading)
    return (
      <div className="min-h-screen relative">
        {/* Fixed background image, consistent with homepage */}
        {isDark ? (
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
        ) : (
          <div className="fixed inset-0 z-0 bg-gray-100" />
        )}

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className={`${isDark ? "text-white" : "text-gray-800"} text-xl`}>
            loading...
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen relative">
        {/* Fixed background image, consistent with homepage */}
        {isDark ? (
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
        ) : (
          <div className="fixed inset-0 z-0 bg-gray-100" />
        )}

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image, consistent with homepage */}
      {isDark ? (
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
      ) : (
        <div className="fixed inset-0 z-0" />
      )}

      {/* Content area using grid so the sidebar participates in normal flow */}
      <div className="relative z-10 px-6 pb-24 pt-24">
        <div className="max-w-8xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-6">
          {/* Main column */}
          <div>
            <h1
              className={`text-3xl lg:text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              All Blogs
            </h1>

            {/* Filter status display */}
            {(selectedCategoryName || selectedTags.length > 0) && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  isDark
                    ? "bg-gray-800/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {/* Semantic description */}
                <div className="mb-3">
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {(() => {
                      const totalArticles = articles.length;
                      let description = `Articles are`;

                      if (selectedCategoryName && selectedTags.length > 0) {
                        description += ` in "${selectedCategoryName}" category and have ${
                          selectedTags.length === 1
                            ? `"${selectedTags[0]}" tag`
                            : `tags: ${selectedTags
                                .map((tag) => `"${tag}"`)
                                .join(", ")}`
                        }`;
                      } else if (selectedCategoryName) {
                        description += ` in "${selectedCategoryName}" category`;
                      } else if (selectedTags.length > 0) {
                        description += ` with ${
                          selectedTags.length === 1
                            ? `"${selectedTags[0]}" tag`
                            : `tags: ${selectedTags
                                .map((tag) => `"${tag}"`)
                                .join(", ")}`
                        }`;
                      }

                      description += ` (${totalArticles} ${
                        totalArticles === 1 ? "result" : "results"
                      })`;

                      return description;
                    })()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Filters:
                  </span>

                  {/* Selected Category */}
                  {selectedCategoryName && (
                    <div className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      <span>Category: {selectedCategoryName}</span>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="ml-1 hover:bg-blue-600 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Selected Tags */}
                  {selectedTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <span>Tag: {tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-green-600 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Clear all button */}
                  <button
                    onClick={clearAllFilters}
                    className={`ml-2 px-3 py-1 rounded-full text-sm border transition-colors ${
                      isDark
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            <BlogsListCard
              articles={articles}
              loading={loading}
              error={error}
              onCategorySelect={setSelectedCategory}
              onTagSelect={handleTagSelect}
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
              <TagsCard
                tags={tags}
                onTagSelect={handleTagSelect}
                selectedTags={selectedTags}
              />
              <LatestUpdatesCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
