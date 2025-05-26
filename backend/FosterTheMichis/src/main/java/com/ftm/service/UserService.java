package com.ftm.service;

import com.ftm.config.SecurityConfig;
import com.ftm.domain.User;
import com.ftm.dto.FullUserDTO;
import com.ftm.exception.UserNotFoundException;
import com.ftm.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public List<User> all() {
        return this.userRepository.findAll();
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }

    public User one(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User replace(Long id, User user) {
        return this.userRepository.findById(id).map(u -> (id.equals(user.getId()) ?
                        this.userRepository.save(user) : null))
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void delete(Long id) {
        this.userRepository.findById(id).map(u -> {
                    this.userRepository.delete(u);
                    return u;
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User register(FullUserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());
        // Ciframos la contraseña antes de guardar:
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        // Convertimos el String a tu enum Roles (asegúrate de que coincide):
        user.setRole(User.role.valueOf(dto.getRole()));

        return userRepository.save(user);
    }

    // Se llama al método de esta forma porque se encuentra en la clase SecurityConfig
    public SecurityConfig.LoginResponse authenticate(SecurityConfig.LoginDTO input) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.email(), input.password()));
        User user = (User) authentication.getPrincipal();
        String token = tokenService.generateToken(authentication, null); // Genera un nuevo token, el segundo parámetro es el token actual (null en este caso)
        return new SecurityConfig.LoginResponse(token, user.getName(), user.getEmail());
    }
}
