#!/usr/bin/env python3
"""
文章数据生成脚本
生成20篇真实的技术文章，包含标签、分类等信息
"""

import requests
import json
import random
from datetime import datetime, timedelta
import time

# 后端 API 基础URL
BASE_URL = "http://localhost:8080"

# 真实的技术标签数据
TECH_TAGS = [
    {"name": "React", "description": "React.js前端框架", "color": "#61DAFB"},
    {"name": "Vue", "description": "Vue.js前端框架", "color": "#4FC08D"},
    {"name": "Angular", "description": "Angular前端框架", "color": "#DD0031"},
    {"name": "JavaScript", "description": "JavaScript编程语言", "color": "#F7DF1E"},
    {"name": "TypeScript", "description": "TypeScript编程语言", "color": "#3178C6"},
    {"name": "Node.js", "description": "Node.js运行时", "color": "#339933"},
    {"name": "Python", "description": "Python编程语言", "color": "#3776AB"},
    {"name": "Java", "description": "Java编程语言", "color": "#ED8B00"},
    {"name": "Spring Boot", "description": "Spring Boot框架", "color": "#6DB33F"},
    {"name": "Docker", "description": "Docker容器技术", "color": "#2496ED"},
    {"name": "Kubernetes", "description": "Kubernetes容器编排", "color": "#326CE5"},
    {"name": "AWS", "description": "Amazon Web Services", "color": "#FF9900"},
    {"name": "MongoDB", "description": "MongoDB数据库", "color": "#47A248"},
    {"name": "PostgreSQL", "description": "PostgreSQL数据库", "color": "#336791"},
    {"name": "Redis", "description": "Redis缓存数据库", "color": "#DC382D"},
    {"name": "GraphQL", "description": "GraphQL查询语言", "color": "#E10098"},
    {"name": "REST API", "description": "REST API设计", "color": "#25D366"},
    {"name": "微服务", "description": "微服务架构", "color": "#FF6B6B"},
    {"name": "DevOps", "description": "DevOps实践", "color": "#326CE5"},
    {"name": "CI/CD", "description": "持续集成持续部署", "color": "#FF9500"},
    {"name": "前端", "description": "前端开发", "color": "#FF6B6B"},
    {"name": "后端", "description": "后端开发", "color": "#4ECDC4"},
    {"name": "全栈", "description": "全栈开发", "color": "#45B7D1"},
    {"name": "性能优化", "description": "系统性能优化", "color": "#96CEB4"},
    {"name": "安全", "description": "网络安全", "color": "#FFEAA7"}
]

# 分类数据
CATEGORIES = [
    {"name": "前端开发", "color": "#FF6B6B"},
    {"name": "后端开发", "color": "#4ECDC4"},
    {"name": "数据库", "color": "#45B7D1"},
    {"name": "DevOps", "color": "#96CEB4"},
    {"name": "架构设计", "color": "#FFEAA7"},
    {"name": "性能优化", "color": "#DDA0DD"},
    {"name": "安全", "color": "#98D8C8"}
]

# 文章模板数据
ARTICLES_DATA = [
    {
        "title": "React 18 新特性深度解析：并发渲染与自动批处理",
        "content": """# React 18 新特性深度解析

React 18 带来了许多激动人心的新特性，其中最重要的是并发渲染（Concurrent Rendering）和自动批处理（Automatic Batching）。

## 并发渲染

并发渲染是 React 18 的核心特性，它允许 React 在渲染过程中被中断，从而提高应用的响应性。

```javascript
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
```

## 自动批处理

React 18 会自动批处理状态更新，即使它们在异步操作中：

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // React 18 会自动批处理这些更新
    setCount(c => c + 1);
    setFlag(f => !f);
  }
}
```

## Suspense 改进

React 18 对 Suspense 进行了重大改进，现在支持服务端渲染：

```javascript
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## 总结

React 18 的这些新特性为构建更快、更响应的用户界面提供了强大的工具。""",
        "author": "张三",
        "category": "前端开发",
        "tags": ["React", "JavaScript", "前端", "性能优化"],
        "excerpt": "深入探讨 React 18 的并发渲染、自动批处理等核心新特性，以及如何在实际项目中应用这些特性。"
    },
    {
        "title": "Vue 3 Composition API 最佳实践指南",
        "content": """# Vue 3 Composition API 最佳实践

Vue 3 的 Composition API 为我们提供了更灵活的代码组织方式。本文将分享一些最佳实践。

## 基础用法

```javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return { count, doubleCount }
  }
}
```

## 自定义 Composables

创建可复用的逻辑：

```javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return { count, increment, decrement }
}
```

## 与 TypeScript 结合

```typescript
import { ref, Ref } from 'vue'

interface User {
  id: number
  name: string
}

export function useUser(): {
  user: Ref<User | null>
  fetchUser: (id: number) => Promise<void>
} {
  const user = ref<User | null>(null)
  
  const fetchUser = async (id: number) => {
    // 获取用户数据
  }
  
  return { user, fetchUser }
}
```

## 总结

Composition API 提供了更好的代码复用和类型推导能力。""",
        "author": "李四",
        "category": "前端开发",
        "tags": ["Vue", "JavaScript", "TypeScript", "前端"],
        "excerpt": "全面介绍 Vue 3 Composition API 的最佳实践，包括自定义 Composables 和 TypeScript 集成。"
    },
    {
        "title": "Spring Boot 微服务架构设计与实践",
        "content": """# Spring Boot 微服务架构设计与实践

微服务架构已成为现代应用开发的主流模式，Spring Boot 为构建微服务提供了完善的解决方案。

## 服务拆分原则

### 1. 业务边界清晰
每个微服务应该有明确的业务职责：

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}
```

### 2. 数据独立性
每个服务应该有独立的数据存储：

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    // getters and setters
}
```

## 服务间通信

### REST API 通信

```java
@FeignClient(name = "order-service")
public interface OrderClient {
    @GetMapping("/api/orders/{userId}")
    List<Order> getUserOrders(@PathVariable Long userId);
}
```

### 消息队列

```java
@RabbitListener(queues = "user.created")
public void handleUserCreated(UserCreatedEvent event) {
    // 处理用户创建事件
    log.info("User created: {}", event.getUserId());
}
```

## 配置管理

```yaml
spring:
  application:
    name: user-service
  cloud:
    config:
      uri: http://config-server:8888
  datasource:
    url: jdbc:postgresql://localhost:5432/userdb
    username: ${DB_USERNAME:user}
    password: ${DB_PASSWORD:password}
```

## 总结

Spring Boot 微服务架构需要考虑服务拆分、通信方式、配置管理等多个方面。""",
        "author": "王五",
        "category": "后端开发",
        "tags": ["Spring Boot", "Java", "微服务", "后端", "架构设计"],
        "excerpt": "详细介绍 Spring Boot 微服务架构的设计原则和实现方法，包括服务拆分、通信和配置管理。"
    },
    {
        "title": "Docker 容器化部署最佳实践",
        "content": """# Docker 容器化部署最佳实践

Docker 已成为现代应用部署的标准工具，本文分享容器化部署的最佳实践。

## Dockerfile 优化

### 多阶段构建

```dockerfile
# 构建阶段
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 运行阶段
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### 镜像层优化

```dockerfile
FROM openjdk:11-jre-slim

# 先复制依赖文件，利用层缓存
COPY pom.xml ./
RUN mvn dependency:go-offline

# 再复制源码
COPY src ./src
RUN mvn package -DskipTests

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/target/app.jar"]
```

## Docker Compose 配置

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - DB_HOST=postgres
    depends_on:
      - postgres
      - redis
    
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 健康检查

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```

## 安全配置

```dockerfile
# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 切换到非 root 用户
USER nextjs

# 只复制必要文件
COPY --chown=nextjs:nodejs . .
```

## 总结

Docker 容器化部署需要关注镜像优化、安全性和可维护性。""",
        "author": "赵六",
        "category": "DevOps",
        "tags": ["Docker", "DevOps", "容器化", "部署"],
        "excerpt": "全面介绍 Docker 容器化部署的最佳实践，包括 Dockerfile 优化、安全配置和健康检查。"
    },
    {
        "title": "MongoDB 性能优化实战指南",
        "content": """# MongoDB 性能优化实战指南

MongoDB 作为流行的 NoSQL 数据库，性能优化是生产环境中的重要课题。

## 索引优化

### 复合索引

```javascript
// 创建复合索引
db.users.createIndex({ "status": 1, "createdAt": -1 })

// 查询会使用索引
db.users.find({ status: "active" }).sort({ createdAt: -1 })
```

### 部分索引

```javascript
// 只为活跃用户创建索引
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: "active" } }
)
```

## 查询优化

### 使用投影

```javascript
// 只返回需要的字段
db.users.find(
  { status: "active" },
  { name: 1, email: 1, _id: 0 }
)
```

### 聚合管道优化

```javascript
db.orders.aggregate([
  // 先过滤，减少数据量
  { $match: { status: "completed" } },
  
  // 再分组
  { $group: {
    _id: "$userId",
    totalAmount: { $sum: "$amount" },
    orderCount: { $sum: 1 }
  }},
  
  // 最后排序
  { $sort: { totalAmount: -1 } },
  { $limit: 10 }
])
```

## 连接池配置

```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxIdleTimeMS: 30000,
  minPoolSize: 2
});
```

## 分片配置

```javascript
// 启用分片
sh.enableSharding("myapp")

// 设置分片键
sh.shardCollection("myapp.users", { "userId": "hashed" })
```

## 监控和分析

```javascript
// 查看查询计划
db.users.find({ email: "user@example.com" }).explain("executionStats")

// 查看索引使用情况
db.users.getIndexes()

// 分析慢查询
db.setProfilingLevel(2, { slowms: 100 })
db.system.profile.find().sort({ ts: -1 }).limit(5)
```

## 总结

MongoDB 性能优化需要从索引、查询、连接池等多个维度进行。""",
        "author": "孙七",
        "category": "数据库",
        "tags": ["MongoDB", "数据库", "性能优化", "NoSQL"],
        "excerpt": "深入讲解 MongoDB 性能优化的各种技巧，包括索引设计、查询优化和分片配置。"
    }
]

def create_tag(tag_data):
    """创建标签"""
    try:
        response = requests.post(
            f"{BASE_URL}/api/tags",
            json=tag_data,
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 200:
            print(f"✅ 标签创建成功: {tag_data['name']}")
            return response.json()
        else:
            print(f"❌ 标签创建失败: {tag_data['name']} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ 标签创建异常: {tag_data['name']} - {str(e)}")
        return None

def create_category(category_data):
    """创建分类"""
    try:
        response = requests.post(
            f"{BASE_URL}/api/category",
            json=category_data,
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 200:
            print(f"✅ 分类创建成功: {category_data['name']}")
            return response.json()
        else:
            print(f"❌ 分类创建失败: {category_data['name']} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ 分类创建异常: {category_data['name']} - {str(e)}")
        return None

def create_article(article_data):
    """创建文章"""
    try:
        response = requests.post(
            f"{BASE_URL}/article",
            json=article_data,
            headers={"Content-Type": "application/json"}
        )
        if response.status_code == 200:
            print(f"✅ 文章创建成功: {article_data['title']}")
            return response.json()
        else:
            print(f"❌ 文章创建失败: {article_data['title']} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ 文章创建异常: {article_data['title']} - {str(e)}")
        return None

def generate_additional_articles():
    """生成额外的15篇文章"""
    additional_titles = [
        ("TypeScript 高级类型系统详解", "前端开发", ["TypeScript", "JavaScript", "前端"]),
        ("Kubernetes 集群管理与监控", "DevOps", ["Kubernetes", "Docker", "DevOps", "监控"]),
        ("PostgreSQL 高可用架构设计", "数据库", ["PostgreSQL", "数据库", "高可用"]),
        ("AWS Lambda 无服务器架构实践", "架构设计", ["AWS", "Lambda", "无服务器", "架构设计"]),
        ("Redis 缓存策略与实现", "数据库", ["Redis", "缓存", "性能优化"]),
        ("GraphQL API 设计最佳实践", "后端开发", ["GraphQL", "API", "后端"]),
        ("前端性能优化完全指南", "前端开发", ["前端", "性能优化", "JavaScript"]),
        ("CI/CD 流水线设计与实现", "DevOps", ["CI/CD", "DevOps", "自动化"]),
        ("Node.js 微服务架构实战", "后端开发", ["Node.js", "微服务", "后端", "JavaScript"]),
        ("Angular 响应式编程指南", "前端开发", ["Angular", "RxJS", "前端", "响应式编程"]),
        ("网络安全防护策略详解", "安全", ["安全", "网络安全", "防护"]),
        ("分布式系统设计原理", "架构设计", ["分布式", "架构设计", "系统设计"]),
        ("Python 数据分析实战教程", "后端开发", ["Python", "数据分析", "机器学习"]),
        ("RESTful API 设计规范", "后端开发", ["REST API", "API设计", "后端"]),
        ("全栈开发技能图谱", "全栈开发", ["全栈", "前端", "后端", "技能图谱"])
    ]
    
    articles = []
    for i, (title, category, tags) in enumerate(additional_titles):
        article = {
            "title": title,
            "content": f"""# {title}

这是一篇关于{title}的详细技术文章。

## 概述

在现代软件开发中，{title}是一个重要的技术领域。本文将深入探讨相关的概念、实践和最佳做法。

## 核心概念

### 基础知识

让我们从基础概念开始：

```javascript
// 示例代码
function example() {{
    console.log('这是一个示例');
}}
```

### 高级特性

深入了解高级特性和用法：

```python
# Python 示例
def advanced_feature():
    return "高级特性实现"
```

## 实际应用

在实际项目中，我们可以这样应用：

1. 分析需求
2. 设计方案
3. 实现功能
4. 测试验证

## 最佳实践

- 遵循行业标准
- 注重代码质量
- 考虑性能优化
- 确保安全性

## 总结

{title}是一个值得深入学习的技术领域，通过本文的介绍，希望能帮助大家更好地理解和应用相关技术。

## 参考资料

- 官方文档
- 技术博客
- 开源项目
""",
            "author": random.choice(["张三", "李四", "王五", "赵六", "孙七", "周八", "吴九"]),
            "category": category,
            "tags": tags,
            "excerpt": f"深入探讨{title}的核心概念、实践方法和最佳实践，适合开发者学习参考。"
        }
        articles.append(article)
    
    return articles

def generate_short_url(title):
    """生成短链接"""
    # 简单的短链接生成逻辑
    import re
    # 移除特殊字符，保留字母数字和中文
    clean_title = re.sub(r'[^\w\u4e00-\u9fa5]+', '-', title)
    # 截取前30个字符
    short_url = clean_title[:30].strip('-').lower()
    # 添加随机数字避免重复
    short_url += f"-{random.randint(1000, 9999)}"
    return short_url

def main():
    """主函数"""
    print("🚀 开始生成文章数据...")
    
    # 1. 创建标签
    print("\n📋 创建标签...")
    created_tags = {}
    for tag_data in TECH_TAGS:
        result = create_tag(tag_data)
        if result:
            created_tags[tag_data['name']] = result
        time.sleep(0.1)  # 避免请求过快
    
    # 2. 创建分类
    print("\n📁 创建分类...")
    created_categories = {}
    for category_data in CATEGORIES:
        result = create_category(category_data)
        if result:
            created_categories[category_data['name']] = result
        time.sleep(0.1)
    
    # 3. 创建文章
    print("\n📝 创建文章...")
    
    # 合并所有文章数据
    all_articles = ARTICLES_DATA + generate_additional_articles()
    
    for i, article_data in enumerate(all_articles):
        # 生成短链接
        article_data['shortUrl'] = generate_short_url(article_data['title'])
        
        # 添加背景图片URL（可选）
        article_data['backgroundImageUrl'] = f"https://picsum.photos/1200/600?random={i+1}"
        
        # 创建文章
        result = create_article(article_data)
        time.sleep(0.2)  # 避免请求过快
    
    print(f"\n🎉 数据生成完成！")
    print(f"📊 统计信息:")
    print(f"   - 标签: {len(created_tags)} 个")
    print(f"   - 分类: {len(created_categories)} 个") 
    print(f"   - 文章: {len(all_articles)} 篇")

if __name__ == "__main__":
    main()
