# 文章生成脚本使用说明

## 概述

这些脚本用于自动生成测试文章数据，包含真实的技术标签和分类信息。

## 文件说明

- `generate_articles.py` - 完整版生成脚本（20 篇文章 + 25 个标签 + 7 个分类）
- `simple_generate.py` - 简化版生成脚本（5 篇测试文章）
- `requirements.txt` - Python 依赖包

## 使用步骤

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 确保后端服务运行

确保你的后端服务在 `http://localhost:8080` 运行

### 3. 运行脚本

#### 方式一：完整版（推荐）

```bash
python generate_articles.py
```

生成内容：

- 25 个技术标签（React、Vue、Spring Boot、Docker 等）
- 7 个分类（前端开发、后端开发、数据库等）
- 20 篇技术文章（包含真实的代码示例和内容）

#### 方式二：简化版（测试用）

```bash
python simple_generate.py
```

生成内容：

- 5 篇简单的测试文章

## 生成的标签列表

完整版脚本会创建以下标签：

**前端相关：**

- React (#61DAFB)
- Vue (#4FC08D)
- Angular (#DD0031)
- JavaScript (#F7DF1E)
- TypeScript (#3178C6)

**后端相关：**

- Node.js (#339933)
- Python (#3776AB)
- Java (#ED8B00)
- Spring Boot (#6DB33F)

**数据库：**

- MongoDB (#47A248)
- PostgreSQL (#336791)
- Redis (#DC382D)

**DevOps：**

- Docker (#2496ED)
- Kubernetes (#326CE5)
- AWS (#FF9900)
- CI/CD (#FF9500)

**其他：**

- GraphQL (#E10098)
- REST API (#25D366)
- 微服务 (#FF6B6B)
- 性能优化 (#96CEB4)
- 安全 (#FFEAA7)

## 生成的分类列表

- 前端开发 (#FF6B6B)
- 后端开发 (#4ECDC4)
- 数据库 (#45B7D1)
- DevOps (#96CEB4)
- 架构设计 (#FFEAA7)
- 性能优化 (#DDA0DD)
- 安全 (#98D8C8)

## 文章内容特点

- 真实的技术内容和代码示例
- 合理的标签分配（每篇文章 2-5 个标签）
- 详细的文章摘要
- 随机的作者分配
- 自动生成的短链接
- 随机的背景图片

## 故障排除

### API 连接失败

- 确保后端服务正在运行
- 检查端口是否为 8080
- 确认 CORS 配置正确

### 标签/分类创建失败

- 检查后端数据库连接
- 确认相关表已创建
- 查看后端日志错误信息

### 文章创建失败

- 检查 ArticleController 的 POST 接口
- 确认请求格式正确
- 查看后端验证规则

## 清理数据

如果需要清理生成的测试数据，可以：

1. 直接删除数据库中的相关记录
2. 或者通过后端管理接口删除

## 自定义修改

你可以修改脚本中的数据：

- `TECH_TAGS` - 修改标签列表
- `CATEGORIES` - 修改分类列表
- `ARTICLES_DATA` - 修改文章内容
- `BASE_URL` - 修改后端地址

## 注意事项

- 脚本会自动处理重复数据（标签名唯一）
- 建议在开发环境使用，避免污染生产数据
- 生成的文章内容为示例，可根据需要修改
