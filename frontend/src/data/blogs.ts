// 文章数据接口
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

// 博客文章数据
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Next.js 15 和 React 19 的新特性探索",
    excerpt:
      "深入了解 Next.js 15 和 React 19 带来的革命性改变，包括新的编译器、服务器组件优化和性能提升。",
    content: `
# Next.js 15 和 React 19 的新特性探索

随着技术的不断发展，Next.js 15 和 React 19 为我们带来了许多令人兴奋的新特性。本文将深入探讨这些改变如何影响我们的开发工作流程。

## React 19 的重大更新

### 1. 新的编译器优化
React 19 引入了全新的编译器，它能够：
- 自动优化组件渲染
- 减少不必要的重新渲染
- 提升应用整体性能

### 2. 服务器组件的增强
服务器组件现在支持：
- 更好的数据获取策略
- 改进的缓存机制
- 更高效的内存使用

### 3. 并发特性的完善
React 19 完善了并发特性：
- Suspense 的改进
- 更好的错误边界处理
- 优化的时间分片

## Next.js 15 的新功能

### 1. 增强的路由系统
- 更直观的文件系统路由
- 改进的动态路由处理
- 更好的中间件支持

### 2. 性能优化
- 更快的构建速度
- 优化的包大小
- 改进的热重载

### 3. 开发者体验
- 更好的错误提示
- 改进的调试工具
- 增强的TypeScript支持

## 迁移建议

如果您正在考虑升级到 Next.js 15 和 React 19，建议：

1. 首先在开发环境中测试
2. 逐步迁移关键组件
3. 关注性能指标的变化
4. 充分利用新的特性

## 总结

Next.js 15 和 React 19 的结合为现代Web开发带来了前所未有的体验。通过合理使用这些新特性，我们可以构建更快、更高效的应用程序。
    `,
    date: "2024-12-20",
    readTime: "8 min read",
    category: "技术",
    tags: ["Next.js", "React", "前端开发"],
  },
  {
    id: 2,
    title: "现代 CSS 布局技巧与实践",
    excerpt:
      "探索现代CSS布局的最佳实践，包括Grid、Flexbox、以及新的布局单位，让你的网页设计更加灵活。",
    content: `
# 现代 CSS 布局技巧与实践

CSS 布局一直是前端开发中的重要话题。随着技术的发展，我们有了更多强大的工具来创建灵活、响应式的布局。

## Grid 布局的强大之处

CSS Grid 为我们提供了二维布局的能力：

### 基本网格设置
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### 网格区域命名
\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}
\`\`\`

## Flexbox 的灵活性

Flexbox 在一维布局中表现出色：

### 居中对齐
\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

### 响应式导航
\`\`\`css
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
\`\`\`

## 容器查询的革命

容器查询让我们能够根据容器大小调整样式：

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

## 新的布局单位

### 逻辑属性
- \`block-size\` 和 \`inline-size\`
- \`margin-inline\` 和 \`margin-block\`
- \`padding-inline\` 和 \`padding-block\`

### 视口单位
- \`dvh\` (动态视口高度)
- \`svh\` (小视口高度)
- \`lvh\` (大视口高度)

## 最佳实践

1. **移动优先设计**
2. **使用语义化的HTML结构**
3. **考虑可访问性**
4. **性能优化**

## 总结

现代CSS布局技术为我们提供了前所未有的灵活性。通过合理运用这些工具，我们可以创建出既美观又实用的网页布局。
    `,
    date: "2024-12-18",
    readTime: "6 min read",
    category: "前端",
    tags: ["CSS", "布局", "设计"],
  },
  {
    id: 3,
    title: "TypeScript 5.0 高级特性深度剖析",
    excerpt:
      "TypeScript 5.0 引入了许多强大的新特性，本文将详细解析这些特性如何提升开发效率和代码质量。",
    content: `
# TypeScript 5.0 高级特性深度剖析

TypeScript 5.0 为我们带来了许多令人兴奋的新特性。让我们深入了解这些改进如何提升我们的开发体验。

## 装饰器支持

TypeScript 5.0 正式支持装饰器：

\`\`\`typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`调用 \${key} 方法\`);
    return original.apply(this, args);
  };
}

class UserService {
  @log
  getUserById(id: number) {
    return { id, name: 'John' };
  }
}
\`\`\`

## 改进的类型推断

### 更好的泛型推断
\`\`\`typescript
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

// 现在可以正确推断类型
const numbers = createArray(5, 42); // number[]
const strings = createArray(3, "hello"); // string[]
\`\`\`

### 条件类型的增强
\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null>; // string
\`\`\`

## 新的实用类型

### \`Awaited\` 类型
\`\`\`typescript
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
\`\`\`

### \`ConstructorParameters\` 类型
\`\`\`typescript
class User {
  constructor(public name: string, public age: number) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// [string, number]
\`\`\`

## 性能优化

TypeScript 5.0 在性能方面有显著提升：

1. **更快的编译速度**
2. **减少的内存使用**
3. **优化的类型检查**

## 模块系统改进

### 更好的 ES 模块支持
\`\`\`typescript
// 支持新的导入语法
import type { ComponentType } from 'react';
import { lazy } from 'react';

const LazyComponent = lazy(() => import('./Component'));
\`\`\`

### 条件导入
\`\`\`typescript
const isDev = process.env.NODE_ENV === 'development';
const logger = isDev ? await import('./dev-logger') : await import('./prod-logger');
\`\`\`

## 最佳实践

1. **使用严格模式**
2. **充分利用类型推断**
3. **避免过度复杂的类型定义**
4. **定期更新TypeScript版本**

## 总结

TypeScript 5.0 为我们带来了更强大的类型系统和更好的开发体验。通过掌握这些新特性，我们可以编写更安全、更可维护的代码。
    `,
    date: "2024-12-15",
    readTime: "10 min read",
    category: "技术",
    tags: ["TypeScript", "JavaScript", "开发工具"],
  },
  {
    id: 4,
    title: "摄影中的光影艺术",
    excerpt:
      "探讨摄影中光影的运用技巧，如何通过光线和阴影创造令人印象深刻的视觉效果。",
    content: `
# 摄影中的光影艺术

光影是摄影的灵魂。掌握光影的运用技巧，可以让你的作品更加生动有趣，传达更深层的情感。

## 光线的基本类型

### 自然光
- **黄金时间**：日出后和日落前的柔和光线
- **蓝调时间**：暮色时分的深蓝色调
- **正午光**：强烈的直射光，适合创造戏剧效果

### 人造光源
- **连续光**：LED灯、白炽灯等
- **闪光灯**：频闪灯、热靴闪光灯
- **混合光源**：自然光与人造光的结合

## 光影的创作技巧

### 1. 侧光的运用
侧光可以创造立体感和质感：
- 突出物体的轮廓
- 增强质感表现
- 创造戏剧性效果

### 2. 逆光的魅力
逆光拍摄可以创造：
- 剪影效果
- 光晕和星芒
- 温暖的氛围

### 3. 柔光的处理
柔光适合：
- 人像拍摄
- 静物摄影
- 创造梦幻效果

## 阴影的艺术价值

### 硬阴影
- 清晰的边界
- 强烈的对比
- 戏剧性表现

### 软阴影
- 渐变过渡
- 柔和的感觉
- 自然的表现

## 实践建议

### 观察光线
1. **方向**：正面光、侧光、逆光
2. **质量**：硬光、软光
3. **颜色**：暖光、冷光、中性光

### 控制阴影
1. **使用反光板**：填充阴影
2. **调整角度**：改变阴影形状
3. **多重光源**：创造复杂效果

## 后期处理技巧

### 基础调整
- 高光/阴影平衡
- 对比度调整
- 色彩分级

### 高级技巧
- 局部光影调整
- 氛围增强
- 细节优化

## 经典案例分析

### 人像摄影
- 伦勃朗光：经典的人像用光
- 蝴蝶光：适合女性人像
- 分割光：创造戏剧效果

### 风景摄影
- 晨昏光线的运用
- 云层的自然遮光
- 地形对光影的影响

## 总结

光影是摄影创作中不可或缺的元素。通过不断的观察、实践和思考，我们可以更好地运用光影来表达我们的创意和情感。记住，好的光影不仅能让照片更美，更能传达摄影师的内心世界。
    `,
    date: "2024-12-12",
    readTime: "5 min read",
    category: "摄影",
    tags: ["摄影", "光影", "艺术"],
  },
  {
    id: 5,
    title: "Web 性能优化实战指南",
    excerpt:
      "从加载速度到用户体验，全面解析Web性能优化的策略和技巧，让你的网站飞起来。",
    content: `
# Web 性能优化实战指南

性能优化是现代Web开发中的重要课题。本文将从多个角度为你介绍如何系统性地优化网站性能。

## 性能指标解读

### 核心Web指标
- **LCP (Largest Contentful Paint)**：最大内容绘制
- **FID (First Input Delay)**：首次输入延迟
- **CLS (Cumulative Layout Shift)**：累积布局偏移

### 其他重要指标
- **TTFB (Time to First Byte)**：首字节时间
- **FCP (First Contentful Paint)**：首次内容绘制
- **TTI (Time to Interactive)**：可交互时间

## 前端优化策略

### 1. 资源优化
#### 图片优化
\`\`\`javascript
// 使用 WebP 格式
const img = new Image();
img.src = 'image.webp';
img.onerror = () => {
  img.src = 'image.jpg'; // 降级处理
};
\`\`\`

#### 代码分割
\`\`\`javascript
// 动态导入
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 路由级别的代码分割
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
\`\`\`

### 2. 加载策略
#### 预加载关键资源
\`\`\`html
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-image.jpg" as="image">
\`\`\`

#### 懒加载实现
\`\`\`javascript
// Intersection Observer API
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
\`\`\`

### 3. 缓存策略
#### Service Worker
\`\`\`javascript
// 缓存策略
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
\`\`\`

#### HTTP缓存
\`\`\`
Cache-Control: max-age=31536000, immutable
ETag: "33a64df551"
\`\`\`

## 后端优化技巧

### 1. 数据库优化
- 索引优化
- 查询优化
- 连接池管理

### 2. 服务器配置
- 启用压缩
- 配置缓存头
- 使用CDN

### 3. API优化
\`\`\`javascript
// GraphQL 减少过度获取
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    avatar
  }
}
\`\`\`

## 构建优化

### Webpack优化
\`\`\`javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
\`\`\`

### 压缩优化
\`\`\`javascript
// Gzip 压缩
const compression = require('compression');
app.use(compression());
\`\`\`

## 监控与测试

### 性能监控工具
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### 实时监控
\`\`\`javascript
// Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});
observer.observe({ entryTypes: ['measure'] });
\`\`\`

## 最佳实践清单

### 开发阶段
- [ ] 启用代码分割
- [ ] 优化图片格式
- [ ] 使用现代JavaScript
- [ ] 实现懒加载

### 部署阶段
- [ ] 启用压缩
- [ ] 配置缓存
- [ ] 使用CDN
- [ ] 监控性能指标

### 维护阶段
- [ ] 定期性能审计
- [ ] 更新依赖包
- [ ] 优化关键路径
- [ ] 用户体验监控

## 总结

Web性能优化是一个持续的过程，需要从多个维度综合考虑。通过系统性的优化策略，我们可以显著提升用户体验，让网站真正"飞起来"。记住，性能优化不是一次性的工作，而是需要持续关注和改进的过程。
    `,
    date: "2024-12-10",
    readTime: "12 min read",
    category: "技术",
    tags: ["性能优化", "Web开发", "用户体验"],
  },
  {
    id: 6,
    title: "街头摄影的艺术与技巧",
    excerpt:
      "街头摄影是一种独特的艺术形式，本文分享如何捕捉城市生活的精彩瞬间。",
    content: `
# 街头摄影的艺术与技巧

街头摄影是一种记录城市生活、展现人文情怀的艺术形式。它要求摄影师具备敏锐的观察力和快速的反应能力。

## 街头摄影的核心要素

### 1. 瞬间捕捉
街头摄影的魅力在于捕捉稍纵即逝的瞬间：
- 人物的表情变化
- 有趣的肢体动作
- 意外的场景组合

### 2. 光影运用
城市中的光影变化多样：
- 建筑物的阴影
- 窗户透出的光线
- 街灯的夜间照明

### 3. 构图技巧
- **三分法则**：将画面分割成九宫格
- **引导线**：利用街道、建筑线条
- **框架构图**：使用门窗、拱门等

## 技术准备

### 设备选择
#### 相机推荐
- **全画幅单反**：画质优秀，控制灵活
- **微单相机**：轻便隐蔽，适合街拍
- **胶片相机**：独特的质感和色彩

#### 镜头选择
- **35mm**：经典街拍焦距
- **50mm**：接近人眼视角
- **85mm**：适合人像特写

### 参数设置
#### 基本设置
\`\`\`
光圈：f/2.8 - f/5.6
快门：1/125s 以上
ISO：根据光线条件调整
\`\`\`

#### 不同场景的设置
- **白天**：ISO 100-400
- **黄昏**：ISO 400-1600
- **夜晚**：ISO 1600-6400

## 拍摄技巧

### 1. 预判与等待
- 观察人流动向
- 预测可能发生的瞬间
- 耐心等待最佳时机

### 2. 快速反应
- 熟练掌握相机操作
- 训练肌肉记忆
- 提高构图速度

### 3. 融入环境
- 选择合适的拍摄位置
- 避免过于显眼
- 尊重被摄者隐私

## 创作主题

### 人文关怀
- 展现城市生活的真实面貌
- 关注社会边缘群体
- 记录文化传承

### 城市变迁
- 新旧建筑的对比
- 传统与现代的碰撞
- 城市发展的印记

### 情感表达
- 孤独与陪伴
- 希望与失望
- 繁华与宁静

## 后期处理

### 基础调整
- 曝光和对比度
- 色彩平衡
- 锐化和降噪

### 风格化处理
- 黑白转换
- 胶片色调
- 怀旧滤镜

### 后期软件推荐
- **Lightroom**：批量处理，色彩管理
- **Photoshop**：精细调整
- **VSCO**：胶片风格预设

## 法律和道德考量

### 拍摄权利
- 了解当地法律法规
- 尊重肖像权
- 避免侵犯隐私

### 拍摄礼仪
- 征得同意后拍摄
- 适当的拍摄距离
- 尊重文化差异

## 著名街头摄影师

### 经典作品赏析
- **Henri Cartier-Bresson**：决定性瞬间
- **Vivian Maier**：神秘的街头记录者
- **Bruce Gilden**：近距离街头肖像

### 学习方法
- 分析构图技巧
- 理解拍摄理念
- 模仿经典作品

## 实践建议

### 每日练习
1. 设定拍摄目标
2. 选择固定路线
3. 记录拍摄心得
4. 定期回顾作品

### 参与社区
- 加入摄影论坛
- 参加街拍活动
- 分享交流经验

## 总结

街头摄影是一种既需要技术功底又需要人文素养的艺术形式。通过不断的观察、实践和思考，我们可以用镜头记录城市的脉搏，展现人性的光辉。记住，最好的街头摄影作品不仅仅是技术上的完美，更是情感上的共鸣和思想上的深度。
    `,
    date: "2024-12-08",
    readTime: "7 min read",
    category: "摄影",
    tags: ["街头摄影", "艺术", "技巧"],
  },
];

// 根据ID获取文章
export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

// 获取所有文章
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

// 按分类获取文章
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
