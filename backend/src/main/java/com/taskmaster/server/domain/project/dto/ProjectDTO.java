package com.taskmaster.server.domain.project.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private int id;
    private String name;
    private String description;
}
