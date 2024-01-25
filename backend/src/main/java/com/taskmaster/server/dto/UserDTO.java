package com.taskmaster.server.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO
{
    private String firstName;
    private String lastName;
    private String username;
    private String email;
}
