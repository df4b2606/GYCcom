#!/usr/bin/env python3
"""
生成50篇技术文章的脚本
包含现实的技术标签和分类，随机分配
"""

import requests
import json
import random
from datetime import datetime, timedelta
import time

# 后端 API 基础URL
BASE_URL = "http://localhost:8080"

# 现实的技术分类
CATEGORIES = [
    {"name": "前端开发", "color": "#FF6B6B"},
    {"name": "后端开发", "color": "#4ECDC4"},
    {"name": "移动开发", "color": "#45B7D1"},
    {"name": "数据库", "color": "#96CEB4"},
    {"name": "DevOps", "color": "#FFEAA7"},
    {"name": "人工智能", "color": "#DDA0DD"},
    {"name": "云计算", "color": "#98D8C8"},
    {"name": "网络安全", "color": "#F7DC6F"},
    {"name": "区块链", "color": "#BB8FCE"},
    {"name": "物联网", "color": "#85C1E9"}
]

# 现实的技术标签
TECH_TAGS = [
    # 前端技术
    {"name": "React", "description": "React.js前端框架", "color": "#61DAFB"},
    {"name": "Vue", "description": "Vue.js前端框架", "color": "#4FC08D"},
    {"name": "Angular", "description": "Angular前端框架", "color": "#DD0031"},
    {"name": "JavaScript", "description": "JavaScript编程语言", "color": "#F7DF1E"},
    {"name": "TypeScript", "description": "TypeScript编程语言", "color": "#3178C6"},
    {"name": "HTML5", "description": "HTML5标记语言", "color": "#E34F26"},
    {"name": "CSS3", "description": "CSS3样式语言", "color": "#1572B6"},
    {"name": "Sass", "description": "Sass预处理器", "color": "#CC6699"},
    {"name": "Webpack", "description": "Webpack打包工具", "color": "#8DD6F9"},
    {"name": "Vite", "description": "Vite构建工具", "color": "#646CFF"},
    
    # 后端技术
    {"name": "Node.js", "description": "Node.js运行时", "color": "#339933"},
    {"name": "Python", "description": "Python编程语言", "color": "#3776AB"},
    {"name": "Java", "description": "Java编程语言", "color": "#ED8B00"},
    {"name": "Go", "description": "Go编程语言", "color": "#00ADD8"},
    {"name": "C#", "description": "C#编程语言", "color": "#239120"},
    {"name": "PHP", "description": "PHP编程语言", "color": "#777BB4"},
    {"name": "Ruby", "description": "Ruby编程语言", "color": "#CC342D"},
    {"name": "Spring Boot", "description": "Spring Boot框架", "color": "#6DB33F"},
    {"name": "Django", "description": "Django框架", "color": "#092E20"},
    {"name": "Express", "description": "Express.js框架", "color": "#000000"},
    {"name": "FastAPI", "description": "FastAPI框架", "color": "#009688"},
    
    # 数据库技术
    {"name": "MySQL", "description": "MySQL关系型数据库", "color": "#4479A1"},
    {"name": "PostgreSQL", "description": "PostgreSQL数据库", "color": "#336791"},
    {"name": "MongoDB", "description": "MongoDB NoSQL数据库", "color": "#47A248"},
    {"name": "Redis", "description": "Redis缓存数据库", "color": "#DC382D"},
    {"name": "SQLite", "description": "SQLite轻量数据库", "color": "#003B57"},
    {"name": "Oracle", "description": "Oracle数据库", "color": "#F80000"},
    {"name": "SQL Server", "description": "SQL Server数据库", "color": "#CC2927"},
    
    # DevOps技术
    {"name": "Docker", "description": "Docker容器技术", "color": "#2496ED"},
    {"name": "Kubernetes", "description": "Kubernetes容器编排", "color": "#326CE5"},
    {"name": "Jenkins", "description": "Jenkins CI/CD工具", "color": "#D24939"},
    {"name": "GitLab", "description": "GitLab代码管理", "color": "#FCA326"},
    {"name": "GitHub", "description": "GitHub代码托管", "color": "#181717"},
    {"name": "AWS", "description": "Amazon Web Services", "color": "#FF9900"},
    {"name": "Azure", "description": "Microsoft Azure", "color": "#0089D6"},
    {"name": "GCP", "description": "Google Cloud Platform", "color": "#4285F4"},
    
    # 移动开发
    {"name": "React Native", "description": "React Native跨平台开发", "color": "#61DAFB"},
    {"name": "Flutter", "description": "Flutter跨平台开发", "color": "#02569B"},
    {"name": "iOS", "description": "iOS开发", "color": "#000000"},
    {"name": "Android", "description": "Android开发", "color": "#3DDC84"},
    {"name": "Kotlin", "description": "Kotlin编程语言", "color": "#7F52FF"},
    {"name": "Swift", "description": "Swift编程语言", "color": "#FA7343"},
    
    # 人工智能
    {"name": "Machine Learning", "description": "机器学习", "color": "#FF6B6B"},
    {"name": "Deep Learning", "description": "深度学习", "color": "#4ECDC4"},
    {"name": "TensorFlow", "description": "TensorFlow框架", "color": "#FF6F00"},
    {"name": "PyTorch", "description": "PyTorch框架", "color": "#EE4C2C"},
    {"name": "OpenAI", "description": "OpenAI技术", "color": "#412991"},
    {"name": "NLP", "description": "自然语言处理", "color": "#FF6B9D"},
    
    # 其他技术
    {"name": "GraphQL", "description": "GraphQL查询语言", "color": "#E10098"},
    {"name": "REST API", "description": "REST API设计", "color": "#25D366"},
    {"name": "微服务", "description": "微服务架构", "color": "#FF6B6B"},
    {"name": "Serverless", "description": "无服务器架构", "color": "#FD5750"},
    {"name": "性能优化", "description": "性能优化技术", "color": "#96CEB4"},
    {"name": "安全", "description": "网络安全", "color": "#FFEAA7"},
    {"name": "测试", "description": "软件测试", "color": "#DDA0DD"},
    {"name": "架构设计", "description": "系统架构设计", "color": "#98D8C8"}
]

# 文章模板数据
ARTICLE_TEMPLATES = [
    {
        "title": "React 18 新特性深度解析",
        "content": "# React 18 新特性深度解析\n\nReact 18 带来了许多激动人心的新特性，包括并发渲染、自动批处理等。本文将深入探讨这些新特性的实现原理和最佳实践。\n\n## 并发渲染\n\n并发渲染是 React 18 的核心特性之一...",
        "excerpt": "深入解析React 18的新特性，包括并发渲染、自动批处理等核心功能的实现原理和最佳实践。",
        "category": "前端开发",
        "tagNames": ["React", "JavaScript", "前端"]
    },
    {
        "title": "Spring Boot 3.0 微服务架构实践",
        "content": "# Spring Boot 3.0 微服务架构实践\n\nSpring Boot 3.0 基于 Spring 6 和 Java 17，带来了更好的性能和新的特性。本文将介绍如何构建基于 Spring Boot 3.0 的微服务架构...",
        "excerpt": "基于Spring Boot 3.0构建微服务架构的完整实践指南，包含服务拆分、通信、部署等关键环节。",
        "category": "后端开发",
        "tagNames": ["Spring Boot", "Java", "微服务"]
    },
    {
        "title": "Docker 容器化部署最佳实践",
        "content": "# Docker 容器化部署最佳实践\n\nDocker 已经成为现代应用部署的标准工具。本文将分享在生产环境中使用 Docker 的最佳实践，包括镜像优化、安全配置、监控等...",
        "excerpt": "Docker生产环境部署的完整指南，涵盖镜像优化、安全配置、监控告警等关键实践。",
        "category": "DevOps",
        "tagNames": ["Docker", "DevOps", "部署"]
    },
    {
        "title": "MongoDB 数据库设计模式",
        "content": "# MongoDB 数据库设计模式\n\nMongoDB 作为 NoSQL 数据库，有其独特的设计模式。本文将介绍常用的数据建模模式，包括嵌入式文档、引用关系、分片策略等...",
        "excerpt": "MongoDB数据库设计的核心模式和实践技巧，帮助开发者构建高效的数据模型。",
        "category": "数据库",
        "tagNames": ["MongoDB", "数据库", "NoSQL"]
    },
    {
        "title": "Vue 3 Composition API 实战指南",
        "content": "# Vue 3 Composition API 实战指南\n\nVue 3 的 Composition API 提供了更灵活的逻辑复用方式。本文将通过实际项目案例，展示如何使用 Composition API 构建可维护的 Vue 应用...",
        "excerpt": "Vue 3 Composition API的实战应用指南，通过真实项目案例展示最佳实践。",
        "category": "前端开发",
        "tagNames": ["Vue", "JavaScript", "前端"]
    },
    {
        "title": "Kubernetes 集群管理实战",
        "content": "# Kubernetes 集群管理实战\n\nKubernetes 是容器编排的事实标准。本文将介绍如何管理生产环境的 K8s 集群，包括节点管理、资源调度、监控告警等...",
        "excerpt": "Kubernetes生产环境集群管理的完整指南，涵盖节点管理、资源调度、监控等关键操作。",
        "category": "DevOps",
        "tagNames": ["Kubernetes", "Docker", "DevOps"]
    },
    {
        "title": "Python 机器学习项目实战",
        "content": "# Python 机器学习项目实战\n\nPython 在机器学习领域有着广泛的应用。本文将介绍如何构建一个完整的机器学习项目，从数据预处理到模型部署的全流程...",
        "excerpt": "Python机器学习项目的完整实战指南，涵盖数据处理、模型训练、部署等全流程。",
        "category": "人工智能",
        "tagNames": ["Python", "Machine Learning", "人工智能"]
    },
    {
        "title": "TypeScript 高级类型系统详解",
        "content": "# TypeScript 高级类型系统详解\n\nTypeScript 的类型系统非常强大，本文深入探讨高级类型的使用，包括条件类型、映射类型、模板字面量类型等...",
        "excerpt": "TypeScript高级类型系统的深度解析，掌握条件类型、映射类型等高级特性的使用方法。",
        "category": "前端开发",
        "tagNames": ["TypeScript", "JavaScript", "前端"]
    },
    {
        "title": "Redis 缓存策略与性能优化",
        "content": "# Redis 缓存策略与性能优化\n\nRedis 是高性能的缓存数据库，本文将介绍各种缓存策略和性能优化技巧，帮助构建高效的缓存系统...",
        "excerpt": "Redis缓存策略和性能优化的完整指南，提升缓存系统的效率和稳定性。",
        "category": "数据库",
        "tagNames": ["Redis", "缓存", "性能优化"]
    },
    {
        "title": "微服务架构设计原则",
        "content": "# 微服务架构设计原则\n\n微服务架构是现代应用开发的主流选择，本文将介绍微服务设计的核心原则，包括服务拆分、通信方式、数据一致性等...",
        "excerpt": "微服务架构设计的核心原则和最佳实践，帮助构建可扩展的分布式系统。",
        "category": "架构设计",
        "tagNames": ["微服务", "架构设计", "分布式系统"]
    }
]

# 更多文章标题模板
ARTICLE_TITLES = [
    "深入理解JavaScript原型链",
    "Spring Security 认证授权实战",
    "Docker Compose 多服务编排",
    "PostgreSQL 性能调优指南",
    "React Native 跨平台开发实践",
    "Go 语言并发编程详解",
    "Kubernetes 服务网格 Istio 入门",
    "Python 异步编程 asyncio 详解",
    "MongoDB 聚合管道高级用法",
    "Vue 3 状态管理 Pinia 实战",
    "AWS Lambda 无服务器架构",
    "TypeScript 装饰器模式应用",
    "Redis 集群部署与高可用",
    "微服务监控与链路追踪",
    "Docker 镜像安全最佳实践",
    "Spring Cloud 微服务生态",
    "React 性能优化实战技巧",
    "PostgreSQL 分区表设计",
    "Kubernetes 资源配额管理",
    "Python 数据可视化实战",
    "Node.js 内存泄漏排查",
    "MongoDB 索引优化策略",
    "Vue 3 组件库开发指南",
    "DevOps 持续集成实践",
    "GraphQL 与 REST API 对比",
    "Docker 多阶段构建优化",
    "Spring Boot 监控与告警",
    "React 状态管理 Redux Toolkit",
    "PostgreSQL 主从复制配置",
    "Kubernetes 自动扩缩容",
    "Python Web 框架对比",
    "Redis 持久化策略详解",
    "微服务 API 网关设计",
    "Docker 网络配置详解",
    "Spring Boot 测试最佳实践",
    "React 路由管理 React Router",
    "MongoDB 备份恢复策略",
    "Vue 3 国际化 i18n 实现",
    "DevOps 自动化部署流程",
    "GraphQL 订阅功能实现",
    "Docker 存储驱动选择",
    "Spring Boot 缓存集成",
    "React 错误边界处理",
    "PostgreSQL 性能监控",
    "Kubernetes 配置管理",
    "Python 单元测试框架"
]

def test_api_connection():
    """测试API连接"""
    try:
        response = requests.get(f"{BASE_URL}/api/tags")
        print(f"✅ API 连接测试成功: {response.status_code}")
        return True
    except Exception as e:
        print(f"❌ API 连接失败: {e}")
        return False

def create_category(category_data):
    """创建分类"""
    try:
        response = requests.post(f"{BASE_URL}/category", json=category_data)
        if response.status_code == 200:
            print(f"✅ 分类创建成功: {category_data['name']}")
            return response.json()
        else:
            print(f"⚠️ 分类可能已存在: {category_data['name']}")
            return None
    except Exception as e:
        print(f"❌ 分类创建失败: {e}")
        return None

def create_tag(tag_data):
    """创建标签"""
    try:
        response = requests.post(f"{BASE_URL}/api/tags", json=tag_data)
        if response.status_code == 200:
            print(f"✅ 标签创建成功: {tag_data['name']}")
            return response.json()
        else:
            print(f"⚠️ 标签可能已存在: {tag_data['name']}")
            return None
    except Exception as e:
        print(f"❌ 标签创建失败: {e}")
        return None

def create_article(article_data):
    """创建文章"""
    try:
        response = requests.post(f"{BASE_URL}/article", json=article_data)
        if response.status_code == 200:
            print(f"✅ 文章创建成功: {article_data['title']}")
            return response.json()
        else:
            print(f"❌ 文章创建失败: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ 文章创建失败: {e}")
        return None

def generate_random_article(index):
    """生成随机文章"""
    # 随机选择分类
    category = random.choice(CATEGORIES)
    
    # 随机选择2-5个标签
    num_tags = random.randint(2, 5)
    selected_tags = random.sample(TECH_TAGS, num_tags)
    tag_names = [tag["name"] for tag in selected_tags]
    
    # 生成文章标题
    if index < len(ARTICLE_TITLES):
        title = ARTICLE_TITLES[index]
    else:
        # 基于标签和分类生成标题
        tag_name = random.choice(tag_names)
        category_name = category["name"]
        title = f"{tag_name} 在 {category_name} 中的应用实践"
    
    # 生成文章内容
    content = f"# {title}\n\n这是一篇关于 {', '.join(tag_names)} 的技术文章，属于 {category['name']} 分类。\n\n## 概述\n\n本文将深入探讨 {tag_names[0]} 技术的核心概念和实际应用...\n\n## 技术要点\n\n- {tag_names[0]} 的核心特性\n- {tag_names[1] if len(tag_names) > 1 else tag_names[0]} 的最佳实践\n- 实际项目中的应用案例\n\n## 总结\n\n通过本文的学习，读者可以掌握 {', '.join(tag_names[:2])} 等技术的实际应用方法。"
    
    # 生成摘要
    excerpt = f"深入探讨{tag_names[0]}技术在{category['name']}领域的应用，包含核心概念、最佳实践和实际案例。"
    
    # 生成短链接
    short_url = f"article-{index+1:03d}-{random.randint(1000, 9999)}"
    
    # 随机作者
    authors = ["张三", "李四", "王五", "赵六", "孙七", "周八", "吴九", "郑十"]
    author = random.choice(authors)
    
    return {
        "title": title,
        "content": content,
        "excerpt": excerpt,
        "author": author,
        "shortUrl": short_url,
        "category": category["name"],
        "tags": tag_names
    }

def main():
    """主函数"""
    print("🚀 开始生成50篇技术文章...")
    print("=" * 50)
    
    # 测试API连接
    if not test_api_connection():
        print("❌ API连接失败，请检查后端服务是否运行")
        return
    
    # 创建分类
    print("\n📂 创建分类...")
    for category in CATEGORIES:
        create_category(category)
        time.sleep(0.1)  # 避免请求过快
    
    # 创建标签
    print("\n🏷️ 创建标签...")
    for tag in TECH_TAGS:
        create_tag(tag)
        time.sleep(0.1)  # 避免请求过快
    
    # 创建文章
    print("\n📝 创建文章...")
    success_count = 0
    for i in range(50):
        article_data = generate_random_article(i)
        if create_article(article_data):
            success_count += 1
        time.sleep(0.2)  # 避免请求过快
        
        # 显示进度
        if (i + 1) % 10 == 0:
            print(f"📊 进度: {i + 1}/50")
    
    print("\n" + "=" * 50)
    print(f"🎉 文章生成完成！")
    print(f"✅ 成功创建: {success_count}/50 篇文章")
    print(f"📂 分类数量: {len(CATEGORIES)}")
    print(f"🏷️ 标签数量: {len(TECH_TAGS)}")
    print("=" * 50)

if __name__ == "__main__":
    main()
