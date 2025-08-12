"use client";

import { Article } from "@/api/article";
import { BlogPost } from "@/data/blogs";
import BlogIndexCard from "./BlogIndexCard";

export interface ArticleIndexListProps {
  className?: string;
  articles: Article[];
}

function estimateReadTimeMinutes(content: string): number {
  if (!content) return 1;
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const charCount = plain.length;
  const charsPerMinute = 500; // 粗略估算（中文）
  return Math.max(1, Math.ceil(charCount / charsPerMinute));
}

function toExcerpt(content: string, maxLen = 120): string {
  if (!content) return "";
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > maxLen ? plain.slice(0, maxLen) + "..." : plain;
}

function extractTagsFromArticle(article: Article): string[] {
  const anyArticle = article as unknown as { tags?: unknown };
  const rawTags = anyArticle?.tags as unknown[] | undefined;
  if (!Array.isArray(rawTags)) return [];

  const tagNames: string[] = rawTags
    .map((t) => {
      if (t && typeof t === "object") {
        const obj = t as Record<string, unknown>;
        const nameLike = (obj["name"] || obj["title"] || obj["label"]) as
          | string
          | undefined;
        if (typeof nameLike === "string") return nameLike;
      }
      if (typeof t === "string") return t;
      return undefined;
    })
    .filter((v): v is string => typeof v === "string" && v.length > 0);

  return tagNames;
}

function extractCategoryName(article: Article): string | undefined {
  const c = (article as unknown as { category?: unknown }).category;
  if (!c) return undefined;
  if (typeof c === "string") return c;
  if (typeof c === "object") {
    const name = (c as Record<string, unknown>)["name"];
    if (typeof name === "string") return name;
  }
  return undefined;
}

function mapArticleToBlogPost(article: Article): BlogPost {
  const readMinutes = estimateReadTimeMinutes(article.content);
  const tags = extractTagsFromArticle(article);
  const category = extractCategoryName(article) || tags[0] || "技术";
  return {
    id: article.id,
    title: article.title,
    // 优先使用后端提供的 excerpt，没有则回退到本地生成
    excerpt:
      article.excerpt && article.excerpt.length > 0
        ? article.excerpt
        : toExcerpt(article.content),
    content: article.content,
    date: article.createdAt,
    readTime: `${readMinutes} min read`,
    category,
    tags,
  };
}

const ArticleIndexList = ({
  className = "",
  articles,
}: ArticleIndexListProps) => {
  const blogPosts: BlogPost[] = (articles || []).map(mapArticleToBlogPost);

  const groupBlogsByYear = (blogs: BlogPost[]) => {
    const grouped: { [key: string]: BlogPost[] } = {};
    blogs.forEach((blog) => {
      const year = new Date(blog.date).getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(blog);
    });
    return grouped;
  };

  const groupedBlogs = groupBlogsByYear(blogPosts);
  const years = Object.keys(groupedBlogs).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {years.map((year) => (
        <div key={year} className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">{year}</h2>
          <div className="space-y-6">
            {groupedBlogs[year].map((blog) => (
              <BlogIndexCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      ))}

      {blogPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">暂无文章</div>
        </div>
      )}
    </div>
  );
};

export default ArticleIndexList;
