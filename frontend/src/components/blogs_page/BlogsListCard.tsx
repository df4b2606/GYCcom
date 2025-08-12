"use client";

import { Article } from "@/api/article";
import Link from "next/link";

export interface BlogsListCardProps {
  className?: string;
  articles: Article[];
  loading: boolean;
  error: string | null;
}

// 名称到颜色的映射（与CategoryCard保持一致）
const CATEGORY_COLOR_MAP: Record<string, string> = {
  travel: "#ec4899", // pink-500
  programming: "#2563eb", // blue-600
  reading: "#10b981", // emerald-500
  摄影: "#a855f7", // purple-500
  技术: "#0ea5e9", // sky-500
  前端: "#f97316", // orange-500
};

const getCategoryColor = (name?: string, provided?: string) => {
  if (provided && typeof provided === "string" && provided.trim().length > 0) {
    return provided;
  }
  if (!name) return "#6b7280"; // gray-500
  const key = name.toLowerCase();
  return CATEGORY_COLOR_MAP[key] || CATEGORY_COLOR_MAP[name] || "#6b7280";
};

const BlogsListCard = ({
  className = "",
  articles,
  loading,
  error,
}: BlogsListCardProps) => {
  // Group articles by year
  const groupArticlesByYear = (articles: Article[]) => {
    // Safety check: ensure articles is a valid array
    if (!articles || !Array.isArray(articles)) {
      console.warn("Articles is not a valid array:", articles);
      return {};
    }

    const grouped: { [key: string]: Article[] } = {};
    articles.forEach((article) => {
      const year = new Date(article.createdAt).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(article);
    });
    return grouped;
  };

  // Generate article thumbnail colors
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

  // Generate article icons or text
  const getArticleIcon = (title: string, index: number) => {
    const icons = ["📱", "💻", "🔧", "🚀", "📚", "🎨", "📷", "🌐"];
    return icons[index % icons.length];
  };

  const groupedArticles = groupArticlesByYear(articles);
  const years = Object.keys(groupedArticles).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // Safety check: ensure articles is a valid array
  if (!articles || !Array.isArray(articles)) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 text-lg">Invalid articles data</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {loading ? (
        <div className="text-center py-12">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      ) : (
        <div>
          {years.map((year) => (
            <div key={year} className="space-y-5">
              <h2 className="text-4xl font-bold text-white mb-7">{year}</h2>
              <div className="space-y-5">
                {groupedArticles[year].map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/blogs/${article.shortUrl}`}
                    className="block group"
                  >
                    <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-[1.02] group">
                      <div className="flex items-start gap-8">
                        {/* Thumbnail - Larger rectangle with better proportions */}
                        <div
                          className={`w-40 h-24 rounded-xl bg-gradient-to-r ${getThumbnailColor(
                            index
                          )} flex items-center justify-center text-white text-3xl font-bold flex-shrink-0`}
                        >
                          {getArticleIcon(article.title, index)}
                        </div>

                        {/* Content - Wider area for better distribution */}
                        <div className="flex-1 min-w-0 max-w-2xl">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                            {article.title}
                          </h3>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-3 mb-3">
                            {/* Category - Display first with its color */}
                            {(() => {
                              let categoryName: string | undefined;
                              let categoryColor: string | undefined;

                              if (article.category) {
                                if (typeof article.category === "string") {
                                  categoryName = article.category;
                                } else if (article.category.name) {
                                  categoryName = article.category.name;
                                  categoryColor = article.category.color;
                                }
                              }

                              if (categoryName) {
                                const resolvedColor = getCategoryColor(
                                  categoryName,
                                  categoryColor
                                );
                                return (
                                  <span
                                    className={`inline-block px-3 py-1 text-sm rounded-full text-white bg-gradient-to-r ${resolvedColor}`}
                                  >
                                    {categoryName}
                                  </span>
                                );
                              }
                              return null;
                            })()}

                            {/* Generate tags based on article title or use default */}
                            {(() => {
                              const defaultTags = [
                                "Tech",
                                "Development",
                                "Learning",
                              ];
                              const randomTags = defaultTags.slice(0, 2);
                              return randomTags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="inline-block px-4 py-1 bg-white/15 text-gray-300 text-sm rounded-full hover:bg-blue-500/30 hover:text-blue-300 transition-colors"
                                >
                                  #{tag}
                                </span>
                              ));
                            })()}
                          </div>

                          {/* Date */}
                          <div className="text-sm text-gray-400">
                            Published:{" "}
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No articles yet</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsListCard;
