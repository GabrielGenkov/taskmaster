package com.taskmaster.server.domain.project;

import com.taskmaster.server.auth.UserRepository;
import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.auth.security.UserPrincipal;
import com.taskmaster.server.domain.membership.ProjectMembershipRepository;
import com.taskmaster.server.domain.membership.ProjectMembershipService;
import com.taskmaster.server.domain.membership.model.ProjectUserRole;
import com.taskmaster.server.domain.project.dto.CreateEditProjectRequest;
import com.taskmaster.server.domain.project.dto.ProjectDTO;
import com.taskmaster.server.domain.project.model.ProjectModel;
import com.taskmaster.server.exception.NotAuthorizedException;
import com.taskmaster.server.exception.ProjectAlreadyExistsException;
import com.taskmaster.server.exception.ProjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProjectsService {
    private final ProjectsRepository projectsRepository;
    private final ModelMapper modelMapper;
    private final ProjectMembershipService projectMembershipService;
    private final UserRepository userRepository;
    private final ProjectMembershipRepository projectMembershipRepository;

    public ProjectsService(ProjectsRepository projectsRepository,
                           ModelMapper modelMapper,
                           ProjectMembershipService projectMembershipService,
                           UserRepository userRepository,
                           final ProjectMembershipRepository projectMembershipRepository)
    {
        this.projectsRepository = projectsRepository;
        this.modelMapper = modelMapper;
        this.projectMembershipService = projectMembershipService;
        this.userRepository = userRepository;
        this.projectMembershipRepository = projectMembershipRepository;
    }

    public List<ProjectDTO> getAllProjects()
    {
        //under the assumption that users can view all projects but cannot create tasks if not members
        return projectsRepository.findAll().stream().map(model -> modelMapper.map(model, ProjectDTO.class)).toList();
    }

    public ProjectDTO getProject(long projectId)
    {
        var model = projectsRepository.findById(projectId).stream().findFirst()
                                      .orElseThrow(ProjectNotFoundException::new);
        return modelMapper.map(model, ProjectDTO.class);
    }

    @Transactional
    public Long createProject(CreateEditProjectRequest dto, UserPrincipal userPrincipal)
    {
        UserModel loggedUser = userRepository
                .findByUsernameOrEmail(userPrincipal.getUsername(), userPrincipal.getUsername())
                .orElseThrow(NotAuthorizedException::new);
        if (dto.name() != null && projectsRepository.existsByName(dto.name()))
        {
            throw new ProjectAlreadyExistsException(HttpStatus.BAD_REQUEST,
                                                    "Project with name '" + dto.name() + "' already exists");
        }

        var model = ProjectModel.builder()
                                .name(dto.name())
                                .description(dto.description())
                                .build();
        var savedModel = projectsRepository.save(model);
        projectMembershipService.addProjectMember(savedModel.getId(), loggedUser.getEmail(), ProjectUserRole.OWNER);
        ProjectModel projectModel = projectsRepository.save(model);
        return projectModel.getId();
    }

    @Transactional
    public void editProject(long projectId, CreateEditProjectRequest updatedDto)
    {
        ProjectModel project = projectsRepository.findById(projectId)
                                                 .orElseThrow(ProjectNotFoundException::new);
        project.setName(updatedDto.name());
        project.setDescription(updatedDto.description());
    }

    @Transactional
    public void deleteProjectById(long projectId)
    {
        projectMembershipRepository.deleteAllByProjectId(projectId);
        projectsRepository.deleteById(projectId);
    }
}
