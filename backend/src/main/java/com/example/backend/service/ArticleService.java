package com.example.backend.service;

import com.example.backend.common.ErrorCode;
import com.example.backend.entity.Article;
import com.example.backend.entity.Tag;
import com.example.backend.exception.BusinessException;

import com.example.backend.repository.ArticleRepository;
import org.springframework.cache.CacheManager;
import org.springframework.cache.Cache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.utils.ArticleParser;
import java.time.LocalDateTime;
import java.util.List;


import com.example.backend.dto.ArticleDTO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
 
import com.example.backend.metrics.TaskTimer;

@Service
public class ArticleService {
    private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @Autowired
    private TagService tagService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private TaskTimer taskTimer;
    
    @Transactional   
    @CacheEvict(value = "articles",key="'all'")
    
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
        // excerpt: If frontend provides excerpt, use it; otherwise use first 120 characters of content as default
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
            Article savedArticle = taskTimer.time("create_article", () -> articleRepository.save(article));
            logger.info("✅ Article created successfully! ID: {}, Tags: {}",
                    savedArticle.getId(),
                    savedArticle.getTags() != null ? savedArticle.getTags().size() : 0);
            clearRelatedCaches(savedArticle);
            return savedArticle;

        } catch (Exception e) {
            logger.error("❌ Failed to create article: {}", e.getMessage(), e);
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "Failed to create article");
        }
    }

    private void clearRelatedCaches(Article article){
        //clear all tags cache
        Cache tagsCache = cacheManager.getCache("tags");
        if (tagsCache != null) {
            tagsCache.evict("'allactive'");
            logger.info("🗑️ Cleared tags cache: 'allactive'");
        } else {
            logger.warn("⚠️ Tags cache not found");
        }    
        //clear the related category cache
        if (article.getCategory() != null) {
            String categoryKey = "category_" + article.getCategory().getId();
            Cache cache = cacheManager.getCache("articles");
            if(cache != null){
                cache.evict(categoryKey);
            }
            else{
                logger.warn("Cache not found for category key: {}", categoryKey);
            }
        }
        
      
    }
    
    // Cache all articles list - highest access frequency
    @Cacheable(value = "articles", key = "'all'")
    public List<Article> getAllArticles() {
       
        logger.info("❌ Cache MISS - Querying database for getAllArticles");
        
        logger.debug("📋 Getting all articles list from database");
        List<Article> articles = taskTimer.time("get_all_articles", () -> articleRepository.findAllWithCategoryAndTags());
        logger.info("📚 Retrieved {} articles from database", articles.size());
        
        return articles;
    }
    
    public Article getRequiredById(Long id) {
        return articleRepository.findById(id)
            .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "Article not found"));
    }

    @Cacheable(value="article",key="'shortUrl:' + #shortUrl")
    public Article getRequiredByShortUrl(String shortUrl) {
        try {
            return articleRepository.findByShortUrl(shortUrl)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "Article not found"));
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.SERVER_ERROR, "Failed to query article");
        }
    }

   

    /**
     * Get articles that contain any of the provided tag names (OR logic)
     */
    // Cache articles by tags
    @Cacheable(value = "articles", key = "'tags:' + #tagNames.toString()")
    public List<Article> getArticlesByAnyTagNames(List<String> tagNames) {
        if (tagNames == null || tagNames.isEmpty()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "tagNames must not be empty");
        }
        logger.debug("🔍 Getting articles by any of tag names: {}", tagNames);
        List<Article> articles = articleRepository.findByAnyTagNames(tagNames);
        logger.info("📚 Successfully retrieved {} articles by tags (OR)", articles.size());
        return articles;
    }

    // Search by the category ID 
    @Cacheable(value = "articles", key = "'category_' + #categoryId")
    public List<Article> getArticlesByCategoryId(Long categoryId) {
        logger.info(" Cache check for category ID: {}", categoryId);
        
        List<Article> articles = articleRepository.findByCategoryIdWithCategoryAndTags(categoryId);
        
        logger.info("📚 Retrieved {} articles for category ID: {}", articles.size(), categoryId);
        return articles;
    }
}



