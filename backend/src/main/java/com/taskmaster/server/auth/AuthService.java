package com.taskmaster.server.auth;

import com.taskmaster.server.auth.dto.SigninDTO;
import com.taskmaster.server.auth.dto.SigninResponse;
import com.taskmaster.server.auth.dto.SignupDTO;
import com.taskmaster.server.auth.model.RoleModel;
import com.taskmaster.server.auth.model.UserModel;
import com.taskmaster.server.auth.security.JwtTokenProvider;
import com.taskmaster.server.exception.RoleNotFoundException;
import com.taskmaster.server.exception.UserAlreadyExistsException;
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

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
                       UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper,
                       RoleRepository roleRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
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
        user.setEnabled(true);
        user.setLocked(false);
        user.setAccountExpired(false);
        user.setCredentialsExpired(false);

        userRepository.save(user);
    }
}
