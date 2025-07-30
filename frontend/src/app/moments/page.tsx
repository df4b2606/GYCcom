"use client";

import { useState } from "react";
import Image from "next/image";
import { getAllMoments, formatTimestamp, Moment } from "../../data/moments";

const MomentCard = ({
  moment,
  onLike,
  onComment,
}: {
  moment: Moment;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
}) => {
  return (
    <article className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] group">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">GYC</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">GYC</h3>
            <p className="text-gray-400 text-xs">
              {formatTimestamp(moment.timestamp)}
            </p>
          </div>
        </div>

        {moment.location && (
          <div className="flex items-center space-x-1 text-gray-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">{moment.location}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-gray-200 leading-relaxed mb-3 text-sm">
          {moment.content}
        </p>

        {/* Image */}
        {moment.image && (
          <div className="rounded-lg overflow-hidden mb-3">
            <Image
              src={moment.image}
              alt="Moment image"
              width={400}
              height={240}
              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Tags */}
        {moment.tags && moment.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {moment.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium hover:bg-blue-500/30 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLike(moment.id)}
            className={`flex items-center space-x-1 transition-colors ${
              moment.isLiked
                ? "text-red-500 hover:text-red-400"
                : "text-gray-400 hover:text-red-500"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={moment.isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-xs">{moment.likes}</span>
          </button>

          <button
            onClick={() => onComment(moment.id)}
            className="flex items-center space-x-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs">{moment.comments}</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-400 hover:text-green-500 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>
        </div>

        <button className="text-gray-400 hover:text-white transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

const NewMomentForm = ({
  onSubmit,
}: {
  onSubmit: (content: string) => void;
}) => {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 mb-6"
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">GYC</span>
        </div>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="有什么新想法？"
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none text-sm"
            rows={isExpanded ? 3 : 1}
          />

          {isExpanded && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs">图片</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-xs">位置</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs ${
                    content.length > 200 ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {content.length}/280
                </span>

                <button
                  type="submit"
                  disabled={!content.trim() || content.length > 280}
                  className="px-4 py-1 bg-blue-500 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm"
                >
                  发布
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default function MomentsPage() {
  const [moments, setMoments] = useState(getAllMoments());
  const [filter, setFilter] = useState("全部");

  const filters = ["全部", "生活", "工作", "思考", "摄影"];

  const handleLike = (id: number) => {
    setMoments((prev) =>
      prev.map((moment) =>
        moment.id === id
          ? {
              ...moment,
              isLiked: !moment.isLiked,
              likes: moment.isLiked ? moment.likes - 1 : moment.likes + 1,
            }
          : moment
      )
    );
  };

  const handleComment = (id: number) => {
    // 这里可以实现评论功能
    console.log(`评论动态 ${id}`);
  };

  const handleNewMoment = (content: string) => {
    const newMoment: Moment = {
      id: Math.max(...moments.map((m) => m.id)) + 1,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
      tags: [],
    };

    setMoments((prev) => [newMoment, ...prev]);
  };

  const filteredMoments =
    filter === "全部"
      ? moments
      : moments.filter((moment) => moment.tags?.includes(filter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* New Moment Form */}
        <div className="mb-6 max-w-2xl mx-auto">
          <NewMomentForm onSubmit={handleNewMoment} />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filter === filterOption
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-sm"
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Moments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredMoments.map((moment) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>

        {/* Load More */}
        {filteredMoments.length > 0 && (
          <div className="text-center">
            <button className="px-6 py-2 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
              <span className="group-hover:translate-x-1 transition-transform inline-block text-sm">
                加载更多
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
