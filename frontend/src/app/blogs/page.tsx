"use client";

import { useEffect, useState } from "react";
import { Article, getArticleList } from "@/api/article";
import Link from "next/link";

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticleList();
        console.log("🔍 完整响应:", response); // 只加这一行
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("获取文章列表失败:", error);
        setError("获取文章列表失败，请稍后重试");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 获取内容预览（前200个字符）
  const getContentPreview = (content: string) => {
    return content.length > 200 ? content.substring(0, 200) + "..." : content;
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            我的博客
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            分享技术见解、创意灵感和生活感悟。在这里记录我的思考与发现，希望能与您产生共鸣。
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">
                    发布于: {formatDate(article.createdAt)}
                  </span>
                </div>

                <Link href={`/blogs/${article.shortUrl}`}>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors cursor-pointer">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {getContentPreview(article.content)}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/blogs/${article.shortUrl}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    阅读全文 →
                  </Link>
                </div>
              </article>
            ))}

            {articles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">暂无文章</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-white/10 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-2">
                {articles.length}
              </div>
              <div className="text-gray-400 text-sm">文章总数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">2024</div>
              <div className="text-gray-400 text-sm">开始年份</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-400 text-sm">创作热情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
