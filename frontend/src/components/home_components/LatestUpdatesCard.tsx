"use client";

export interface LatestUpdatesCardProps {
  className?: string;
}

const LatestUpdatesCard = ({ className = "" }: LatestUpdatesCardProps) => {
  const updates = [
    {
      time: "2h ago",
      content: "Published new blog post about React development",
    },
    { time: "1d ago", content: "Updated portfolio with latest projects" },
    { time: "3d ago", content: "Shared moments from recent photography trip" },
  ];

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        Latest Updates
      </h3>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
            <p className="text-gray-300 text-sm">{update.content}</p>
            <p className="text-gray-400 text-xs mt-1">{update.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUpdatesCard;
