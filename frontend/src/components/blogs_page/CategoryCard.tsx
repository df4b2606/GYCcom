"use client";

import Link from "next/link";

export interface CategoryItem {
  name: string;
  count?: number;
  color?: string; // 后端返回的颜色
}

export interface CategoryCardProps {
  className?: string;
  categories: CategoryItem[];
}

const getCategoryColor = (name?: string, provided?: string) => {
  if (provided && typeof provided === "string" && provided.trim().length > 0) {
    return provided; // 优先使用后端返回的颜色
  }
  // 如果没有后端颜色，使用默认的柔和灰色
  return "from-gray-500 to-gray-600";
};

const CategoryBadge = ({ name, color }: { name: string; color?: string }) => {
  const resolved = getCategoryColor(name, color);
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${resolved}`}
    >
      {name}
    </span>
  );
};

const CategoryCard = ({ className = "", categories }: CategoryCardProps) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h3l2 2h7a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        Categories
      </h3>
      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CategoryBadge name={c.name} color={c.color} />
            </div>
            {typeof c.count === "number" && (
              <span className="text-gray-300 text-xs bg-white/5 px-2 py-1 rounded-full">
                {c.count}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/20">
        <Link
          href="/blogs"
          className="w-full block text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          查看全部文章 →
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
