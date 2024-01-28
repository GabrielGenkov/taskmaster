package com.taskmaster.server.auth;

import com.taskmaster.server.auth.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByUsernameOrEmail(String username, String email);

    Optional<UserModel> findByEmail(String email);

    boolean existsByUsername(String usernameOrEmail);
    boolean existsByEmail(String usernameOrEmail);
    List<UserModel> findAllByUsernameIn(List<String> usernames);

    Optional<UserModel> findByUsername(String username);
}
