package com.taskmaster.server.domain.project;

import com.taskmaster.server.domain.project.model.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectsRepository extends JpaRepository<ProjectModel, Long> {

    Optional<ProjectModel> findByName(String name);
    boolean existsByName(String name);

}
