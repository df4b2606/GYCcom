package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "article")
@Data
@ToString(exclude = {"category", "tags"})
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "article_id_seq")
    @SequenceGenerator(name = "article_id_seq", sequenceName = "article_id_seq", allocationSize = 1)
    private int id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(columnDefinition = "TEXT")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String contentEng;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String author;
    
    // Custom getter to handle null contentEng
    public String getContentEng() {
        return contentEng != null ? contentEng : "";
    }
    
    // Custom getter to handle null backgroundImageUrl
    public String getBackgroundImageUrl() {
        return backgroundImageUrl != null ? backgroundImageUrl : "";
    }
    
    // Custom getter to handle null author
    public String getAuthor() {
        return author != null ? author : "";
    }
    
    // Custom getter to handle null shortUrl
    public String getShortUrl() {
        return shortUrl != null ? shortUrl : "";
    }
    
    // Custom getter to handle null excerpt
    public String getExcerpt() {
        return excerpt != null ? excerpt : "";
    }

    @Column(unique = true)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String shortUrl;
    
    // Background image URL for article detail page hero/background
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String backgroundImageUrl;

    // 文章简介，用于列表页摘要展示
    @Column(columnDefinition = "TEXT")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String excerpt;

    // 单分类：一个 Article 只能属于一个 Category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "article_tag",
        joinColumns = @JoinColumn(name = "article_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;
}
