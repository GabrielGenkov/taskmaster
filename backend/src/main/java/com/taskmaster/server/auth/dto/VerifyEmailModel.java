package com.taskmaster.server.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
public @Data class VerifyEmailModel {
    private String email;
    private String username;
    private String token;

}
