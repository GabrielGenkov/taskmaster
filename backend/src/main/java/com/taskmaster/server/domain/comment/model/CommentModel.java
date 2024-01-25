package com.taskmaster.server.domain.comment.model;


import javax.persistence.*;

import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.domain.task.model.TaskModel;
import com.taskmaster.server.model.BaseEntity;
import lombok.*;

import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class CommentModel extends BaseEntity{

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private TaskModel task;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserModel user;

}
