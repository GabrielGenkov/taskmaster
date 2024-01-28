package com.taskmaster.server.auth.model;

import com.taskmaster.server.model.BaseEntity;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tokens")
public class TokenModel extends BaseEntity {
	@Column(name = "email")
	private String email;
	@Column(name = "token")
	private String token;

}
