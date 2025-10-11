package com.example.backend.preload;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import com.example.backend.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CachePreloader implements ApplicationRunner {
    private static final Logger logger = LoggerFactory.getLogger(CachePreloader.class);
    
    private final ArticleService articleService;
    
    public CachePreloader(ArticleService articleService) { 
        this.articleService = articleService; 
    }

    @Override
    public void run(ApplicationArguments args) {
        logger.info("Starting cache preloading process...");
        try {
            // This is an "external call" that will go through ArticleService proxy → @Cacheable will take effect
            articleService.getAllArticles();
            logger.info("Cache preloading completed successfully");
        } catch (Exception e) {
            logger.error("Error during cache preloading: {}", e.getMessage(), e);
        }
    }
}
