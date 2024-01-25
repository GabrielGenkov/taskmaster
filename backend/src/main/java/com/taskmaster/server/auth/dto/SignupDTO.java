package com.taskmaster.server.auth.dto;

import com.taskmaster.server.utils.validators.EmailValidator;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SignupDTO {
    private String username;
    @EmailValidator
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String firstName;
    private String lastName;
    private LocalDate birthday;
}
