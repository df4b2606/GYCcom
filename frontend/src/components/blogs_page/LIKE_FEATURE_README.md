# 点赞功能使用说明

本文档介绍了为前端文章卡片添加的点赞功能，包括组件使用方法、API 接口设计和实现细节。

## 功能概述

点赞功能为每个文章卡片添加了一个可交互的爱心按钮，用户可以：

- 点击爱心进行点赞/取消点赞
- 查看当前文章的点赞数量
- 看到点赞状态的视觉反馈（红色爱心表示已点赞）
- **新特性：点赞按钮位于文章卡片右上角，不占用内容空间**
- **新特性：紧凑高度设计，一页可以显示更多文章卡片**
- **新特性：心形扩散动画效果，点赞后产生波纹扩散**
- **新特性：无边框设计，更加简洁美观**
- **新特性：右上角大区域点击，整个区域都可点击**
- **新特性：平衡设计，图标适中大小，点击区域足够大**

## 组件结构

### 1. LikeButton 组件

可复用的点赞按钮组件，支持多种尺寸和自定义回调。

**位置**: `frontend/src/components/blogs_page/LikeButton.tsx`

**Props**:

```typescript
interface LikeButtonProps {
  articleId: number; // 文章ID
  initialLikeCount: number; // 初始点赞数量
  initialIsLiked: boolean; // 初始点赞状态
  className?: string; // 自定义CSS类名
  size?: "sm" | "md" | "lg"; // 按钮尺寸
  onLikeChange?: (
    articleId: number,
    newCount: number,
    newIsLiked: boolean
  ) => void; // 点赞状态变化回调
}
```

**使用示例**:

```tsx
import { LikeButton } from "@/components/blogs_page";

<LikeButton
  articleId={1}
  initialLikeCount={42}
  initialIsLiked={false}
  onLikeChange={(id, count, isLiked) => {
    console.log(`Article ${id}: ${count} likes, isLiked: ${isLiked}`);
  }}
  size="md"
/>;
```

### 2. BlogIndexCard 组件

文章索引卡片组件，已集成点赞功能。

**位置**: `frontend/src/components/blogs_page/BlogIndexCard.tsx`

**特性**:

- 使用 LikeButton 组件显示点赞状态
- 支持点赞数量显示
- 响应式设计
- **点赞按钮位于右上角，使用绝对定位**
- **紧凑高度：h-64 (256px)，一页可以显示更多内容**

### 3. BlogsListCard 组件

文章列表卡片组件，已集成点赞功能。

**位置**: `frontend/src/components/blogs_page/BlogsListCard.tsx`

**特性**:

- 使用 LikeButton 组件显示点赞状态
- 支持批量文章点赞管理
- 与现有筛选功能兼容
- **点赞按钮位于右上角，使用绝对定位**
- **固定高度：h-64 (256px)，确保所有卡片高度一致**

## 布局特性

### 右上角定位

点赞按钮现在使用绝对定位位于每个文章卡片的右上角：

```tsx
<article className="relative h-64">
  {/* 点赞按钮 - 右上角 */}
  <div className="absolute top-4 right-4 z-20">
    <LikeButton
      articleId={blog.id}
      initialLikeCount={blog.likeCount}
      initialIsLiked={blog.isLiked}
      onLikeChange={handleLikeChange}
      size="sm"
    />
  </div>

  {/* 文章内容 */}
  <div className="p-6 h-full">{/* ... 其他内容 */}</div>
</article>
```

**优势**:

- 不占用文章内容的布局空间
- 位置固定，用户容易找到
- 不会影响文章标题、标签等内容的排列
- 响应式友好，在不同屏幕尺寸下保持一致的位置

### 紧凑高度设计

所有文章卡片现在都使用紧凑的高度设计，一页可以显示更多内容：

**BlogIndexCard**: `h-64` (256px) - 从原来的 320px 减少
**BlogsListCard**: `h-48` (192px) - 从原来的 256px 减少

**实现方式**:

```tsx
// 紧凑卡片高度
<article className="... h-64"> // BlogIndexCard
<article className="... h-48"> // BlogsListCard

// 内容区域使用flexbox布局
<div className="flex flex-col h-full">
  {/* 标题紧凑高度 */}
  <h3 className="... h-12"> // BlogIndexCard
  <h3 className="... h-10"> // BlogsListCard

  {/* 简介区域自适应，减少行数 */}
  <p className="... line-clamp-2 flex-1 min-h-0">

  {/* 标签和底部信息紧凑间距 */}
  <div className="... mb-3"> // 减少底部间距

  {/* 底部信息固定在底部 */}
  <div className="... mt-auto">
</div>
```

**优势**:

- **更多内容显示**: 一页可以显示更多文章卡片
- **视觉一致性**: 所有卡片高度相同，布局整齐
- **内容对齐**: 标题、标签、日期等元素位置一致
- **响应式友好**: 在不同屏幕尺寸下保持统一效果
- **用户体验**: 浏览文章列表时更加高效，减少滚动

**高度对比**:

- **之前**: BlogIndexCard 320px, BlogsListCard 256px
- **现在**: BlogIndexCard 256px, BlogsListCard 192px
- **节省空间**: 分别节省 20% 和 25% 的垂直空间

### 垂直布局设计

点赞按钮现在使用垂直布局，数字显示在心形图标正下方：

```tsx
<button className="flex flex-col items-center justify-center">
  {/* 心形图标 */}
  <svg className="...">{/* 心形路径 */}</svg>

  {/* 点赞数量 - 显示在图标下方 */}
  <span className="text-gray-400 font-medium text-xs">{likeCount}</span>
</button>
```

**设计特点**:

- **垂直排列**: 心形图标在上，数字在下
- **居中对齐**: 图标和数字都居中对齐
- **灰色主题**: 未点赞时心形和数字都使用灰色
- **紧凑布局**: 减少水平空间占用
- **视觉层次**: 图标和数字形成清晰的视觉层次

### 心形扩散动画效果

点赞后心形图标会产生一次性的扩散动画效果：

```tsx
{
  /* Expansion rings effect when liked - only once */
}
{
  isLiked && (
    <>
      <div
        className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse scale-150 opacity-0"
        style={{ animationDuration: "0.6s", animationIterationCount: "1" }}
      ></div>
      <div
        className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse scale-200 opacity-0"
        style={{
          animationDuration: "0.6s",
          animationIterationCount: "1",
          animationDelay: "0.1s",
        }}
      ></div>
      <div
        className="absolute inset-0 rounded-full bg-red-500/5 animate-pulse scale-250 opacity-0"
        style={{
          animationDuration: "0.6s",
          animationIterationCount: "1",
          animationDelay: "0.2s",
        }}
      ></div>
    </>
  );
}
```

**动画特性**:

- **心形放大**: 点赞后心形图标会放大到 `scale-110`
- **一次性扩散**: 产生三层扩散波纹，每层只执行一次动画
- **延迟效果**: 波纹按顺序出现，创造层次感
- **颜色渐变**: 从深到浅的红色渐变，增强视觉效果
- **无边框设计**: 去掉所有边框，保持简洁美观
- **动画控制**: 使用 `animationIterationCount: '1'` 确保只执行一次

### 紧凑高度设计

## 数据接口

### BlogPost 接口更新

在 `frontend/src/data/blogs.ts` 中添加了点赞相关字段：

```typescript
export interface BlogPost {
  // ... 现有字段
  likeCount: number; // 点赞数量
  isLiked: boolean; // 是否已点赞
}
```

### Article 接口更新

在 `frontend/src/api/article.ts` 中添加了点赞相关字段：

```typescript
export interface Article {
  // ... 现有字段
  likeCount?: number; // 点赞数量（可选）
  isLiked?: boolean; // 是否已点赞（可选）
}
```

## 使用方法

### 1. 基本使用

```tsx
import { LikeButton } from "@/components/blogs_page";

function MyComponent() {
  const handleLikeChange = (
    articleId: number,
    newCount: number,
    newIsLiked: boolean
  ) => {
    // 处理点赞状态变化
    console.log(
      `Article ${articleId} like status changed: count=${newCount}, isLiked=${newIsLiked}`
    );
  };

  return (
    <LikeButton
      articleId={1}
      initialLikeCount={15}
      initialIsLiked={false}
      onLikeChange={handleLikeChange}
      size="md"
    />
  );
}
```

### 2. 尺寸规格

**三种尺寸支持**:

```tsx
const sizeClasses = {
  sm: {
    icon: "w-4 h-4", // 小图标 (16px)
    text: "text-xs", // 小字体
    button: "p-3", // 小内边距 (12px)
  },
  md: {
    icon: "w-5 h-5", // 中图标 (20px)
    text: "text-sm", // 中字体
    button: "p-4", // 中内边距 (16px)
  },
  lg: {
    icon: "w-6 h-6", // 大图标 (24px)
    text: "text-base", // 大字体
    button: "p-5", // 大内边距 (20px)
  },
};
```

**尺寸优化说明**:

- **小尺寸 (sm)**: 图标 16px，内边距 12px，总点击区域约 40px × 40px
- **中尺寸 (md)**: 图标 20px，内边距 16px，总点击区域约 52px × 52px
- **大尺寸 (lg)**: 图标 24px，内边距 20px，总点击区域约 64px × 64px
- **触摸友好**: 所有尺寸都符合移动端触摸友好的最小尺寸要求
- **平衡设计**: 图标和文字保持适中大小，但点击区域足够大

### 3. 点击区域优化

**右上角大区域点击**:

```tsx
{
  /* 点赞按钮 - 右上角大区域 */
}
<div className="absolute top-2 right-2 z-20">
  <LikeButton
    articleId={blog.id}
    initialLikeCount={blog.likeCount}
    initialIsLiked={blog.isLiked}
    onLikeChange={handleLikeChange}
    size="md"
    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
  />
</div>;
```

**优化特性**:

- **更大点击区域**: 整个右上角区域都可以点击，不仅仅是心形图标
- **视觉反馈**: 添加了半透明背景和边框，让用户知道这是可点击区域
- **悬停效果**: 悬停时背景会变亮，提供更好的交互反馈
- **位置优化**: 从 `top-4 right-4` 调整到 `top-2 right-2`，占据更大空间
- **平衡设计**: 图标和文字保持适中大小，但点击区域足够大

### 4. 在现有组件中使用

```tsx
import { BlogIndexCard } from "@/components/blogs_page";
import { BlogPost } from "@/data/blogs";

function MyBlogList() {
  const blog: BlogPost = {
    id: 1,
    title: "文章标题",
    excerpt: "文章简介...",
    content: "文章内容...",
    date: "2024-12-20",
    readTime: "5 min read",
    category: "技术",
    tags: ["React", "JavaScript"],
    likeCount: 42, // 新增：点赞数量
    isLiked: false, // 新增：是否已点赞
  };

  return <BlogIndexCard blog={blog} />;
}
```

### 5. 自定义样式

LikeButton 组件使用 Tailwind CSS，支持通过 className 属性自定义样式：

```tsx
<LikeButton
  articleId={1}
  initialLikeCount={15}
  initialIsLiked={false}
  className="bg-blue-500/10 border-blue-500/20"
  size="lg"
/>
```

## 状态管理

### 前端状态

当前实现使用 React 的 useState 进行本地状态管理：

```typescript
const [isLiked, setIsLiked] = useState(initialIsLiked);
const [likeCount, setLikeCount] = useState(initialLikeCount);
```

### 状态同步

通过 onLikeChange 回调函数实现状态同步：

```typescript
const handleLikeChange = (
  articleId: number,
  newCount: number,
  newIsLiked: boolean
) => {
  // 更新本地状态
  setArticles((prev) =>
    prev.map((article) =>
      article.id === articleId
        ? { ...article, likeCount: newCount, isLiked: newIsLiked }
        : article
    )
  );

  // 调用后端API
  // TODO: 实现API调用
};
```

## 样式特性

### 视觉反馈

- **未点赞状态**: 灰色爱心图标，半透明白色背景
- **已点赞状态**: 红色爱心图标，红色半透明背景
- **悬停效果**: 轻微缩放和颜色变化
- **过渡动画**: 平滑的状态切换动画

### 响应式设计

- 支持三种尺寸：sm、md、lg
- 适配不同屏幕尺寸
- 触摸友好的交互设计
- **右上角固定定位，响应式友好**
- **统一高度设计，响应式友好**

### 无障碍访问

- 提供 aria-label 属性
- 支持键盘导航
- 语义化的 HTML 结构

## 后端集成准备

### 需要的 API 接口

1. **获取文章点赞状态**

   ```
   GET /api/articles/{id}/like-status
   ```

2. **点赞文章**

   ```
   POST /api/articles/{id}/like
   ```

3. **取消点赞**

   ```
   DELETE /api/articles/{id}/like
   ```

### 数据模型

```sql
-- 点赞记录表
CREATE TABLE article_likes (
  id SERIAL PRIMARY KEY,
  article_id INTEGER NOT NULL REFERENCES articles(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(article_id, user_id)
);

-- 文章表添加点赞计数字段
ALTER TABLE articles ADD COLUMN like_count INTEGER DEFAULT 0;
```

## 演示页面

访问 `/blogs/like-demo` 页面可以查看完整的点赞功能演示，包括：

- BlogIndexCard 组件的点赞功能（右上角定位 + 统一高度）
- BlogsListCard 组件的点赞功能（右上角定位 + 统一高度）
- 独立 LikeButton 组件的不同尺寸展示
- 功能特性说明

## 注意事项

1. **当前状态**: 点赞功能目前使用前端状态管理，数据不会持久化
2. **后端集成**: 需要实现相应的 API 接口来支持数据持久化
3. **用户认证**: 实际应用中需要用户登录才能进行点赞操作
4. **性能考虑**: 大量文章时可以考虑使用虚拟滚动优化性能
5. **定位考虑**: 点赞按钮使用绝对定位，确保父容器设置了 `position: relative`
6. **高度考虑**: 卡片使用固定高度，确保内容不会溢出或产生空白

## 未来改进

1. **实时更新**: 集成 WebSocket 实现实时点赞状态同步
2. **批量操作**: 支持批量点赞/取消点赞
3. **点赞历史**: 显示用户的点赞历史记录
4. **统计分析**: 添加点赞数据统计和分析功能
5. **防刷机制**: 实现点赞频率限制和防刷机制
6. **动画优化**: 添加更丰富的点赞动画效果
7. **高度自适应**: 支持动态高度调整，适应不同内容长度

## 技术支持

如有问题或建议，请参考：

- 组件源码: `frontend/src/components/blogs_page/`
- 类型定义: `frontend/src/api/article.ts`
- 演示页面: `frontend/src/app/blogs/like-demo/page.tsx`
