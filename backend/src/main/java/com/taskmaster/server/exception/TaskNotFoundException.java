package com.taskmaster.server.exception;

import org.springframework.http.HttpStatus;

public class TaskNotFoundException extends ApiException{
    public TaskNotFoundException()
    {
        super(HttpStatus.NOT_FOUND, "Task not found!");
    }
}
