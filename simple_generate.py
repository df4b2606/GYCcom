#!/usr/bin/env python3
"""
简化版文章生成脚本
如果主脚本遇到问题，可以使用这个简化版本
"""

import requests
import json
import random

BASE_URL = "http://localhost:8080"

# 简化的测试数据
TEST_ARTICLES = [
    {
        "title": "React Hooks 入门指南",
        "content": "# React Hooks 入门指南\n\nReact Hooks 是 React 16.8 引入的新特性...",
        "author": "张三",
        "shortUrl": "react-hooks-guide-1001",
        "excerpt": "React Hooks 基础教程",
        "tagNames": ["React", "前端", "JavaScript"]
    },
    {
        "title": "Spring Boot 快速开发",
        "content": "# Spring Boot 快速开发\n\nSpring Boot 简化了 Spring 应用的开发...",
        "author": "李四", 
        "shortUrl": "spring-boot-dev-1002",
        "excerpt": "Spring Boot 开发教程",
        "tagNames": ["Spring Boot", "Java", "后端"]
    },
    {
        "title": "Docker 容器化部署",
        "content": "# Docker 容器化部署\n\nDocker 是现代应用部署的标准工具...",
        "author": "王五",
        "shortUrl": "docker-deployment-1003", 
        "excerpt": "Docker 部署实践",
        "tagNames": ["Docker", "DevOps", "容器化"]
    },
    {
        "title": "MongoDB 数据库设计",
        "content": "# MongoDB 数据库设计\n\nMongoDB 是流行的 NoSQL 数据库...",
        "author": "赵六",
        "shortUrl": "mongodb-design-1004",
        "excerpt": "MongoDB 设计指南", 
        "tagNames": ["MongoDB", "数据库", "NoSQL"]
    },
    {
        "title": "Vue 3 组件开发",
        "content": "# Vue 3 组件开发\n\nVue 3 带来了许多新特性...",
        "author": "孙七",
        "shortUrl": "vue3-components-1005",
        "excerpt": "Vue 3 组件教程",
        "tagNames": ["Vue", "前端", "JavaScript"]
    }
]

def test_api_connection():
    """测试API连接"""
    try:
        response = requests.get(f"{BASE_URL}/api/tags")
        print(f"API 连接测试: {response.status_code}")
        return response.status_code == 200 or response.status_code == 500  # 500也说明连通了
    except Exception as e:
        print(f"API 连接失败: {e}")
        return False

def create_simple_article(article_data):
    """创建简单文章"""
    try:
        # 尝试不同的API端点
        endpoints = ["/article", "/api/article", "/api/articles"]
        
        for endpoint in endpoints:
            try:
                response = requests.post(
                    f"{BASE_URL}{endpoint}",
                    json=article_data,
                    headers={"Content-Type": "application/json"}
                )
                if response.status_code in [200, 201]:
                    print(f"✅ 文章创建成功: {article_data['title']} (使用端点: {endpoint})")
                    return response.json()
                else:
                    print(f"❌ 端点 {endpoint} 返回: {response.status_code}")
            except Exception as e:
                print(f"❌ 端点 {endpoint} 异常: {str(e)}")
                continue
        
        print(f"❌ 所有端点都失败了: {article_data['title']}")
        return None
        
    except Exception as e:
        print(f"❌ 文章创建异常: {article_data['title']} - {str(e)}")
        return None

def main():
    """主函数"""
    print("🚀 开始简化版数据生成...")
    
    # 测试连接
    if not test_api_connection():
        print("❌ 无法连接到后端API，请确保后端服务正在运行")
        return
    
    print("\n📝 创建测试文章...")
    
    success_count = 0
    for article_data in TEST_ARTICLES:
        result = create_simple_article(article_data)
        if result:
            success_count += 1
    
    print(f"\n🎉 简化版数据生成完成！")
    print(f"📊 成功创建 {success_count}/{len(TEST_ARTICLES)} 篇文章")
    
    if success_count > 0:
        print("\n💡 提示: 如果需要更多文章，请运行完整版脚本 generate_articles.py")

if __name__ == "__main__":
    main()
