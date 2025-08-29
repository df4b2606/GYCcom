"use client";

export interface TagItem {
  name: string;
  count: number;
}

export interface TagsCardProps {
  className?: string;
  tags?: TagItem[];
  onTagSelect?: (tagName: string) => void;
  selectedTags?: string[]; // 选中的标签列表
}

const TagsCard = ({
  className = "",
  tags = [],
  onTagSelect,
  selectedTags = [],
}: TagsCardProps) => {
  // Fallback to example tags if no real tags provided
  const displayTags =
    tags.length > 0
      ? tags
      : [
          { name: "React", count: 12 },
          { name: "TypeScript", count: 8 },
          { name: "Next.js", count: 6 },
          { name: "Node.js", count: 5 },
          { name: "Python", count: 4 },
          { name: "Docker", count: 3 },
          { name: "AWS", count: 3 },
          { name: "MongoDB", count: 2 },
        ];

  return (
    <div className={`rounded-xl p-0 shadow-lg ${className}`}>
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-96 flex flex-col">
        <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          All Tags
        </h3>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-1.5">
            {displayTags.map((tag, index) => {
              const isSelected = selectedTags.includes(tag.name);
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-full border transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-500 border-blue-500 hover:bg-blue-600"
                      : "bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20"
                  }`}
                  onClick={() => onTagSelect?.(tag.name)}
                >
                  <span
                    className={`text-xs font-medium ${
                      isSelected
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {tag.name}
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "text-blue-100 bg-blue-400"
                        : "text-gray-500 dark:text-gray-400 bg-white dark:bg-black/20"
                    }`}
                  >
                    {tag.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsCard;
