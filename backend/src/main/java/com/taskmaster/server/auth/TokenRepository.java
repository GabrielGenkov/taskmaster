package com.taskmaster.server.auth;

import com.taskmaster.server.auth.model.TokenModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokenModel, Long> {
	Optional<TokenModel> findByEmail(String email);
	Optional<TokenModel> findByToken(String token);
}
