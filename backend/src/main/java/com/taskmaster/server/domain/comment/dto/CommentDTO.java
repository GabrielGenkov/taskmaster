package com.taskmaster.server.domain.comment.dto;

import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.dto.UserDTO;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private long id;
    private String content;
    private UserDTO commentOwner;
}
