#!/usr/bin/env python3
"""
快速生成摄影文章的简化脚本
"""

import requests
import json
import random
import time

# Backend API base URL
BASE_URL = "http://localhost:8080"

# Photography categories with colors
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

# Photography article titles
PHOTOGRAPHY_TITLES = [
    "Canon EOS R5 人像摄影实战指南",
    "Nikon Z6 风景摄影技巧详解",
    "Sony A7M4 街拍摄影完全攻略",
    "Fujifilm X-T4 胶片模拟艺术",
    "Leica M10 黑白摄影美学",
    "广角镜头城市风光拍摄技巧",
    "长焦镜头野生动物摄影实战",
    "定焦镜头人像摄影精要",
    "变焦镜头旅行摄影指南",
    "鱼眼镜头创意摄影探索",
    "黄金时段光线利用技巧",
    "阴天摄影光线处理方法",
    "逆光人像拍摄高级技巧",
    "侧光建筑摄影艺术表现",
    "顶光产品摄影布光技巧",
    "手动曝光控制实战指南",
    "自动对焦模式选择策略",
    "手动对焦精确控制方法",
    "连续对焦运动摄影技巧",
    "单点对焦人像摄影应用",
    "色彩理论在摄影中的实践",
    "白平衡设置专业技巧",
    "色彩饱和度调整艺术",
    "黑白摄影色彩转换技巧",
    "Lightroom 后期调色大师课",
    "Photoshop 人像修图精修",
    "Capture One 专业调色指南",
    "Luminar AI 智能修图技巧",
    "复古风格摄影创作方法",
    "现代极简主义摄影艺术",
    "抽象摄影创作技法探索",
    "概念摄影艺术表达技巧",
    "实验摄影创新技法研究",
    "城市夜景摄影完全指南",
    "自然风光季节变化记录",
    "人文纪实故事表达艺术",
    "时尚人像造型设计技巧",
    "儿童摄影自然表现方法",
    "宠物摄影情感捕捉艺术",
    "三脚架稳定拍摄技巧",
    "闪光灯人像补光艺术",
    "滤镜风光摄影应用",
    "反光板光线反射技巧",
    "柔光箱商业摄影布光",
    "背景布产品摄影应用"
]

def create_category(category_data):
    """Create category"""
    try:
        response = requests.post(f"{BASE_URL}/category", json=category_data)
        if response.status_code == 200:
            print(f"✅ Category: {category_data['name']}")
            return response.json()
        else:
            print(f"⚠️ Category exists: {category_data['name']}")
            return None
    except Exception as e:
        print(f"❌ Category failed: {e}")
        return None

def create_tag(tag_data):
    """Create tag"""
    try:
        response = requests.post(f"{BASE_URL}/api/tags", json=tag_data)
        if response.status_code == 200:
            print(f"✅ Tag: {tag_data['name']}")
            return response.json()
        else:
            print(f"⚠️ Tag exists: {tag_data['name']}")
            return None
    except Exception as e:
        print(f"❌ Tag failed: {e}")
        return None

def create_article(article_data):
    """Create article"""
    try:
        response = requests.post(f"{BASE_URL}/article", json=article_data)
        if response.status_code == 200:
            print(f"✅ Article: {article_data['title'][:30]}...")
            return response.json()
        else:
            print(f"❌ Article failed: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Article failed: {e}")
        return None

def generate_photography_article(index):
    """Generate photography article"""
    # Random category
    category = random.choice(PHOTOGRAPHY_CATEGORIES)
    
    # Random tags (2-4)
    num_tags = random.randint(2, 4)
    selected_tags = random.sample(PHOTOGRAPHY_TAGS, num_tags)
    tag_names = [tag["name"] for tag in selected_tags]
    
    # Title
    if index < len(PHOTOGRAPHY_TITLES):
        title = PHOTOGRAPHY_TITLES[index]
    else:
        tag_name = random.choice(tag_names)
        category_name = category["name"]
        title = f"{tag_name} 在 {category_name} 中的高级应用"
    
    # Content
    content = f"""# {title}

这是一篇关于 {', '.join(tag_names)} 的专业摄影文章，属于 {category['name']} 分类。

## 概述

本文将深入探讨 {tag_names[0]} 在摄影中的核心概念和实际应用，帮助摄影爱好者提升技术水平。

## 技术要点

- **{tag_names[0]}** 的核心技巧和最佳实践
- **{tag_names[1] if len(tag_names) > 1 else tag_names[0]}** 的实战应用
- 实际拍摄中的案例分析和经验分享

## 器材推荐

针对 {category['name']} 摄影，推荐使用以下器材：

- **相机**: {random.choice(['Canon EOS R5', 'Nikon Z6', 'Sony A7M4', 'Fujifilm X-T4', 'Leica M10'])}
- **镜头**: {random.choice(['广角镜头', '长焦镜头', '定焦镜头', '变焦镜头', '微距镜头'])}
- **配件**: {random.choice(['三脚架', '闪光灯', '滤镜', '反光板', '柔光箱'])}

## 拍摄技巧

### 1. 光线控制
掌握不同光线条件下的拍摄方法，包括自然光、人工光的运用技巧。

### 2. 构图原则
运用经典构图法则，如三分法则、对称构图、引导线等，提升画面美感。

### 3. 后期处理
使用专业软件进行色彩调整、细节优化和艺术创作。

## 实战案例

通过具体的拍摄案例，展示 {', '.join(tag_names[:2])} 等技术的实际应用效果。

## 总结

通过本文的学习，读者可以掌握 {', '.join(tag_names[:2])} 等摄影技术的实际应用方法，提升摄影创作水平和艺术表现力。

---

*本文由专业摄影师撰写，转载请注明出处。*"""
    
    # Excerpt
    excerpt = f"深入探讨{tag_names[0]}技术在{category['name']}领域的应用，包含核心技巧、最佳实践和实际案例。"
    
    # Short URL
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
    print("🚀 开始生成摄影文章...")
    print("=" * 50)
    
    # Create categories
    print("\n📂 创建分类...")
    for category in PHOTOGRAPHY_CATEGORIES:
        create_category(category)
        time.sleep(0.1)
    
    # Create tags
    print("\n🏷️ 创建标签...")
    for tag in PHOTOGRAPHY_TAGS:
        create_tag(tag)
        time.sleep(0.1)
    
    # Create articles
    print("\n📝 创建文章...")
    success_count = 0
    for i in range(50):
        article_data = generate_photography_article(i)
        if create_article(article_data):
            success_count += 1
        time.sleep(0.2)
        
        if (i + 1) % 10 == 0:
            print(f"📊 进度: {i + 1}/50")
    
    print("\n" + "=" * 50)
    print(f"🎉 摄影文章生成完成！")
    print(f"✅ 成功创建: {success_count}/50 篇文章")
    print(f"📂 分类数量: {len(PHOTOGRAPHY_CATEGORIES)}")
    print(f"🏷️ 标签数量: {len(PHOTOGRAPHY_TAGS)}")
    print("=" * 50)

if __name__ == "__main__":
    main()
