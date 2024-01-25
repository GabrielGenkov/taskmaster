package com.taskmaster.server.domain.comment;

import com.taskmaster.server.domain.comment.dto.CommentDTO;
import com.taskmaster.server.domain.comment.dto.CommentUserFlatDTO;
import com.taskmaster.server.domain.comment.model.CommentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
public interface CommentsRepository extends JpaRepository<CommentModel, Long>{
    boolean existsByIdAndUserId(final Long commentId, final Long userId);

    @Query("SELECT new com.taskmaster.server.domain.comment.dto.CommentUserFlatDTO(c.id, c.content, " +
            "u.firstName, u.lastName, u.username, u.email) " +
            "FROM CommentModel c " +
            "JOIN c.user u " +
            "WHERE c.task.id = :taskId")
    List<CommentUserFlatDTO> findAllByTaskId(Long taskId);

}
