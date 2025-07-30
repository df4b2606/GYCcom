package com.example.backend.common;
import lombok.Getter;

/**
 * @author grtsinry43
 * @date 2024/9/1 15:44
 * @description 少年负壮气，奋烈自有时！
 */
@Getter
public enum ErrorCode {
    SUCCESS(0, "Success"),
    PARAMS_ERROR(400, "Parameter error"),
    NOT_LOGIN(401, "Not logged in or login expired"),
    UNAUTHORIZED(403, "You don't have permission to access this resource"),
    NOT_FOUND(404, "Requested resource not found"),
    SERVER_ERROR(500, "Internal server error"),
    OPERATION_ERROR(501, "Operation failed");

    private final int code;
    private final String msg;

    ErrorCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getMessage() {
        return msg;
    }

}
