package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TagDTO {
    private Long id;
    
    @NotBlank(message = "Tag name cannot be empty")
    @Size(min = 1, max = 50, message = "Tag name length must be between 1-50 characters")
    private String name;
    
    @Size(max = 100, message = "Tag description cannot exceed 100 characters")
    private String description;
    
    private String color;
    
    private Boolean isActive = true;
    
    private Integer sortOrder = 0;
} 