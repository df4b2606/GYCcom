package com.example.backend.dto;

import com.example.backend.entity.Article;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleWithLikeDTO {
    private int id;
    private String title;
    private String content;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String contentEng;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String author;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String shortUrl;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String backgroundImageUrl;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String excerpt;
    
    private LocalDateTime createdAt;
    // Category and tags
    private Object category;
    private List<Object> tags;
    
    // Like-related fields
    private long likeCount;
    private boolean isLiked;
    
    // Constructor to convert from Article entity
    public ArticleWithLikeDTO(Article article, long likeCount, boolean isLiked) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.contentEng = article.getContentEng();
        this.author = article.getAuthor();
        this.shortUrl = article.getShortUrl();
        this.backgroundImageUrl = article.getBackgroundImageUrl();
        this.excerpt = article.getExcerpt();
        this.createdAt = article.getCreatedAt();
        this.category = article.getCategory();
        this.tags = article.getTags() != null ? 
            article.getTags().stream().map(tag -> (Object) tag).toList() : null;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
