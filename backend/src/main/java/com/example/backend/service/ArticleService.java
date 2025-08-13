package com.example.backend.service;

import com.example.backend.common.ErrorCode;
import com.example.backend.entity.Article;
import com.example.backend.entity.Tag;
import com.example.backend.entity.Category;
import com.example.backend.exception.BusinessException;
import com.example.backend.repository.ArticleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.utils.ArticleParser;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import com.example.backend.dto.ArticleDTO;
@Service
public class ArticleService {
    private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @Autowired
    private TagService tagService;

    @Autowired
    private CategoryService categoryService;
    
    @Transactional
    public Article createArticle(ArticleDTO articleDTO) {
        logger.info("🚀 Creating article: {}", articleDTO.getTitle());
        
        Article article = new Article();
        article.setCreatedAt(LocalDateTime.now());
        
        // Manually set properties to avoid copying id
        article.setTitle(articleDTO.getTitle());
        article.setContent(articleDTO.getContent());
        article.setContentEng(articleDTO.getContentEng());
        article.setAuthor(articleDTO.getAuthor());
        article.setBackgroundImageUrl(articleDTO.getBackgroundImageUrl());
        // excerpt: 如果前端提交了就用提交的；否则使用内容前120字符作为默认摘要
        if (articleDTO.getExcerpt() != null && !articleDTO.getExcerpt().isEmpty()) {
            article.setExcerpt(articleDTO.getExcerpt());
        } else if (articleDTO.getContent() != null) {
            String plain = articleDTO.getContent()
                    .replaceAll("```[\\s\\S]*?```", " ")
                    .replaceAll("`[^`]*`", " ")
                    .replaceAll("[#>*_\\-\\\\[\\\\]\\(\\)!]", " ")
                    .replaceAll("\\s+", " ")
                    .trim();
            if (plain.length() > 120) {
                plain = plain.substring(0, 120) + "...";
            }
            article.setExcerpt(plain);
        }
        
        //Add shortUrl
        if (articleDTO.getShortUrl() == null || articleDTO.getShortUrl().isEmpty()) {
            String shortUrl = ArticleParser.generateShortUrl(articleDTO.getTitle());
            article.setShortUrl(shortUrl);
            logger.debug("🔗 Generated short URL: {}", shortUrl);
        } else {
            article.setShortUrl(articleDTO.getShortUrl());
            logger.debug("🔗 Using provided short URL: {}", articleDTO.getShortUrl());
        }
        
        // Handle tags
        if (articleDTO.getTags() != null && !articleDTO.getTags().isEmpty()) {
            logger.debug("🏷️ Processing tags: {}", articleDTO.getTags());
            
            // Find or create tags
            List<Tag> tags = tagService.findOrCreateTags(articleDTO.getTags());
            article.setTags(tags);
            
            // Increment usage count for each tag
            tags.forEach(tag -> tagService.incrementUsageCount(tag.getId()));
            
            logger.info("✅ Associated {} tags with article", tags.size());
        }

        // Handle category (single)
        if (articleDTO.getCategory() != null && !articleDTO.getCategory().isEmpty()) {
            article.setCategory(categoryService.findOrCreateByName(articleDTO.getCategory()));
        }
        
        // TODO Check for duplicate short URLs

        try {
            Article savedArticle = articleRepository.save(article);
            logger.info("✅ Article created successfully! ID: {}, Tags: {}", 
                       savedArticle.getId(), 
                       savedArticle.getTags() != null ? savedArticle.getTags().size() : 0);
            return savedArticle;
        } catch (Exception e) {
            logger.error("❌ Failed to create article: {}", e.getMessage(), e);
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "Failed to create article");
        }
    }
    
    public List<Article> getAllArticles() {
        logger.debug("📋 Getting all articles list");
        List<Article> articles = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        logger.info("📚 Successfully retrieved {} articles", articles.size());
        return articles;
    }
    
    public Article getRequiredById(Long id) {
        return articleRepository.findById(id)
            .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "Article not found"));
    }

    public Article getRequiredByShortUrl(String shortUrl) {
        try {
            return articleRepository.findByShortUrl(shortUrl)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "Article not found"));
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.SERVER_ERROR, "Failed to query article");
        }
    }

    public List<Article> getArticlesByCategory(Category category) {
        logger.debug("🔍 Getting articles by category: {}", category);
        List<Article> articles = articleRepository.findByCategory(category);
        logger.info("📚 Successfully retrieved {} articles", articles.size());
        return articles;
    }
}



