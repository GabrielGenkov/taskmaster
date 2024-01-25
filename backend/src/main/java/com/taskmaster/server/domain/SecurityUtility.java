package com.taskmaster.server.domain;

import com.taskmaster.server.auth.UserRepository;
import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.auth.security.UserPrincipal;
import com.taskmaster.server.domain.comment.CommentsRepository;
import com.taskmaster.server.domain.membership.ProjectMembershipRepository;
import com.taskmaster.server.domain.membership.model.ProjectUserRole;
import com.taskmaster.server.domain.task.TasksRepository;
import com.taskmaster.server.exception.NotAuthorizedException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUtility
{
    private final ProjectMembershipRepository projectMembershipRepository;
    private final UserRepository userRepository;
    private final CommentsRepository commentsRepository;
    private final TasksRepository tasksRepository;

    public SecurityUtility(ProjectMembershipRepository projectMembershipRepository, UserRepository userRepository, CommentsRepository commentsRepository,TasksRepository tasksRepository)
    {
        this.projectMembershipRepository = projectMembershipRepository;
        this.userRepository = userRepository;
        this.commentsRepository = commentsRepository;
        this.tasksRepository = tasksRepository;
    }

    public boolean isProjectOwner(final Long projectId, UserPrincipal userPrincipal)
    {
        UserModel loggedUser = userRepository
                .findByUsernameOrEmail(userPrincipal.getUsername(), userPrincipal.getUsername())
                .orElseThrow(NotAuthorizedException::new);
        return projectMembershipRepository.existsByProjectIdAndUserIdAndIdRole(projectId, loggedUser.getId(),
                                                                               ProjectUserRole.OWNER);
    }

    public boolean isCommentOwner(final Long commentId, UserPrincipal userPrincipal)
    {
        UserModel loggedUser = userRepository
                .findByUsernameOrEmail(userPrincipal.getUsername(), userPrincipal.getUsername())
                .orElseThrow(NotAuthorizedException::new);
        return commentsRepository.existsByIdAndUserId(commentId, loggedUser.getId());
    }

    public boolean isTaskOwner(final Long taskId, UserPrincipal userPrincipal)
    {
        UserModel loggedUser = userRepository
                .findByUsernameOrEmail(userPrincipal.getUsername(), userPrincipal.getUsername())
                .orElseThrow(NotAuthorizedException::new);
        return tasksRepository.existsByIdAndTaskOwnerId(taskId, loggedUser.getId());
    }
}
