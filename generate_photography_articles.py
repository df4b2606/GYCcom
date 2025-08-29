#!/usr/bin/env python3
"""
生成摄影相关文章的脚本
包含摄影分类和标签，随机分配
"""

import requests
import json
import random
from datetime import datetime, timedelta
import time

# Backend API base URL
BASE_URL = "http://localhost:8080"

# Photography categories
PHOTOGRAPHY_CATEGORIES = [
    {"name": "人像摄影", "color": "#FF6B6B"},
    {"name": "风景摄影", "color": "#4ECDC4"},
    {"name": "街拍摄影", "color": "#45B7D1"},
    {"name": "建筑摄影", "color": "#96CEB4"},
    {"name": "纪实摄影", "color": "#FFEAA7"},
    {"name": "商业摄影", "color": "#DDA0DD"},
    {"name": "婚礼摄影", "color": "#98D8C8"},
    {"name": "产品摄影", "color": "#F7DC6F"},
    {"name": "野生动物摄影", "color": "#BB8FCE"},
    {"name": "微距摄影", "color": "#85C1E9"},
    {"name": "黑白摄影", "color": "#A8E6CF"},
    {"name": "航拍摄影", "color": "#FFB7B2"}
]

# Photography tags
PHOTOGRAPHY_TAGS = [
    # Camera brands
    {"name": "Canon", "description": "Canon相机品牌", "color": "#FF6B6B"},
    {"name": "Nikon", "description": "Nikon相机品牌", "color": "#4ECDC4"},
    {"name": "Sony", "description": "Sony相机品牌", "color": "#45B7D1"},
    {"name": "Fujifilm", "description": "Fujifilm相机品牌", "color": "#96CEB4"},
    {"name": "Leica", "description": "Leica相机品牌", "color": "#FFEAA7"},
    {"name": "Pentax", "description": "Pentax相机品牌", "color": "#DDA0DD"},
    
    # Lens types
    {"name": "广角镜头", "description": "广角镜头摄影", "color": "#98D8C8"},
    {"name": "长焦镜头", "description": "长焦镜头摄影", "color": "#F7DC6F"},
    {"name": "定焦镜头", "description": "定焦镜头摄影", "color": "#BB8FCE"},
    {"name": "变焦镜头", "description": "变焦镜头摄影", "color": "#85C1E9"},
    {"name": "微距镜头", "description": "微距镜头摄影", "color": "#A8E6CF"},
    {"name": "鱼眼镜头", "description": "鱼眼镜头摄影", "color": "#FFB7B2"},
    
    # Photography techniques
    {"name": "构图技巧", "description": "摄影构图技巧", "color": "#FF6B9D"},
    {"name": "光线控制", "description": "摄影光线控制", "color": "#4ECDC4"},
    {"name": "曝光控制", "description": "摄影曝光控制", "color": "#45B7D1"},
    {"name": "对焦技巧", "description": "摄影对焦技巧", "color": "#96CEB4"},
    {"name": "色彩管理", "description": "摄影色彩管理", "color": "#FFEAA7"},
    {"name": "后期处理", "description": "摄影后期处理", "color": "#DDA0DD"},
    
    # Photography styles
    {"name": "复古风格", "description": "复古摄影风格", "color": "#98D8C8"},
    {"name": "现代风格", "description": "现代摄影风格", "color": "#F7DC6F"},
    {"name": "极简主义", "description": "极简主义摄影", "color": "#BB8FCE"},
    {"name": "抽象摄影", "description": "抽象摄影艺术", "color": "#85C1E9"},
    {"name": "概念摄影", "description": "概念摄影艺术", "color": "#A8E6CF"},
    {"name": "实验摄影", "description": "实验性摄影", "color": "#FFB7B2"},
    
    # Photography subjects
    {"name": "城市风光", "description": "城市风光摄影", "color": "#FF6B6B"},
    {"name": "自然风光", "description": "自然风光摄影", "color": "#4ECDC4"},
    {"name": "人文纪实", "description": "人文纪实摄影", "color": "#45B7D1"},
    {"name": "时尚人像", "description": "时尚人像摄影", "color": "#96CEB4"},
    {"name": "儿童摄影", "description": "儿童摄影艺术", "color": "#FFEAA7"},
    {"name": "宠物摄影", "description": "宠物摄影艺术", "color": "#DDA0DD"},
    
    # Photography equipment
    {"name": "三脚架", "description": "三脚架使用技巧", "color": "#98D8C8"},
    {"name": "闪光灯", "description": "闪光灯使用技巧", "color": "#F7DC6F"},
    {"name": "滤镜", "description": "摄影滤镜使用", "color": "#BB8FCE"},
    {"name": "反光板", "description": "反光板使用技巧", "color": "#85C1E9"},
    {"name": "柔光箱", "description": "柔光箱使用技巧", "color": "#A8E6CF"},
    {"name": "背景布", "description": "背景布使用技巧", "color": "#FFB7B2"},
    
    # Photography software
    {"name": "Lightroom", "description": "Adobe Lightroom", "color": "#FF6B6B"},
    {"name": "Photoshop", "description": "Adobe Photoshop", "color": "#4ECDC4"},
    {"name": "Capture One", "description": "Capture One软件", "color": "#45B7D1"},
    {"name": "Luminar", "description": "Luminar软件", "color": "#96CEB4"},
    {"name": "Snapseed", "description": "Snapseed移动端", "color": "#FFEAA7"},
    {"name": "VSCO", "description": "VSCO滤镜应用", "color": "#DDA0DD"}
]

# Article templates
ARTICLE_TEMPLATES = [
    {
        "title": "人像摄影的光线控制技巧",
        "content": "# 人像摄影的光线控制技巧\n\n人像摄影中，光线控制是决定作品成败的关键因素。本文将深入探讨各种光线条件下的拍摄技巧和注意事项。\n\n## 自然光拍摄\n\n自然光是人像摄影最常用的光源，具有柔和、自然的特点...",
        "excerpt": "深入探讨人像摄影中的光线控制技巧，包括自然光、人工光的使用方法和注意事项。",
        "category": "人像摄影",
        "tagNames": ["光线控制", "人像摄影", "构图技巧"]
    },
    {
        "title": "风景摄影的构图艺术",
        "content": "# 风景摄影的构图艺术\n\n风景摄影需要独特的构图思维和艺术眼光。本文将介绍风景摄影中常用的构图法则和创意技巧。\n\n## 三分法则\n\n三分法则是风景摄影中最基本的构图原则...",
        "excerpt": "风景摄影构图的完整指南，涵盖三分法则、对称构图、引导线等经典构图技巧。",
        "category": "风景摄影",
        "tagNames": ["构图技巧", "风景摄影", "广角镜头"]
    },
    {
        "title": "街拍摄影的瞬间捕捉",
        "content": "# 街拍摄影的瞬间捕捉\n\n街拍摄影需要敏锐的观察力和快速的反应能力。本文将分享街拍摄影的技巧和心得。\n\n## 观察与预判\n\n街拍摄影最重要的是培养敏锐的观察力...",
        "excerpt": "街拍摄影的实战技巧，教你如何捕捉生活中的精彩瞬间和人文故事。",
        "category": "街拍摄影",
        "tagNames": ["街拍摄影", "纪实摄影", "人文纪实"]
    },
    {
        "title": "建筑摄影的几何美学",
        "content": "# 建筑摄影的几何美学\n\n建筑摄影强调几何线条和空间结构的美感。本文将探讨如何通过摄影展现建筑的独特魅力。\n\n## 线条与形状\n\n建筑摄影中，线条和形状是构成画面的基本元素...",
        "excerpt": "建筑摄影的几何美学探索，通过线条、形状、光影展现建筑的独特魅力。",
        "category": "建筑摄影",
        "tagNames": ["建筑摄影", "构图技巧", "广角镜头"]
    },
    {
        "title": "微距摄影的微观世界",
        "content": "# 微距摄影的微观世界\n\n微距摄影让我们发现日常生活中的微观之美。本文将介绍微距摄影的器材选择和技术要点。\n\n## 器材选择\n\n微距摄影对器材有特殊要求...",
        "excerpt": "微距摄影的完整指南，从器材选择到拍摄技巧，带你探索微观世界的奇妙。",
        "category": "微距摄影",
        "tagNames": ["微距摄影", "微距镜头", "对焦技巧"]
    }
]

# More article titles
ARTICLE_TITLES = [
    "Canon EOS R5 人像摄影实战",
    "Nikon Z6 风景摄影技巧",
    "Sony A7M4 街拍指南",
    "Fujifilm X-T4 胶片模拟",
    "Leica M10 黑白摄影艺术",
    "广角镜头城市风光拍摄",
    "长焦镜头野生动物摄影",
    "定焦镜头人像摄影",
    "变焦镜头旅行摄影",
    "鱼眼镜头创意摄影",
    "黄金时段光线利用",
    "阴天摄影光线处理",
    "逆光人像拍摄技巧",
    "侧光建筑摄影",
    "顶光产品摄影",
    "手动曝光控制技巧",
    "自动对焦模式选择",
    "手动对焦精确控制",
    "连续对焦运动摄影",
    "单点对焦人像摄影",
    "色彩理论在摄影中的应用",
    "白平衡设置技巧",
    "色彩饱和度调整",
    "黑白摄影色彩转换",
    "Lightroom 后期调色",
    "Photoshop 人像修图",
    "Capture One 专业调色",
    "Luminar AI 智能修图",
    "复古风格摄影技巧",
    "现代极简主义摄影",
    "抽象摄影创作方法",
    "概念摄影艺术表达",
    "实验摄影创新技法",
    "城市夜景摄影技巧",
    "自然风光季节变化",
    "人文纪实故事表达",
    "时尚人像造型设计",
    "儿童摄影自然表现",
    "宠物摄影情感捕捉",
    "三脚架稳定拍摄",
    "闪光灯人像补光",
    "滤镜风光摄影",
    "反光板光线反射",
    "柔光箱商业摄影",
    "背景布产品摄影"
]

def test_api_connection():
    """Test API connection"""
    try:
        response = requests.get(f"{BASE_URL}/api/tags")
        print(f"✅ API connection test successful: {response.status_code}")
        return True
    except Exception as e:
        print(f"❌ API connection failed: {e}")
        return False

def create_category(category_data):
    """Create category"""
    try:
        response = requests.post(f"{BASE_URL}/category", json=category_data)
        if response.status_code == 200:
            print(f"✅ Category created successfully: {category_data['name']}")
            return response.json()
        else:
            print(f"⚠️ Category may already exist: {category_data['name']}")
            return None
    except Exception as e:
        print(f"❌ Category creation failed: {e}")
        return None

def create_tag(tag_data):
    """Create tag"""
    try:
        response = requests.post(f"{BASE_URL}/api/tags", json=tag_data)
        if response.status_code == 200:
            print(f"✅ Tag created successfully: {tag_data['name']}")
            return response.json()
        else:
            print(f"⚠️ Tag may already exist: {tag_data['name']}")
            return None
    except Exception as e:
        print(f"❌ Tag creation failed: {e}")
        return None

def create_article(article_data):
    """Create article"""
    try:
        response = requests.post(f"{BASE_URL}/article", json=article_data)
        if response.status_code == 200:
            print(f"✅ Article created successfully: {article_data['title']}")
            return response.json()
        else:
            print(f"❌ Article creation failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Article creation failed: {e}")
        return None

def generate_random_article(index):
    """Generate random article"""
    # Randomly select category
    category = random.choice(PHOTOGRAPHY_CATEGORIES)
    
    # Randomly select 2-5 tags
    num_tags = random.randint(2, 5)
    selected_tags = random.sample(PHOTOGRAPHY_TAGS, num_tags)
    tag_names = [tag["name"] for tag in selected_tags]
    
    # Generate article title
    if index < len(ARTICLE_TITLES):
        title = ARTICLE_TITLES[index]
    else:
        # Generate title based on tags and category
        tag_name = random.choice(tag_names)
        category_name = category["name"]
        title = f"{tag_name} 在 {category_name} 中的应用技巧"
    
    # Generate article content
    content = f"# {title}\n\n这是一篇关于 {', '.join(tag_names)} 的摄影文章，属于 {category['name']} 分类。\n\n## 概述\n\n本文将深入探讨 {tag_names[0]} 在摄影中的核心概念和实际应用...\n\n## 技术要点\n\n- {tag_names[0]} 的核心技巧\n- {tag_names[1] if len(tag_names) > 1 else tag_names[0]} 的最佳实践\n- 实际拍摄中的应用案例\n\n## 器材推荐\n\n针对 {category['name']} 摄影，推荐使用以下器材：\n- 相机：{random.choice(['Canon', 'Nikon', 'Sony', 'Fujifilm'])} 系列\n- 镜头：{random.choice(['广角镜头', '长焦镜头', '定焦镜头', '变焦镜头'])}\n- 配件：{random.choice(['三脚架', '闪光灯', '滤镜', '反光板'])}\n\n## 拍摄技巧\n\n1. **光线控制**：掌握不同光线条件下的拍摄方法\n2. **构图原则**：运用经典构图法则提升画面美感\n3. **后期处理**：使用专业软件进行色彩调整和细节优化\n\n## 总结\n\n通过本文的学习，读者可以掌握 {', '.join(tag_names[:2])} 等摄影技术的实际应用方法，提升摄影创作水平。"
    
    # Generate excerpt
    excerpt = f"深入探讨{tag_names[0]}技术在{category['name']}领域的应用，包含核心技巧、最佳实践和实际案例。"
    
    # Generate short URL
    short_url = f"photo-{index+1:03d}-{random.randint(1000, 9999)}"
    
    # Random author
    authors = ["摄影大师", "光影艺术家", "视觉创作者", "影像记录者", "美学探索者", "瞬间捕捉者", "色彩魔法师", "构图艺术家"]
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
    """Main function"""
    print("🚀 Starting to generate photography articles...")
    print("=" * 50)
    
    # Test API connection
    if not test_api_connection():
        print("❌ API connection failed, please check if backend service is running")
        return
    
    # Create categories
    print("\n📂 Creating categories...")
    for category in PHOTOGRAPHY_CATEGORIES:
        create_category(category)
        time.sleep(0.1)  # Avoid too fast requests
    
    # Create tags
    print("\n🏷️ Creating tags...")
    for tag in PHOTOGRAPHY_TAGS:
        create_tag(tag)
        time.sleep(0.1)  # Avoid too fast requests
    
    # Create articles
    print("\n📝 Creating articles...")
    success_count = 0
    for i in range(50):
        article_data = generate_random_article(i)
        if create_article(article_data):
            success_count += 1
        time.sleep(0.2)  # Avoid too fast requests
        
        # Show progress
        if (i + 1) % 10 == 0:
            print(f"📊 Progress: {i + 1}/50")
    
    print("\n" + "=" * 50)
    print(f"🎉 Article generation completed!")
    print(f"✅ Successfully created: {success_count}/50 articles")
    print(f"📂 Categories: {len(PHOTOGRAPHY_CATEGORIES)}")
    print(f"🏷️ Tags: {len(PHOTOGRAPHY_TAGS)}")
    print("=" * 50)

if __name__ == "__main__":
    main()
