package com.taskmaster.server.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends ApiException{
    public UserNotFoundException(HttpStatus status, String message) {
        super(status, message);
    }
}
