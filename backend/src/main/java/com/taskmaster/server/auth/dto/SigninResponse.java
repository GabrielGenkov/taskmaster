package com.taskmaster.server.auth.dto;

import com.taskmaster.server.auth.RoleEnum;
import lombok.*;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SigninResponse
{
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private Set<RoleEnum> roles;
    private String accessToken;
}
