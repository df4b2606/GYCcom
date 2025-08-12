"use client";

export interface TagsCardProps {
  className?: string;
}

const TagsCard = ({ className = "" }: TagsCardProps) => {
  const tags = [
    { name: "React", count: 12, color: "from-blue-500 to-blue-600" },
    { name: "TypeScript", count: 8, color: "from-blue-600 to-blue-700" },
    { name: "Next.js", count: 6, color: "from-gray-600 to-gray-700" },
    { name: "Node.js", count: 5, color: "from-green-500 to-green-600" },
    { name: "Python", count: 4, color: "from-yellow-500 to-yellow-600" },
    { name: "Docker", count: 3, color: "from-blue-400 to-blue-500" },
    { name: "AWS", count: 3, color: "from-orange-500 to-orange-600" },
    { name: "MongoDB", count: 2, color: "from-green-600 to-green-700" },
  ];

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        Popular Tags
      </h3>
      <div className="space-y-3">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${tag.color}`}
              ></div>
              <span className="text-gray-300 text-sm font-medium">
                #{tag.name}
              </span>
            </div>
            <span className="text-gray-400 text-xs bg-white/5 px-2 py-1 rounded-full">
              {tag.count}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/20">
        <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
          View All Tags →
        </button>
      </div>
    </div>
  );
};

export default TagsCard;
