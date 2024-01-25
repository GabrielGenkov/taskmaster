package com.taskmaster.server.domain.comment.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentUserFlatDTO {
    private long id;
    private String content;
    private String firstName;
    private String lastName;
    private String username;
    private String email;

}
