package com.taskmaster.server.domain.membership.model;

import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.domain.project.model.ProjectModel;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "project_membership")
public class ProjectMembershipModel
{

    @EmbeddedId
    private ProjectMembershipCompositeKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private ProjectModel project;

}
