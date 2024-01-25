package com.taskmaster.server.domain.category.model;

import com.taskmaster.server.domain.project.model.ProjectModel;
import com.taskmaster.server.model.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "project_categories")
public class CategoryModel extends BaseEntity
{
    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectModel project;
}