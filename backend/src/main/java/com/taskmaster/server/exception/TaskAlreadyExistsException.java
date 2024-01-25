package com.taskmaster.server.exception;

import org.springframework.http.HttpStatus;

public class TaskAlreadyExistsException extends ApiException {

    public TaskAlreadyExistsException(HttpStatus status, String message) {
        super(status, message);
    }
}
