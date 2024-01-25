package com.taskmaster.server.exception;

import org.springframework.http.HttpStatus;

public class ProjectAlreadyExistsException extends ApiException {

    public ProjectAlreadyExistsException(HttpStatus status, String message) {
        super(status, message);
    }
}

