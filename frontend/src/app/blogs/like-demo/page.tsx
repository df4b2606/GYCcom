"use client";

import {
  BlogIndexCard,
  BlogsListCard,
  LikeButton,
} from "@/components/blogs_page";
import { getAllBlogPosts } from "@/data/blogs";
import { Article } from "@/api/article";
type ArticleWithLike = Article & { likeCount: number; isLiked: boolean };
import { useState } from "react";

// Mock API articles with like data
const mockArticles: ArticleWithLike[] = [
  {
    id: 1,
    title: "React 使用教程",
    content: "React是一个用于构建用户界面的JavaScript库...",
    excerpt:
      "React是一个用于构建用户界面的JavaScript库，由Facebook开发，特别适合构建单页应用。",
    createdAt: "2024-12-20",
    category: { id: 1, name: "前端开发", color: "#f97316" },
    tags: [
      { id: 1, name: "Programming", color: "#3b82f6" },
      { id: 2, name: "React", color: "#06b6d4" },
      { id: 3, name: "JavaScript", color: "#f59e0b" },
      { id: 4, name: "前端", color: "#10b981" },
    ],
    likeCount: 42,
    isLiked: false,
  },
  {
    id: 2,
    title: "滤镜在黑白摄影中的应用技巧",
    content: "黑白摄影中的滤镜技术...",
    excerpt:
      "探讨反光板技术在黑白摄影中的应用，包括技巧、最佳实践和实际案例研究。",
    createdAt: "2024-12-18",
    category: { id: 2, name: "黑白摄影", color: "#6b7280" },
    tags: [
      { id: 5, name: "黑白摄影", color: "#6b7280" },
      { id: 6, name: "Pentax", color: "#dc2626" },
      { id: 7, name: "三脚架", color: "#7c3aed" },
      { id: 8, name: "滤镜", color: "#059669" },
      { id: 9, name: "反光板", color: "#ea580c" },
      { id: 10, name: "柔光箱", color: "#be185d" },
    ],
    likeCount: 38,
    isLiked: true,
  },
  {
    id: 3,
    title: "概念摄影 在产品摄影中的应用技巧",
    content: "概念摄影在产品摄影中的应用...",
    excerpt:
      "探索复古风格技巧在产品摄影中的应用，涵盖核心技能、最佳实践和实际示例。",
    createdAt: "2024-12-15",
    category: { id: 3, name: "产品摄影", color: "#a855f7" },
    tags: [
      { id: 11, name: "产品摄影", color: "#a855f7" },
      { id: 12, name: "复古风格", color: "#b45309" },
      { id: 13, name: "概念摄影", color: "#dc2626" },
      { id: 14, name: "实验摄影", color: "#059669" },
      { id: 15, name: "反光板", color: "#ea580c" },
    ],
    likeCount: 56,
    isLiked: false,
  },
];

export default function LikeDemoPage() {
  const [articles, setArticles] = useState<ArticleWithLike[]>(mockArticles);
  const blogPosts = getAllBlogPosts();

  const handleLikeChange = (
    articleId: number,
    newCount: number,
    newIsLiked: boolean
  ) => {
    console.log(
      `Article ${articleId} like status changed: count=${newCount}, isLiked=${newIsLiked}`
    );

    // Update the article in the local state
    setArticles((prev) =>
      prev.map((article) =>
        article.id === articleId
          ? { ...article, likeCount: newCount, isLiked: newIsLiked }
          : article
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          点赞功能演示 - 右上角定位 + 紧凑高度
        </h1>

        <div className="space-y-16">
          {/* BlogIndexCard 演示 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">
              BlogIndexCard 组件 - 紧凑高度 + 点赞按钮右上角
            </h2>
            <p className="text-gray-300 mb-4">
              高度从 320px 减少到 256px，一页可以显示更多文章卡片
            </p>
            <div className="space-y-6">
              {blogPosts.slice(0, 2).map((blog) => (
                <BlogIndexCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>

          {/* BlogsListCard 演示 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-green-300">
              BlogsListCard 组件 - 紧凑高度 + 点赞按钮右上角
            </h2>
            <p className="text-gray-300 mb-4">
              高度从 256px 减少到 192px，一页可以显示更多文章卡片
            </p>
            <BlogsListCard
              articles={articles}
              loading={false}
              error={null}
              onCategorySelect={() => {}}
              onTagSelect={() => {}}
            />
          </section>

          {/* 独立点赞按钮演示 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">
              独立点赞按钮组件 - 不同尺寸展示
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-medium mb-4">小尺寸</h3>
                <LikeButton
                  articleId={1}
                  initialLikeCount={15}
                  initialIsLiked={false}
                  onLikeChange={handleLikeChange}
                  size="sm"
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-medium mb-4">中尺寸</h3>
                <LikeButton
                  articleId={2}
                  initialLikeCount={28}
                  initialIsLiked={true}
                  onLikeChange={handleLikeChange}
                  size="md"
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-medium mb-4">大尺寸</h3>
                <LikeButton
                  articleId={3}
                  initialLikeCount={67}
                  initialIsLiked={false}
                  onLikeChange={handleLikeChange}
                  size="lg"
                />
              </div>
            </div>
          </section>

          {/* 功能说明 */}
          <section className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-300">
              功能特性
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-blue-300">
                  点赞功能
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 点击爱心图标进行点赞/取消点赞</li>
                  <li>• 点赞后爱心变为红色，取消点赞后恢复灰色</li>
                  <li>• 点赞数量实时更新</li>
                  <li>• 支持三种尺寸：小、中、大</li>
                  <li>
                    • <strong>新特性：点赞按钮位于文章卡片右上角</strong>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-green-300">
                  布局特性
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 可复用的LikeButton组件</li>
                  <li>• 支持自定义回调函数</li>
                  <li>• 响应式设计和悬停效果</li>
                  <li>• 无障碍访问支持</li>
                  <li>
                    • <strong>新特性：绝对定位，不占用内容空间</strong>
                  </li>
                  <li>
                    • <strong>新特性：紧凑高度设计，一页显示更多内容</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>注意：</strong>
                当前演示使用的是前端状态管理，实际应用中需要连接后端API来持久化点赞数据。
              </p>
            </div>

            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-300 text-sm">
                <strong>新功能：</strong>
                点赞按钮现在位于每个文章卡片的右上角，使用绝对定位，不会影响文章内容的布局。
              </p>
            </div>

            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-purple-300 text-sm">
                <strong>紧凑设计：</strong>
                文章卡片高度已优化，BlogIndexCard从320px减少到256px，BlogsListCard从256px减少到192px，一页可以显示更多内容。
              </p>
            </div>

            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-300 text-sm">
                <strong>布局优化：</strong>
                点赞按钮现在使用垂直布局，数字显示在心形图标正下方，使用灰色字体，整体设计更加紧凑美观。
              </p>
            </div>

            <div className="mt-4 p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
              <p className="text-pink-300 text-sm">
                <strong>动画效果：</strong>
                点赞后心形图标会放大并产生一次性扩散波纹效果，数字也会变为红色，提供丰富的视觉反馈。
              </p>
            </div>

            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <p className="text-emerald-300 text-sm">
                <strong>点击区域优化：</strong>
                点赞按钮现在占据更大的右上角区域，整个区域都可以点击，而不仅仅是心形图标和数字部分，大大提升了点击体验。
              </p>
            </div>

            <div className="mt-4 p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
              <p className="text-teal-300 text-sm">
                <strong>平衡设计：</strong>
                心形图标和数字保持适中大小，不会过于突出，但点击区域足够大，既美观又实用，完美平衡了视觉效果和可用性。
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
