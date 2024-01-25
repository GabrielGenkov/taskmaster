package com.taskmaster.server.domain.comment;

import com.taskmaster.server.auth.UserRepository;
import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.auth.security.UserPrincipal;
import com.taskmaster.server.domain.comment.dto.CommentDTO;
import com.taskmaster.server.domain.comment.dto.CommentUserFlatDTO;
import com.taskmaster.server.domain.comment.model.CommentModel;
import com.taskmaster.server.domain.task.TasksRepository;
import com.taskmaster.server.dto.UserDTO;
import com.taskmaster.server.exception.NotAuthorizedException;
import com.taskmaster.server.exception.TaskNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final TasksRepository tasksRepository;
    private final UserRepository userRepository;

    public CommentsService(CommentsRepository commentsRepository,
                           TasksRepository tasksRepository,
                           UserRepository userRepository)
    {
        this.commentsRepository = commentsRepository;
        this.tasksRepository = tasksRepository;
        this.userRepository = userRepository;
    }

    public List<CommentDTO> getAllCommentsForTask(final Long taskId)
    {
        List<CommentUserFlatDTO> flatDTOs = commentsRepository.findAllByTaskId(taskId);
        return flatDTOs.stream().map(flatDTO -> {
            UserDTO user = new UserDTO(flatDTO.getFirstName(), flatDTO.getLastName(),
                                       flatDTO.getUsername(), flatDTO.getEmail());
            return new CommentDTO(flatDTO.getId(), flatDTO.getContent(), user);
        }).toList();
    }

    @Transactional
    public void addCommentToTask(final Long taskId, final String content, final UserPrincipal userPrincipal)
    {
        UserModel loggedUser = userRepository
                .findByUsernameOrEmail(userPrincipal.getUsername(), userPrincipal.getUsername())
                .orElseThrow(NotAuthorizedException::new);
        var task = tasksRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
        var comment = CommentModel.builder()
                .content(content)
                .task(task)
                .user(loggedUser)
                .build();
        task.getComments().add(comment);
        commentsRepository.save(comment);
    }

    @Transactional
    public void deleteTaskComment(final long taskId, final Long commentId)
    {
        var comment = commentsRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        tasksRepository.findById(taskId)
                .orElseThrow(TaskNotFoundException::new)
                .getComments()
                .remove(comment);
        commentsRepository.deleteById(commentId);
    }

    @Transactional
    public void updateTaskComment(final Long commentId, final String content)
    {
        var comment = commentsRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setContent(content);
    }
}
