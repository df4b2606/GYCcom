"use client";

import { Article } from "@/api/article";
import PersonalInfoCard from "@/components/home_components/PersonalInfoCard";

export interface BlogCatalogCardProps {
  article: Article;
}

// 将原来的TOCCard内容移到这里，改名为TocCard
const TocCard: React.FC<{
  headings: { id: string; title: string; level: 1 | 2 | 3 }[];
  className?: string;
}> = ({ headings, className = "" }) => {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 ${className}`}
    >
      <h3 className="text-white font-semibold text-lg mb-3">Contents</h3>
      {headings.length === 0 ? (
        <div className="text-gray-400 text-sm">No headings</div>
      ) : (
        <nav className="space-y-1">
          {headings.map((h) => (
            <button
              key={h.id}
              onClick={() => handleClick(h.id)}
              className={
                `block w-full text-left text-sm text-gray-300 hover:text-blue-300 transition-colors rounded-md px-2 py-1 ` +
                (h.level === 1 ? "pl-1" : h.level === 2 ? "pl-4" : "pl-7")
              }
            >
              {h.title}
            </button>
          ))}
        </nav>
      )}
    </aside>
  );
};

const BlogCatalogCard = ({ article }: BlogCatalogCardProps) => {
  // Extract H1/H2/H3 headings with ids from markdown
  const extractHeadings = (markdown: string) => {
    const lines = markdown.split(/\n+/);
    const headings: { id: string; title: string; level: 1 | 2 | 3 }[] = [];
    for (const line of lines) {
      const match = /^(#{1,3})\s+(.*)$/.exec(line.trim());
      if (!match) continue;
      const level = match[1].length as 1 | 2 | 3;
      const raw = match[2].trim();
      // Only show "heading-like" content: filter out tutorial/example subsections (lists, tables, code blocks, links and images, etc.)
      // Also remove emojis, symbols and colons from prefixes
      const cleaned = raw.replace(/[：:]/g, "").trim();
      const normalized = cleaned.replace(/^[^A-Za-z0-9\u4e00-\u9fa5]+/g, "");
      const blacklist: string[] = []; // Empty array, no filtering applied
      if (blacklist.some((b) => normalized.startsWith(b))) continue;
      const id = raw
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, title: raw, level });
    }
    return headings;
  };

  return (
    <>
      <PersonalInfoCard className="absolute top-24 right-6 w-72 hidden lg:block z-10" />
      <TocCard
        className="absolute right-6 top-[12rem] w-72 hidden lg:block z-10"
        headings={extractHeadings(article.content)}
      />
    </>
  );
};

export default BlogCatalogCard;
