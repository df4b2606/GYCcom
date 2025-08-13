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
import { BlogCatalogCard } from "@/components/blogs_page";
import { GuessYouLike } from "@/components/blogs_page";
import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";
import Image from "next/image";
import EnjoyActionsCard from "@/components/article/EnjoyActionsCard";

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

  // Extract category display info from article data
  const getCategoryMeta = (
    category: NonNullable<Article["category"]> | undefined
  ): { name: string; color: string } => {
    const fallback = { name: "Category", color: "#60a5fa" };
    if (!category) return fallback;
    if (typeof category === "string")
      return { name: category, color: fallback.color };
    return {
      name: category.name || fallback.name,
      color: category.color || fallback.color,
    };
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const normalized = hex.replace("#", "");
    const parsed =
      normalized.length === 3
        ? normalized
            .split("")
            .map((c) => c + c)
            .join("")
        : normalized;
    const r = parseInt(parsed.substring(0, 2), 16);
    const g = parseInt(parsed.substring(2, 4), 16);
    const b = parseInt(parsed.substring(4, 6), 16);
    const a = Math.min(Math.max(alpha, 0), 1);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  // 预览功能已移除

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
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  // If no background image is provided by the article, fall back to the global default background image used on home/blog list pages.
  const bgImage =
    article.backgroundImageUrl && article.backgroundImageUrl.trim().length > 0
      ? article.backgroundImageUrl
      : "/DSC07098.jpg"; // Using default background image

  return (
    <div className="min-h-screen relative">
      {/* Background image with same blur/overlay style as list/home */}
      <div className="fixed inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      {/* Main content grid: catalog sidebar + content */}
      <div className="pt-24 pb-20 px-6 relative z-10">
        <div className="max-w-8xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-6">
          {/* Content column */}
          <div>
            <div className="bg-[#242526] rounded-2xl border border-white/5 p-8 md:p-12">
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
                Back to All Blogs
              </Link>

              {/* Article Header */}
              <header className="mb-8">
                {/* Title first */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight text-center font-serif italic tracking-wide drop-shadow-md">
                  {article.title}
                </h1>
                {/* Meta info centered with dynamic category */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-400">
                  {(() => {
                    const { name, color } = getCategoryMeta(article.category);
                    return (
                      <span
                        className="px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: hexToRgba(color, 0.15),
                          color: color,
                          borderColor: hexToRgba(color, 0.35),
                        }}
                      >
                        {name}
                      </span>
                    );
                  })()}
                  {article.author && <span>Author: {article.author}</span>}
                  <span>Published: {formatDate(article.createdAt)}</span>
                  <span>
                    Views:{" "}
                    {typeof article.views === "number" ? article.views : 0}
                  </span>
                  {/* Could be computed on backend later */}
                  <span>
                    Reading time: ~
                    {Math.max(
                      1,
                      Math.round((article.content?.length || 0) / 800)
                    ).toString()}{" "}
                    min
                  </span>
                </div>
              </header>

              {/* Article Content */}
              <div className="mt-6">
                <ReactMarkdown
                  rehypePlugins={[rehypeSanitize]}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code: ({ inline, className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || "");
                      if (!match) {
                        return (
                          <InlineCodeBlock {...props}>
                            {children}
                          </InlineCodeBlock>
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
                      <p className="text-[#d7d7d7] leading-relaxed mb-4">
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
                      <ul className="list-disc list-inside text-[#d7d7d7] mb-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ol: ({ children }: any) => (
                      <ol className="list-decimal list-inside text-[#d7d7d7] mb-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    li: ({ children }: any) => (
                      <li className="text-[#d7d7d7]">{children}</li>
                    ),
                    // 强调样式
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    strong: ({ children }: any) => (
                      <strong className="font-bold text-[#f3f4f6]">
                        {children}
                      </strong>
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    em: ({ children }: any) => (
                      <em className="italic text-gray-200">{children}</em>
                    ),
                    // 删除线样式
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    del: ({ children }: any) => (
                      <del className="line-through text-gray-500">
                        {children}
                      </del>
                    ),
                    // 分割线样式
                    hr: () => <hr className="border-gray-700 my-8" />,
                    // 表格样式
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    table: ({ children }: any) => (
                      <TableView>{children}</TableView>
                    ),
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
              </div>
            </div>
            {/* Actions card */}
            <div className="mt-8">
              <EnjoyActionsCard articleTitle={article.title} />
            </div>

            {/* Guess you like module below the actions card (outside the article card) */}
            <div className="mt-8">
              <GuessYouLike excludeShortUrl={article.shortUrl} />
            </div>
          </div>
          {/* Sidebar column: fixed position while scrolling */}
          <div className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <PersonalInfoCard />
              <BlogCatalogCard article={article} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer section removed as requested */}
    </div>
  );
}
