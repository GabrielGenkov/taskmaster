package com.taskmaster.server.exception;

import org.springframework.http.HttpStatus;

public class RoleAlreadyExistsException extends ApiException {
    public RoleAlreadyExistsException(HttpStatus status, String message) {
        super(status, message);
    }
}
