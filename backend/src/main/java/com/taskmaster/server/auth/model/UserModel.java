package com.taskmaster.server.auth.model;

import com.taskmaster.server.model.BaseEntity;
import com.taskmaster.server.utils.validators.EmailValidator;
import com.taskmaster.server.utils.validators.UserUsernameValidator;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="users")
public class UserModel extends BaseEntity {
    private String username;
    @NotNull
    private String password;
    private String firstName;
    private String lastName;
    @EmailValidator
    private String email;
    @Builder.Default
    private boolean enabled = true;
    @Builder.Default
    private boolean locked = false;
    @Builder.Default
    private boolean accountExpired = false;
    @Builder.Default
    private boolean credentialsExpired = false;

    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleModel> roles;


}
