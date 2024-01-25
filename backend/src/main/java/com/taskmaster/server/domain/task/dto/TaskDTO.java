package com.taskmaster.server.domain.task.dto;

import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.dto.UserDTO;
import lombok.*;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private long id;
    private String title;
    private String description;
    private List<UserDTO> assignees;
    private LocalDate dueDate;
    private UserDTO taskOwner;
    private long categoryId;
}
