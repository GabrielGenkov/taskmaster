package com.taskmaster.server.domain.task;

import com.taskmaster.server.auth.security.UserPrincipal;
import com.taskmaster.server.domain.task.dto.CreateEditTaskRequest;
import com.taskmaster.server.domain.task.dto.TaskDTO;
import com.taskmaster.server.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.taskmaster.server.config.AppConstants.API_BASE;

@RestController
@RequestMapping(path = API_BASE + "/v1")
public class TasksController {
    private final TasksService tasksService;

    public TasksController(TasksService tasksService) {

        this.tasksService = tasksService;
    }

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<ResponseDTO> createTask(
            @RequestBody
            CreateEditTaskRequest dto,
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable
            Long projectId) {
        tasksService.createTask(dto, principal, projectId);
        return new ResponseEntity<>(new ResponseDTO("Task created successfully"), HttpStatus.CREATED);
    }

    @GetMapping("/projects/{projectId}/tasks")
    public List<TaskDTO> getTaskByProjectId(@PathVariable Long projectId) {
        return tasksService.getTasksForProject(projectId);
    }


    @PutMapping("/projects/{projectId}/tasks/{taskId}")
    @PreAuthorize("@securityUtility.isTaskOwner(#taskId, principal) and @securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> editTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId,
            @RequestBody CreateEditTaskRequest updatedDto)
    {
        tasksService.editTask(taskId, updatedDto);
        return new ResponseEntity<>(new ResponseDTO("Task updated successfully!"), HttpStatus.OK);
    }

    @DeleteMapping("/projects/{projectId}/tasks/{taskId}")
    @PreAuthorize("@securityUtility.isTaskOwner(#taskId, principal) and @securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> deleteTask(@PathVariable Long projectId, @PathVariable Long taskId)
    {
        tasksService.deleteTaskById(taskId);
        return new ResponseEntity<>(new ResponseDTO("Task deleted successfully!"), HttpStatus.OK);
    }
}
