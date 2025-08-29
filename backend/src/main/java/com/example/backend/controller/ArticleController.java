package com.example.backend.controller;

import com.example.backend.dto.ArticleDTO;
import com.example.backend.entity.Article;
import com.example.backend.entity.Category;
import com.example.backend.service.ArticleService;
import com.example.backend.service.CategoryService;
import com.example.backend.exception.BusinessException;
import com.example.backend.common.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/article")
@Tag(name="article controller", description = "Operations about article")

public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @Autowired
    private CategoryService categoryService;

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

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Article>> getByCategory(@PathVariable Long categoryId) {
        // 直接通过 ID 查询文章，避免两次 SQL 查询
        return ResponseEntity.ok(articleService.getArticlesByCategoryId(categoryId));
    }

    @Operation(summary = "Get articles by any of tag names (OR)")
    @GetMapping("/tags")
    public ResponseEntity<List<Article>> getByAnyTags(
            @RequestParam(name = "tags") List<String> tagNames) {
        // Support both repeated params (?tags=a&tags=b) and CSV (?tags=a,b)
        List<String> normalized = tagNames.stream()
                .flatMap(raw -> Arrays.stream(raw.split(",")))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .distinct()
                .toList();
        return ResponseEntity.ok(articleService.getArticlesByAnyTagNames(normalized));
    }

    




}
