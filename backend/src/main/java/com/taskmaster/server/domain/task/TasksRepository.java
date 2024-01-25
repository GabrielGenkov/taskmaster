package com.taskmaster.server.domain.task;

import com.taskmaster.server.domain.task.model.TaskModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TasksRepository extends JpaRepository<TaskModel, Long> {

    boolean existsByTitle(String title);

    List<TaskModel> findAllByProjectId(Long projectId);

    boolean existsByIdAndTaskOwnerId(final Long taskId, final Long userId);


}
