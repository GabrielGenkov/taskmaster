package com.taskmaster.server.domain.membership;

import com.taskmaster.server.domain.membership.dto.ProjectMemberDTO;
import com.taskmaster.server.domain.membership.model.ProjectUserRole;
import com.taskmaster.server.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

import static com.taskmaster.server.config.AppConstants.API_BASE;

@RequestMapping(path = API_BASE + "/v1")
@RestController
public class ProjectMembershipController
{
    private final ProjectMembershipService projectMembershipService;

    public ProjectMembershipController(ProjectMembershipService projectMembershipService)
    {
        this.projectMembershipService = projectMembershipService;
    }

    //members should be visible by all users
    @GetMapping("/projects/{projectId}/members")
    public List<ProjectMemberDTO> getProjectMembers(@PathVariable Long projectId)
    {
        return projectMembershipService.getProjectMembers(projectId);
    }

    @GetMapping("/projects/roles")
    public List<ProjectUserRole> getProjectRoles()
    {
        return Arrays.stream(ProjectUserRole.values()).toList();
    }

    @PostMapping("/projects/{projectId}/members")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> addProjectMember(@PathVariable Long projectId,
                                           @RequestBody AddProjectMemberRequest request)
    {
        projectMembershipService.addProjectMember(projectId, request.email(), request.role());
        return new ResponseEntity<>(new ResponseDTO("Project member added successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/projects/{projectId}/members/{userId}")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> editProjectMemberRole(@PathVariable Long projectId,
                                      @PathVariable Long userId,
                                      @RequestBody EditProjectMemberRequest request)
    {
        projectMembershipService.editProjectMemberRole(projectId, userId, request.role());
        return new ResponseEntity<>(new ResponseDTO("Project member edited successfully"), HttpStatus.OK);

    }

    @DeleteMapping("/projects/{projectId}/members/{userId}")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> removeProjectMember(@PathVariable Long projectId,
                                    @PathVariable Long userId)
    {
        projectMembershipService.removeProjectMember(projectId, userId);
        return new ResponseEntity<>(new ResponseDTO("Project member removed successfully"), HttpStatus.OK);
    }

    public record AddProjectMemberRequest(String email, ProjectUserRole role)
    {
    }

    public record EditProjectMemberRequest(ProjectUserRole role)
    {
    }
}
