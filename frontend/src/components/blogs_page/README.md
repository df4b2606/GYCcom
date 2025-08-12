# 博客页面组件

本目录包含了博客页面相关的组件，包括文章索引卡片和列表组件。

## 组件说明

### BlogIndexCard

文章索引卡片组件，展示单篇文章的预览信息。

**特性：**

- 大尺寸图片展示区域
- 文章标题和简介
- 标签展示
- 分类、阅读时间和发布日期
- 响应式设计
- 悬停效果和动画

**Props：**

```typescript
interface BlogIndexCardProps {
  blog: BlogPost; // 文章数据
  className?: string; // 可选的CSS类名
}
```

**使用示例：**

```tsx
import { BlogIndexCard } from "@/components/blogs_page";
import { BlogPost } from "@/data/blogs";

const blog: BlogPost = {
  id: 1,
  title: "文章标题",
  excerpt: "文章简介...",
  // ... 其他属性
};

<BlogIndexCard blog={blog} />;
```

### BlogIndexList

文章索引列表组件，按年份分组展示所有文章。

**特性：**

- 按年份自动分组
- 使用 BlogIndexCard 展示每篇文章
- 支持传入自定义文章数据或使用本地数据
- 响应式布局

**Props：**

```typescript
interface BlogIndexListProps {
  className?: string; // 可选的CSS类名
  blogs?: BlogPost[]; // 可选的博客文章数组
}
```

**使用示例：**

```tsx
import { BlogIndexList } from "@/components/blogs_page";

// 使用本地数据
<BlogIndexList />

// 使用自定义数据
<BlogIndexList blogs={customBlogs} />
```

## 数据接口

组件使用 `@/data/blogs` 中定义的 `BlogPost` 接口：

```typescript
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}
```

## 样式特性

- 使用 Tailwind CSS 进行样式设计
- 支持暗色主题
- 响应式设计，适配不同屏幕尺寸
- 悬停效果和过渡动画
- 文本截断（line-clamp）支持

## 页面路由

新的博客索引页面位于：`/blogs/index`

该页面展示了使用新组件的完整示例，包括：

- 页面标题和描述
- 文章索引列表
- 右侧边栏组件（个人信息、标签、最新更新）
