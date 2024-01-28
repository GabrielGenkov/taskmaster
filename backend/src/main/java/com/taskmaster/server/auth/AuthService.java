package com.taskmaster.server.auth;

import com.taskmaster.server.auth.dto.*;
import com.taskmaster.server.auth.model.*;
import com.taskmaster.server.auth.security.JwtTokenProvider;
import com.taskmaster.server.domain.mail.MailService;
import com.taskmaster.server.exception.RoleNotFoundException;
import com.taskmaster.server.exception.UserAlreadyExistsException;
import com.taskmaster.server.utils.TokenGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final TokenRepository tokenRepository;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
                       UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper,
                       RoleRepository roleRepository, MailService mailService, TokenRepository tokenRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
        this.mailService = mailService;
        this.tokenRepository = tokenRepository;
    }

    public SigninResponse signInUser(SigninDTO signinDto)
    {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signinDto.getUsernameOrEmail(), signinDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateJwtToken(authentication);
        UserModel user = userRepository.findByUsernameOrEmail(signinDto.getUsernameOrEmail(),
                signinDto.getUsernameOrEmail()).orElseThrow(() -> new RuntimeException("User not found!"));

        return SigninResponse.builder()
                             .accessToken(token)
                             .email(user.getEmail())
                             .username(user.getUsername())
                             .roles(user.getRoles().stream().map(RoleModel::getRoleName).collect(Collectors.toSet()))
                             .firstName(user.getFirstName())
                             .lastName(user.getLastName())
                             .build();
    }

    @Transactional
    public void signUpUser(SignupDTO signupDto) {
        //check if username already exist
        if (userRepository.existsByUsername(signupDto.getUsername())) {
            throw new UserAlreadyExistsException(HttpStatus.BAD_REQUEST, "User with such username already exists!");
        }

        //check if email already exists
        if (userRepository.existsByEmail(signupDto.getEmail())) {
            throw new UserAlreadyExistsException(HttpStatus.BAD_REQUEST, "User with such email already exists!");
        }

        RoleModel role = roleRepository.findByRoleName(RoleEnum.USER).orElseThrow(()
                -> new RoleNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR, "No Default User Role in the database"));

        //create new user
        UserModel user = modelMapper.map(signupDto, UserModel.class);
        user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
        user.setRoles(Set.of(role));
        user.setVerified(false);
        user.setEnabled(true);
        user.setLocked(false);
        user.setAccountExpired(false);
        user.setCredentialsExpired(false);

        String token = TokenGenerator.generateToken();
        TokenModel verificationToken = new TokenModel(user.getEmail(), token);

        tokenRepository.save(verificationToken);
        userRepository.save(user);

        try {
            this.mailService.send(user.getEmail(), "Verify your email", "email-profile-verification.ftlh",
                new VerifyEmailModel(user.getEmail(), user.getUsername(), token)
            );
        } catch (Exception e) {
            throw new RuntimeException("Error sending email", e);
        }
    }

    public void verifyUser(String email, String token) {
        TokenModel verificationToken = tokenRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Token not found!"));
        if (!verificationToken.getToken().equals(token)) {
            throw new RuntimeException("Invalid token!");
        }

        UserModel user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found!"));
        user.setVerified(true);
        userRepository.save(user);
    }
}
