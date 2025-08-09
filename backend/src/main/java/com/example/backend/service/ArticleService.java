package com.example.backend.service;

import com.example.backend.common.ErrorCode;
import com.example.backend.entity.Article;
import com.example.backend.exception.BusinessException;
import com.example.backend.repository.ArticleRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
    
    public Article createArticle(ArticleDTO articleDTO) {
        logger.info("🚀 Creating article: {}", articleDTO.getTitle());
        
        Article article = new Article();
        article.setCreatedAt(LocalDateTime.now());
        
        // Manually set properties to avoid copying id
        article.setTitle(articleDTO.getTitle());
        article.setContent(articleDTO.getContent());
        article.setContentEng(articleDTO.getContentEng());
        article.setAuthor(articleDTO.getAuthor());
        
        //Add shortUrl
        if (articleDTO.getShortUrl() == null || articleDTO.getShortUrl().isEmpty()) {
            String shortUrl = ArticleParser.generateShortUrl(articleDTO.getTitle());
            article.setShortUrl(shortUrl);
            logger.debug("🔗 Generated short URL: {}", shortUrl);
        } else {
            article.setShortUrl(articleDTO.getShortUrl());
            logger.debug("🔗 Using provided short URL: {}", articleDTO.getShortUrl());
        }
         // TODO Check for duplicate short URLs

        try {
            articleRepository.save(article);
            logger.info("✅ Article created successfully! ID: {}", article.getId());
            return article;
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
    
    public Optional<Article> getArticleById(Long id) {
        logger.debug("🔍 Getting article by ID: {}", id);
        Optional<Article> article = articleRepository.findById(id);
        if (article.isPresent()) {
            logger.info("✅ Found article: {}", article.get().getTitle());
        } else {
            logger.warn("⚠️  Article with ID {} not found", id);
        }
        return article;
    }
    
    public Optional<Article> getArticleByShortUrl(String shortUrl) {
        logger.debug("🔍 Getting article by short URL: {}", shortUrl);
        Optional<Article> article = articleRepository.findByShortUrl(shortUrl);
        if (article.isPresent()) {
            logger.info("✅ Found article by short URL: {}", article.get().getTitle());
        } else {
            logger.warn("⚠️  Article with short URL {} not found", shortUrl);
        }
        return article;
    }
}



