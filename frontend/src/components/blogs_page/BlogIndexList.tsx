"use client";

import { BlogPost, getAllBlogPosts } from "@/data/blogs";
import BlogIndexCard from "./BlogIndexCard";

export interface BlogIndexListProps {
  className?: string;
  blogs?: BlogPost[];
}

const BlogIndexList = ({ className = "", blogs }: BlogIndexListProps) => {
  // 如果没有传入blogs，则使用本地数据
  const blogPosts = blogs || getAllBlogPosts();

  // 按年份分组文章
  const groupBlogsByYear = (blogs: BlogPost[]) => {
    const grouped: { [key: string]: BlogPost[] } = {};
    blogs.forEach((blog) => {
      const year = new Date(blog.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
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

export default BlogIndexList;
