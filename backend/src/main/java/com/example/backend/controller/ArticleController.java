package com.example.backend.controller;

import com.example.backend.dto.ArticleDTO;
import com.example.backend.entity.Article;
import com.example.backend.entity.Category;
import com.example.backend.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article")
@Tag(name="article controller", description = "Operations about article")

public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @Operation(summary = "Publish an article")
    @PostMapping
    public ResponseEntity<Article> publish(@RequestBody ArticleDTO articleDTO) {
        return ResponseEntity.ok(articleService.createArticle(articleDTO));
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> get(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getRequiredById(id));
    }

    @GetMapping("/slug/{shortUrl}")
    public ResponseEntity<Article> getByShortUrl(@PathVariable String shortUrl) {
        return ResponseEntity.ok(articleService.getRequiredByShortUrl(shortUrl));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Article>> getByCategory(@PathVariable Category category) {
        return ResponseEntity.ok(articleService.getArticlesByCategory(category));
              
    }




}
