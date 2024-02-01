package com.taskmaster.server.auth;

import com.taskmaster.server.auth.dto.SigninDTO;
import com.taskmaster.server.auth.dto.SignupDTO;
import com.taskmaster.server.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.taskmaster.server.config.AppConstants.API_BASE;

@RestController
@RequestMapping(path = API_BASE + "/v1")
public class AuthControllerV1 {

    private final AuthService authService;

    public AuthControllerV1(AuthService userService) {
        this.authService = userService;
    }

    @PostMapping("/auth/sign-in")
    public ResponseEntity<ResponseDTO> signIn(@Valid @RequestBody SigninDTO signinDto) {

        var signInResponse = authService.signInUser(signinDto);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        ResponseDTO
                                .builder()
                                .message("Logged in successfully!")
                                .content(signInResponse)
                                .build()
                );
    }

    @PostMapping("/auth/sign-up")
    public ResponseEntity<ResponseDTO> signUp(@Valid @RequestBody SignupDTO signupDto) {
        authService.signUpUser(signupDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ResponseDTO
                                .builder()
                                .message("Signed up successfully!")
                                .content(null)
                                .build()
                );
    }

    @GetMapping("/auth/{email}/verify")
    public ResponseEntity<ResponseDTO> signUp(@PathVariable String email,@RequestParam String token) {
        authService.verifyUser(email, token);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        ResponseDTO
                                .builder()
                                .message("Verified successfully!")
                                .content(null)
                                .build()
                );
    }
}