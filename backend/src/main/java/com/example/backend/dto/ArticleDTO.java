// backend/src/main/java/com/example/backend/dto/ArticleDTO.java
package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class ArticleDTO {
    // ID is not required when creating an article, but needed when returning
    private Integer id;

    @NotBlank(message = "Title cannot be empty")
    @Size(min = 2, max = 100, message = "Title length must be between 2-100 characters")
    private String title;

    @NotBlank(message = "Content cannot be empty")
    @Size(min = 10, message = "Content must be at least 10 characters")
    private String content;

    private String contentEng;  // English content (optional)

    @Size(max = 50, message = "Author name cannot exceed 50 characters")
    private String author;

    // Tags for the article
    private List<String> tags;

    // Category for the article
    private String category;

    // Excerpt for the article
    private String excerpt;

    // Background image for detail page
    private String backgroundImageUrl;

    // Additional fields for display
   
    private String createdAt;    // Formatted creation time
    private String preview;      // Article preview
    private int readingTime;     // Estimated reading time (minutes)
    private String shortUrl;
}