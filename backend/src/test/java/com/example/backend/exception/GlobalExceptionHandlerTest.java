package com.example.backend.exception;

import com.example.backend.common.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    @DisplayName("handleBusinessException should map to status code and body")
    void testBusinessException() {
        BusinessException ex = new BusinessException(ErrorCode.NOT_FOUND, "missing");
        ResponseEntity<Map<String, Object>> resp = handler.handleBusinessException(ex);
        Map<String, Object> body = resp.getBody();
        assertNotNull(body);
        assertEquals(ErrorCode.NOT_FOUND.getCode(), resp.getStatusCode().value());
        assertEquals(ErrorCode.NOT_FOUND.getCode(), body.get("code"));
        assertEquals("missing", body.get("message"));
    }

    @Test
    @DisplayName("handleValidationExceptions should aggregate field errors")
    void testValidationErrors() {
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(new Object(), "articleDTO");
        org.springframework.validation.FieldError fieldError = new org.springframework.validation.FieldError(
                "articleDTO", "title", "Title cannot be empty");
        bindingResult.addError(fieldError);
        org.springframework.core.MethodParameter methodParameter = org.mockito.Mockito.mock(org.springframework.core.MethodParameter.class);
        MethodArgumentNotValidException ex = new MethodArgumentNotValidException(methodParameter, bindingResult);

        ResponseEntity<Map<String, Object>> resp = handler.handleValidationExceptions(ex);
        Map<String, Object> body = resp.getBody();
        assertNotNull(body);
        assertEquals(400, resp.getStatusCode().value());
        assertEquals("Validation failed", body.get("message"));
        assertTrue(body.containsKey("errors"));
    }
}


