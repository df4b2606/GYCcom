"use client";

import { useEffect, useState } from "react";
import { getArticleByShortUrl, getArticleById, Article } from "@/api/article";
import Link from "next/link";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        let response;

        // 尝试通过 shortUrl 获取文章
        try {
          response = await getArticleByShortUrl(params.slug);
        } catch (shortUrlError) {
          // 如果 shortUrl 不存在，尝试通过 ID 获取
          const id = parseInt(params.slug);
          if (!isNaN(id)) {
            response = await getArticleById(id);
          } else {
            throw shortUrlError;
          }
        }

        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("获取文章详情失败:", error);
        setError("文章不存在或获取失败");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // 获取内容预览（前200个字符）
  const getContentPreview = (content: string) => {
    return content.length > 200 ? content.substring(0, 200) + "..." : content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            {error || "文章不存在"}
          </div>
          <Link
            href="/blogs"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回博客列表
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                博客文章
              </span>
              <span className="text-gray-400">
                {formatDate(article.createdAt)}
              </span>
              {article.author && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">作者: {article.author}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {getContentPreview(article.content)}
            </p>

            {article.shortUrl && (
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">
                  短链接: {article.shortUrl}
                </span>
              </div>
            )}
          </header>
        </div>
      </div>

      {/* Article Content */}
      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <div
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:mb-2 prose-li:leading-relaxed
                prose-code:text-blue-300 prose-code:bg-gray-800/50 
                prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-800/80 prose-pre:border prose-pre:border-white/10
                prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400"
              dangerouslySetInnerHTML={{
                __html: formatContent(article.content),
              }}
            />
          </article>
        </div>
      </div>

      {/* Article Footer */}
      <div className="border-t border-white/10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white font-semibold mb-2">喜欢这篇文章？</h3>
              <p className="text-gray-400">分享给更多人吧！</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>收藏</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 简单的内容格式化函数
function formatContent(content: string): string {
  return content
    .replace(/\n/g, "<br>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/^\- (.*$)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/, "<ul>$1</ul>");
}
