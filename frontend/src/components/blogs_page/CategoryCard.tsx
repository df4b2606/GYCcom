"use client";

// import Link from "next/link";

export interface CategoryItem {
  id?: number;
  name: string;
  count?: number;
  color?: string; // color provided by backend (hex recommended)
}

export interface CategoryCardProps {
  className?: string;
  categories: CategoryItem[];
  onSelect?: (id: number | null) => void;
  selected?: number | null;
}

// Resolve final color: prefer backend-provided color; fall back to a neutral tone
const resolveColor = (provided?: string) => {
  if (provided && typeof provided === "string" && provided.trim().length > 0) {
    return provided;
  }
  return "#64748b"; // slate-500 as fallback
};

const CategoryBadge = ({
  id,
  name,
  color,
  selected,
  onSelect,
}: {
  id?: number;
  name: string;
  color?: string;
  selected?: number | null;
  onSelect?: (id: number | null) => void;
}) => {
  const bg = resolveColor(color);
  const active = selected != null && id != null && selected === id;
  return (
    <button
      className="inline-flex items-center px-3 py-1 rounded-full text-sm text-white"
      style={{ backgroundColor: bg }}
      onClick={() => onSelect?.(active ? null : id ?? null)}
    >
      {name}
    </button>
  );
};

const CategoryCard = ({
  className = "",
  categories,
  onSelect,
  selected,
}: CategoryCardProps) => {
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
      {/* Fixed height to show ~7 items; overflow scrollable */}
      <div className="space-y-3 h-72 overflow-y-auto pr-1">
        {categories.map((c) => {
          const isActive =
            selected != null && c.id != null && selected === c.id;
          return (
            <div key={c.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CategoryBadge
                  id={c.id}
                  name={c.name}
                  color={c.color}
                  selected={selected}
                  onSelect={onSelect}
                />
              </div>
              {typeof c.count === "number" && (
                <span
                  className={
                    isActive
                      ? "text-white text-xs bg-red-500 px-2 py-1 rounded-full"
                      : "text-gray-300 text-xs bg-white/5 px-2 py-1 rounded-full"
                  }
                >
                  {c.count}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* Footer removed per request */}
    </div>
  );
};

export default CategoryCard;
