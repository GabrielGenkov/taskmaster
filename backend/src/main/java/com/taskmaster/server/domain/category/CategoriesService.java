package com.taskmaster.server.domain.category;

import com.taskmaster.server.domain.category.dto.CategoryDTO;
import com.taskmaster.server.domain.category.model.CategoryModel;
import com.taskmaster.server.domain.project.ProjectsRepository;
import com.taskmaster.server.exception.ProjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CategoriesService
{
    private final CategoriesRepository categoriesRepository;
    private final ProjectsRepository projectsRepository;
    private final ModelMapper modelMapper;

    public CategoriesService(CategoriesRepository categoriesRepository,
                             ProjectsRepository projectsRepository,
                             ModelMapper modelMapper)
    {
        this.categoriesRepository = categoriesRepository;
        this.projectsRepository = projectsRepository;
        this.modelMapper = modelMapper;
    }

    public List<CategoryDTO> getAllCategoriesForProject(final Long projectId)
    {
        var categories = categoriesRepository.findAllByProjectId(projectId);
        return categories.stream().map(category -> modelMapper.map(category, CategoryDTO.class)).toList();
    }

    @Transactional
    public Long addCategoryToProject(final Long projectId, final String name)
    {
        var project = projectsRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        var category = CategoryModel.builder()
                                    .name(name)
                                    .project(project)
                                    .build();
        project.getCategories().add(category);
        var savedCategory = categoriesRepository.save(category);
        return savedCategory.getId();
    }

    @Transactional
    public void deleteProjectCategory(final long projectId, final Long categoryId)
    {
        var category = categoriesRepository.findById(categoryId)
                                           .orElseThrow(() -> new RuntimeException("Category not found"));
        projectsRepository.findById(projectId)
                          .orElseThrow(ProjectNotFoundException::new)
                          .getCategories()
                          .remove(category);
        categoriesRepository.deleteById(categoryId);
    }

    @Transactional
    public void updateProjectCategory(final Long categoryId, final String name)
    {
        var category = categoriesRepository.findById(categoryId)
                                           .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(name);
    }

}
