#!/usr/bin/env python3
"""
快速生成50篇技术文章的简化脚本
"""

import requests
import json
import random
import time

# 后端 API 基础URL
BASE_URL = "http://localhost:8080"

# 简化的分类和标签
CATEGORIES = ["前端开发", "后端开发", "移动开发", "数据库", "DevOps", "人工智能", "云计算", "网络安全"]
TAGS = ["React", "Vue", "JavaScript", "TypeScript", "Node.js", "Python", "Java", "Spring Boot", 
        "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "Redis", "AWS", "微服务", "性能优化"]

def test_api():
    """测试API连接"""
    try:
        response = requests.get(f"{BASE_URL}/api/tags")
        print(f"✅ API连接成功: {response.status_code}")
        return True
    except:
        print("❌ API连接失败")
        return False

def create_article(index):
    """创建单篇文章"""
    # 随机选择分类和标签
    category = random.choice(CATEGORIES)
    num_tags = random.randint(2, 4)
    selected_tags = random.sample(TAGS, num_tags)
    
    # 生成文章数据
    article_data = {
        "title": f"技术文章 {index+1}: {random.choice(selected_tags)} 实战指南",
        "content": f"# 技术文章 {index+1}\n\n这是一篇关于 {', '.join(selected_tags)} 的技术文章。\n\n## 概述\n\n本文将介绍 {selected_tags[0]} 的核心概念...\n\n## 技术要点\n\n- 基础概念\n- 最佳实践\n- 实际应用\n\n## 总结\n\n通过本文学习，掌握相关技术。",
        "excerpt": f"深入探讨{selected_tags[0]}技术的核心概念和实际应用。",
        "author": random.choice(["张三", "李四", "王五", "赵六"]),
        "shortUrl": f"article-{index+1:03d}",
        "category": category,
        "tags": selected_tags
    }
    
    try:
        response = requests.post(f"{BASE_URL}/article", json=article_data)
        if response.status_code == 200:
            print(f"✅ 文章 {index+1} 创建成功")
            return True
        else:
            print(f"❌ 文章 {index+1} 创建失败: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ 文章 {index+1} 创建异常: {e}")
        return False

def main():
    """主函数"""
    print("🚀 快速生成50篇技术文章...")
    
    if not test_api():
        return
    
    print(f"📂 分类: {len(CATEGORIES)} 个")
    print(f"🏷️ 标签: {len(TAGS)} 个")
    print("=" * 40)
    
    success_count = 0
    for i in range(50):
        if create_article(i):
            success_count += 1
        time.sleep(0.1)  # 避免请求过快
        
        if (i + 1) % 10 == 0:
            print(f"📊 进度: {i + 1}/50")
    
    print("=" * 40)
    print(f"🎉 完成! 成功创建: {success_count}/50 篇文章")

if __name__ == "__main__":
    main()
