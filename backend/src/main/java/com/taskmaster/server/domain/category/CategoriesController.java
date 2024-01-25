package com.taskmaster.server.domain.category;

import com.taskmaster.server.domain.category.dto.CategoryDTO;
import com.taskmaster.server.dto.ResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.taskmaster.server.config.AppConstants.API_BASE;

@RestController
@RequestMapping(path = API_BASE + "/v1")
public class CategoriesController
{
    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService)
    {
        this.categoriesService = categoriesService;
    }

    @GetMapping("/projects/{projectId}/categories")
    public List<CategoryDTO> getAllCategoriesForProject(@PathVariable(value = "projectId") Long projectId)
    {
        return categoriesService.getAllCategoriesForProject(projectId);
    }

    @PostMapping("/projects/{projectId}/categories")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> addCategoryToProject(
            @PathVariable(value = "projectId") Long projectId,
            @RequestBody CreateUpdateCategoryRequest request)
    {
        var categoryId = categoriesService.addCategoryToProject(projectId, request.name());
        return new ResponseEntity<>(new ResponseDTO("Category created successfully!!", categoryId), null, 201);
    }

    @DeleteMapping("/projects/{projectId}/categories/{categoryId}")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> deleteProjectCategory(@PathVariable(value = "projectId") Long projectId,
                                      @PathVariable(value = "categoryId") Long categoryId)
    {
        categoriesService.deleteProjectCategory(projectId, categoryId);
        return new ResponseEntity<>(new ResponseDTO("Category deleted successfully!!"), null, 200);
    }

    @PutMapping("/projects/{projectId}/categories/{categoryId}")
    @PreAuthorize("@securityUtility.isProjectOwner(#projectId, principal)")
    public ResponseEntity<ResponseDTO> updateProjectCategory(@PathVariable(value = "projectId") Long projectId,
                                      @PathVariable(value = "categoryId") Long categoryId,
                                      @RequestBody CreateUpdateCategoryRequest request)
    {
        categoriesService.updateProjectCategory(categoryId, request.name());
        return new ResponseEntity<>(new ResponseDTO("Category updated successfully!!"), null, 200);
    }

    public record CreateUpdateCategoryRequest(String name)
    {
    }
}
