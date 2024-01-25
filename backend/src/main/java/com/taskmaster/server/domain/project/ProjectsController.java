package com.taskmaster.server.domain.project;

import com.taskmaster.server.auth.security.UserPrincipal;
import com.taskmaster.server.domain.project.dto.CreateEditProjectRequest;
import com.taskmaster.server.domain.project.dto.ProjectDTO;
import com.taskmaster.server.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.taskmaster.server.config.AppConstants.API_BASE;

@RestController
@RequestMapping(path = API_BASE + "/v1/projects")
public class ProjectsController {
    private final ProjectsService projectsService;

    public ProjectsController(ProjectsService projectsService)
    {
        this.projectsService = projectsService;
    }

    @GetMapping
    public List<ProjectDTO> getProjects()
    {
        return projectsService.getAllProjects();
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> createProject(
            @RequestBody
            CreateEditProjectRequest dto,
            @AuthenticationPrincipal UserPrincipal principal)
    {
        var projectId = projectsService.createProject(dto, principal);
        return new ResponseEntity<>(new ResponseDTO("Project created successfully", projectId), HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ResponseDTO> getProjectById(@PathVariable Long projectId)
    {
        return new ResponseEntity<>(new ResponseDTO(null, projectsService.getProject(projectId)), HttpStatus.OK);
    }


    @PutMapping("/{projectId}")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> editProject(
            @PathVariable Long projectId,
            @RequestBody
            CreateEditProjectRequest updatedDto)
    {
        projectsService.editProject(projectId, updatedDto);
        return new ResponseEntity<>(new ResponseDTO("Project updated successfully!"), HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> deleteProject(@PathVariable Long projectId)
    {
        projectsService.deleteProjectById(projectId);
        return new ResponseEntity<>(new ResponseDTO("Project deleted successfully!"), HttpStatus.OK);
    }
}
