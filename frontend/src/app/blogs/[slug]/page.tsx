"use client";

import { useEffect, useState, use } from "react";
import { getArticleByShortUrl, getArticleById, Article } from "@/api/article";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import InlineCodeBlock from "@/components/article/InlineCodeBlock";
import CodeBlock from "@/components/article/CodeBlock";
import ImageView from "@/components/article/ImageView";
import TableView from "@/components/article/TableView";
import ArticleInlineLink from "@/components/article/ArticleInlineLink";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
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
          response = await getArticleByShortUrl(slug);
        } catch (shortUrlError) {
          // 如果 shortUrl 不存在，尝试通过 ID 获取
          const id = parseInt(slug);
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
  }, [slug]);

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
            <ReactMarkdown
              rehypePlugins={[rehypeSanitize]}
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: ({ inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  if (!match) {
                    return (
                      <InlineCodeBlock {...props}>{children}</InlineCodeBlock>
                    );
                  }
                  return inline ? (
                    <InlineCodeBlock {...props}>{children}</InlineCodeBlock>
                  ) : (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, "")}
                    />
                  );
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                img: ({ ...props }: any) => {
                  // 直接返回 ImageView，不包装在 p 标签内
                  return <ImageView {...props} />;
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                a: ({ ...props }: any) => (
                  <ArticleInlineLink
                    {...props}
                    linkTitle={props.children}
                    linkUrl={props.href}
                  />
                ),
                // 标题样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                h1: ({ children }: any) => (
                  <h1 className="text-3xl font-bold text-white mb-6 mt-8 border-b border-gray-700 pb-2">
                    {children}
                  </h1>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                h2: ({ children }: any) => (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-6">
                    {children}
                  </h2>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                h3: ({ children }: any) => (
                  <h3 className="text-xl font-bold text-white mb-3 mt-5">
                    {children}
                  </h3>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                h4: ({ children }: any) => (
                  <h4 className="text-lg font-bold text-white mb-2 mt-4">
                    {children}
                  </h4>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                h5: ({ children }: any) => (
                  <h5 className="text-base font-bold text-white mb-2 mt-3">
                    {children}
                  </h5>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                h6: ({ children }: any) => (
                  <h6 className="text-sm font-bold text-white mb-1 mt-2">
                    {children}
                  </h6>
                ),
                // 段落样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                p: ({ children }: any) => (
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                // 引用样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                blockquote: ({ children }: any) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-500/10 rounded-r-lg">
                    <div className="text-gray-300 italic">{children}</div>
                  </blockquote>
                ),
                // 列表样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ul: ({ children }: any) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                    {children}
                  </ul>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ol: ({ children }: any) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1">
                    {children}
                  </ol>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                li: ({ children }: any) => (
                  <li className="text-gray-300">{children}</li>
                ),
                // 强调样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                strong: ({ children }: any) => (
                  <strong className="font-bold text-white">{children}</strong>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                em: ({ children }: any) => (
                  <em className="italic text-gray-200">{children}</em>
                ),
                // 删除线样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                del: ({ children }: any) => (
                  <del className="line-through text-gray-500">{children}</del>
                ),
                // 分割线样式
                hr: () => <hr className="border-gray-700 my-8" />,
                // 表格样式
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                table: ({ children }: any) => <TableView>{children}</TableView>,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                thead: ({ children }: any) => (
                  <thead className="bg-gray-800">{children}</thead>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tbody: ({ children }: any) => (
                  <tbody className="bg-gray-900">{children}</tbody>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tr: ({ children }: any) => (
                  <tr className="border-b border-gray-700">{children}</tr>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                th: ({ children }: any) => (
                  <th className="px-4 py-2 text-left text-white font-semibold">
                    {children}
                  </th>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                td: ({ children }: any) => (
                  <td className="px-4 py-2 text-gray-300">{children}</td>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
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
