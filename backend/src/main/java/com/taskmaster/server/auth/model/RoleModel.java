package com.taskmaster.server.auth.model;

import com.taskmaster.server.model.BaseEntity;
import com.taskmaster.server.auth.RoleEnum;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class RoleModel extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private RoleEnum roleName;
}
