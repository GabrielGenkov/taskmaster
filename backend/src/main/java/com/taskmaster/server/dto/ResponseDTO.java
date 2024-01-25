package com.taskmaster.server.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    private String message;
    private Object content;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    public ResponseDTO(final String message, final Object content)
    {
        this.message = message;
        this.content = content;
        this. timestamp = LocalDateTime.now();
    }

    public ResponseDTO(final String message)
    {
        this.message = message;
        this.content = null;
        this. timestamp = LocalDateTime.now();
    }
}
