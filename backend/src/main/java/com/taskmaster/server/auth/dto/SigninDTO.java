package com.taskmaster.server.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class SigninDTO {
    @NotBlank
    private String usernameOrEmail;
    @NotBlank
    private String password;
}
