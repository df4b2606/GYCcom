package com.example.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeResponseDTO {
    
    private Long articleId;
    private String deviceId;
    private boolean isLiked;
    private long likeCount;
    private String message;
}
