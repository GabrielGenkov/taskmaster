package com.taskmaster.server.domain.task.model;

import javax.persistence.*;

import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.domain.category.model.CategoryModel;
import com.taskmaster.server.domain.comment.model.CommentModel;
import com.taskmaster.server.domain.project.model.ProjectModel;
import com.taskmaster.server.model.BaseEntity;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class TaskModel extends BaseEntity{

    @Column(unique = true, nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectModel project;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommentModel> comments;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<UserModel> assignees;

    @Column(name="due_date")
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name="category_id")
    private CategoryModel category;


    @JoinColumn(name="task_owner_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private UserModel taskOwner;

}
