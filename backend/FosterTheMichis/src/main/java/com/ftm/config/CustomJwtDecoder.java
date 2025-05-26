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
public class CustomJwtDecoder implements JwtDecoder {
    private final JwtDecoder delegate;
    private final TokenBlacklistService blacklistService;

    public CustomJwtDecoder(JwtDecoder delegate, TokenBlacklistService blacklistService) {
        this.delegate = delegate;
        this.blacklistService = blacklistService;
    }

    @Override
    public Jwt decode(String token) throws JwtException {
        if (blacklistService.isRevoked(token)) {

            throw new JwtException("Token está en la lista negra");
        }
        return delegate.decode(token);
    }
}
