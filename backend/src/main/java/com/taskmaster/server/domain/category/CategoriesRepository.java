package com.taskmaster.server.domain.category;

import com.taskmaster.server.domain.category.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriesRepository extends JpaRepository<CategoryModel, Long>
{
    List<CategoryModel> findAllByProjectId(Long projectId);
}
