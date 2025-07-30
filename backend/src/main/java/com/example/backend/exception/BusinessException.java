package com.example.backend.exception;

import com.example.backend.common.ErrorCode;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException{
    private final ErrorCode code;
    private final String message;

    public BusinessException(ErrorCode code, String message) {
        this.code = code;
        this.message = message;
    }

    
}
