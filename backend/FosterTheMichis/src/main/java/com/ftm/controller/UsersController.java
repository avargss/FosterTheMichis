package com.ftm.controller;

import com.ftm.domain.Michi;
import com.ftm.domain.User;
import com.ftm.dto.FullUserDTO;
import com.ftm.config.SecurityConfig.LoginResponse;
import com.ftm.config.SecurityConfig.LoginDTO;
import com.ftm.exception.MichiNotFoundException;
import com.ftm.exception.UserNotFoundException;
import com.ftm.service.TokenBlacklistService;
import com.ftm.service.TokenService;
import com.ftm.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UsersController {

    private final UserService userService;
    private final TokenBlacklistService tokenBlacklistService;

    public UsersController(UserService userService, TokenBlacklistService tokenBlacklistService) {
        this.userService = userService;
        this.tokenBlacklistService = new TokenBlacklistService();
    }

    @GetMapping
    public List<User> all() {
        log.info("Accediendo a todos los usuarios");
        return this.userService.all();
    }

    @GetMapping("/{id}")
    public User one(@PathVariable("id") Long id) {
        return this.userService.one(id);
    }

    @PostMapping
    public User newUsers(@RequestBody User user) {
        return this.userService.save(user);
    }

    @PutMapping("/{id}")
    public User replaceUsers(@PathVariable("id") Long id, @RequestBody User user) {
        return this.userService.replace(id, user);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteUsers(@PathVariable("id") Long id) {
        this.userService.delete(id);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody FullUserDTO registerFullUserDTO) throws IOException {
        User registered = userService.register(registerFullUserDTO);
        return ResponseEntity.ok(registered);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginUserDTO) {
        LoginResponse loginResponse = userService.authenticate(loginUserDTO);

        return ResponseEntity.ok(loginResponse);
    }

    // Para pasar el token por header
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
        }
        // Aunque el SecurityFilterChain ya invoca el LogoutHandler,
        // este controller permite devolver un 200 explícito y borrar token en cliente.
        return ResponseEntity.ok().build();
    }

    // Para pasar el token por body
    /*@PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        if (token != null) {
            tokenBlacklistService.blacklistToken(token);
        }
        return ResponseEntity.ok().build();
    }*/
}