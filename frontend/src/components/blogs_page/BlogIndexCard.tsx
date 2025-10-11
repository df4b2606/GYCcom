"use client";

import { BlogPost } from "@/data/blogs";
import Link from "next/link";

export interface BlogIndexCardProps {
  blog: BlogPost;
  className?: string;
}

const BlogIndexCard = ({ blog, className = "" }: BlogIndexCardProps) => {
  // 生成文章缩略图颜色
  const getThumbnailColor = (id: number) => {
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
    return colors[(id - 1) % colors.length];
  };

  // 生成文章图标
  const getArticleIcon = (title: string, id: number) => {
    const icons = ["📱", "💻", "🔧", "🚀", "📚", "🎨", "📷", "🌐"];
    return icons[(id - 1) % icons.length];
  };

  // 根据分类获取图标
  const getCategoryIcon = (category: string) => {
    const categoryIcons: { [key: string]: string } = {
      技术: "💻",
      前端: "🎨",
      摄影: "📷",
      生活: "🌟",
      学习: "📚",
      开发: "🔧",
      Travel: "🧭",
      Programming: "💻",
      Reading: "📚",
    };
    return categoryIcons[category] || "📝";
  };

  // Category 颜色映射（用于放在标签前作为第一个徽章）
  const getCategoryColor = (name?: string, color?: string) => {
    if (color && typeof color === "string" && color.trim().length > 0) {
      return color; // 优先使用后端返回的颜色
    }
    // 如果没有后端颜色，使用默认的柔和灰色
    return "from-gray-500 to-gray-600";
  };

  return (
    <Link href={`/blogs/${blog.id}`} className="block group">
      <article
        className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] group ${className}`}
      >
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 大图片区域 */}
            <div className="lg:w-1/3 flex-shrink-0">
              <div
                className={`w-full aspect-16-9 lg:aspect-21-9 rounded-lg bg-gradient-to-br ${getThumbnailColor(
                  blog.id
                )} flex items-center justify-center text-white text-4xl font-bold relative overflow-hidden group-hover:shadow-lg transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="text-6xl mb-2">
                    {getArticleIcon(blog.title, blog.id)}
                  </span>
                  <span className="text-sm opacity-80">
                    {getCategoryIcon(blog.category)}
                  </span>
                </div>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="lg:w-2/3 flex-1 min-w-0">
              {/* 标题 */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                {blog.title}
              </h3>

              {/* 简介 */}
              <p className="text-gray-300 text-base mb-4 line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>

              {/* 分类徽章放在标签最前面，样式与标签一致但使用彩色背景 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.category && (
                  <span
                    className={`inline-block px-3 py-1 text-white text-sm rounded-full border border-white/10 bg-gradient-to-r ${getCategoryColor(
                      blog.category,
                      blog.categoryColor
                    )}`}
                  >
                    {blog.category}
                  </span>
                )}
                {/* 显示标签，统一使用简洁样式 */}
                {blog.tagsWithColor && blog.tagsWithColor.length > 0
                  ? blog.tagsWithColor.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-colors border border-white/5 hover:scale-105"
                      >
                        {tag.name}
                      </span>
                    ))
                  : blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-colors border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
              </div>

              {/* 底部信息：仅显示阅读时长与日期，分类已在标签前展示 */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    ⏱️ {blog.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  📅{" "}
                  {new Date(blog.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogIndexCard;
