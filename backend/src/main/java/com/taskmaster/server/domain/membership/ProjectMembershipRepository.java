package com.taskmaster.server.domain.membership;

import com.taskmaster.server.domain.membership.dto.ProjectMemberDTO;
import com.taskmaster.server.domain.membership.model.ProjectMembershipModel;
import com.taskmaster.server.domain.membership.model.ProjectUserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembershipModel, Long>
{
    boolean existsByProjectIdAndUserIdAndIdRole(final Long projectId, final Long userId, final ProjectUserRole role);
    void deleteByProjectIdAndUserId(final Long projectId, final Long userId);

    void deleteAllByProjectId(final Long projectId);
    @Query("SELECT new com.taskmaster.server.domain.membership.dto.ProjectMemberDTO(u.firstName, " +
            "u.lastName, u.username, u.email, p.id.role) " +
            "FROM ProjectMembershipModel p JOIN p.user u " +
            "WHERE p.project.id = :projectId")
    List<ProjectMemberDTO> findProjectMembers(Long projectId);
}
