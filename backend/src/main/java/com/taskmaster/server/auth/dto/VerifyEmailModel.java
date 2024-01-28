package com.taskmaster.server.auth.dto;

public record VerifyEmailModel(String email, String username, String token) {

}
