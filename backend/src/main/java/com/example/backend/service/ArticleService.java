package com.example.backend.service;

import com.example.backend.common.ErrorCode;
import com.example.backend.entity.Article;
import com.example.backend.exception.BusinessException;
import com.example.backend.repository.ArticleRepository;

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
    @Autowired
    private ArticleRepository articleRepository;
    public Article createArticle(ArticleDTO articleDTO) {
        Article article = new Article();
        article.setCreatedAt(LocalDateTime.now());
        
        // 手动设置属性，避免复制 id
        article.setTitle(articleDTO.getTitle());
        article.setContent(articleDTO.getContent());
        article.setContentEng(articleDTO.getContentEng());
        article.setAuthor(articleDTO.getAuthor());
        
        //Add shortUrl
        if (articleDTO.getShortUrl() == null || articleDTO.getShortUrl().isEmpty()) {
            article.setShortUrl(ArticleParser.generateShortUrl(articleDTO.getTitle()));
        } else {
            article.setShortUrl(articleDTO.getShortUrl());
        }
         // TODO 查看是否有重复的短链接

        
        articleRepository.save(article);
        return article;
    }
    
    public List<Article> getAllArticles() {
        return articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }
    
    public Optional<Article> getArticleByShortUrl(String shortUrl) {
        return articleRepository.findByShortUrl(shortUrl);
    }
}



