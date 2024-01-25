package com.taskmaster.server.domain.membership;

import com.taskmaster.server.auth.UserRepository;
import com.taskmaster.server.domain.project.ProjectsRepository;
import com.taskmaster.server.domain.membership.dto.ProjectMemberDTO;
import com.taskmaster.server.domain.membership.model.ProjectMembershipModel;
import com.taskmaster.server.domain.membership.model.ProjectMembershipCompositeKey;
import com.taskmaster.server.domain.membership.model.ProjectUserRole;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProjectMembershipService
{
    private final ProjectMembershipRepository projectMembershipRepository;
    private final UserRepository userRepository;
    private final ProjectsRepository projectsRepository;

    public ProjectMembershipService(ProjectMembershipRepository projectMembershipRepository,
                                    UserRepository userRepository, ProjectsRepository projectsRepository)
    {
        this.projectMembershipRepository = projectMembershipRepository;
        this.userRepository = userRepository;
        this.projectsRepository = projectsRepository;
    }

    public List<ProjectMemberDTO> getProjectMembers(final long projectId)
    {
        return projectMembershipRepository.findProjectMembers(projectId);
    }

    public void addProjectMember(final long projectId, final String userEmail, final ProjectUserRole role)
    {
        final var user = userRepository.findByUsernameOrEmail(userEmail, userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        final var project = projectsRepository.findById(projectId)
                                              .orElseThrow(() -> new RuntimeException("Project not found"));
        var key = ProjectMembershipCompositeKey.builder()
                                               .projectId(projectId)
                                               .userId(user.getId())
                                               .role(role)
                                               .build();
        var projectMembership = ProjectMembershipModel.builder()
                                                      .project(project)
                                                      .user(user)
                                                      .id(key)
                                                      .build();
        projectMembershipRepository.save(projectMembership);
    }

    @Transactional
    public void editProjectMemberRole(final long projectId, final long userId, final ProjectUserRole role)
    {
        //delete and create the role for the user
        projectMembershipRepository.deleteByProjectIdAndUserId(projectId, userId);
        final var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        addProjectMember(projectId, user.getEmail(), role);
    }

    @Transactional
    public void removeProjectMember(final long projectId, final long userId)
    {
        projectMembershipRepository.deleteByProjectIdAndUserId(projectId, userId);
    }
}
