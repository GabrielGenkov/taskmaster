package com.taskmaster.server.domain.membership.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ProjectMembershipCompositeKey implements Serializable
{

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "project_id")
    private Long projectId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private ProjectUserRole role;

}
