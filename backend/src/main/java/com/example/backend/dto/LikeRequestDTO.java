package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LikeRequestDTO {
    
    @NotNull(message = "Article ID cannot be null")
    private Long articleId;
    
    @NotBlank(message = "Device ID cannot be blank")
    private String deviceId;
}
