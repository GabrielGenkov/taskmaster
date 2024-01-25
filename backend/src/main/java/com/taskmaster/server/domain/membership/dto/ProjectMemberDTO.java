package com.taskmaster.server.domain.membership.dto;

import com.taskmaster.server.domain.membership.model.ProjectUserRole;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMemberDTO
{
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private ProjectUserRole role;
}
