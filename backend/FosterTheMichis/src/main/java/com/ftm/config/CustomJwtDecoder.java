package com.ftm.config;

import com.ftm.service.TokenBlacklistService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

@Component
@Primary
@AllArgsConstructor
public class CustomJwtDecoder implements JwtDecoder {

    private final JwtDecoder delegate;
    private final TokenBlacklistService tokenBlacklistService;

    @Override
    public Jwt decode(String token) throws JwtException {
        if (tokenBlacklistService.isRevoked(token)) {
            throw new JwtException("Token has been revoked");
        }
        return delegate.decode(token);
    }
}
