package com.ftm.handler;

import com.ftm.service.TokenBlacklistService;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;

public class JwtBlacklistLogoutHandler implements LogoutHandler {

    private final TokenBlacklistService tokenBlacklistService;

    public JwtBlacklistLogoutHandler(TokenBlacklistService tokenBlacklistService) {
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        String token = request.getHeader("Authorization");
        System.out.println("Token agregado a la lista negra: " + token);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Elimina el prefijo "Bearer "
            tokenBlacklistService.blacklistToken(token); // Agrega el token a la lista negra
        }

        System.out.println("Sesión cerrada correctamente");
    }
}