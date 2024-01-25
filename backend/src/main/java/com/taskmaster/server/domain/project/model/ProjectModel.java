package com.taskmaster.server.domain.project.model;

import javax.persistence.*;

import com.taskmaster.server.domain.category.model.CategoryModel;
import com.taskmaster.server.model.BaseEntity;
import lombok.*;

import java.util.Set;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "projects")
public class ProjectModel extends BaseEntity
{

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CategoryModel> categories;

    @Column(columnDefinition = "TEXT")
    private String description;

}
