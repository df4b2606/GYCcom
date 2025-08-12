package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Entity
@Table(name = "tag")
@Data
public class Tag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String name;
    
    @Column(length = 100)
    private String description;
    
    @Column(length = 20)
    private String color;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private Integer sortOrder = 0;
    
    @Column(nullable = false)
    private Integer usageCount = 0;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Article> articles;
    
    /**
     * Generate a random color
     * @return Hexadecimal color value, e.g. "#FF6B6B"
     */
    private String generateRandomColor() {
        Random random = new Random();
        // Generate soft colors to avoid overly bright ones
        int r = 100 + random.nextInt(156); // 100-255
        int g = 100 + random.nextInt(156); // 100-255
        int b = 100 + random.nextInt(156); // 100-255
        
        return String.format("#%02X%02X%02X", r, g, b);
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        
        // If color is empty, randomly assign a color
        if (color == null || color.trim().isEmpty()) {
            color = generateRandomColor();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
