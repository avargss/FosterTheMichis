package com.ftm.service;

import com.ftm.config.JwtConfig;
import com.ftm.domain.User;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@AllArgsConstructor
public class TokenService {

    private final JwtConfig jwtConfig;
    private final TokenBlacklistService blacklistService;

    public String generateToken(Authentication authentication, String currentToken) {

        if (currentToken != null) {
            blacklistService.blacklistToken(currentToken); // Invalida el token actual
        }

        var header = new JWSHeader.Builder(jwtConfig.getAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();
        Instant now = Instant.now();

        var expirationMillis = jwtConfig.getJwtExpiration();

        var roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var builder = new JWTClaimsSet.Builder()
                .subject(((User) authentication.getPrincipal()).getUsername())
                .issuer("http://localhost:8080")
                .issueTime(Date.from(now))
                .expirationTime(Date.from(now.plus(1, java.time.temporal.ChronoUnit.HOURS)))
                .claim("roles", roles); // Añade los roles al payload

        User user = (User) authentication.getPrincipal();
        builder.claim("id", user.getId());
        builder.claim("name", user.getName());
        builder.claim("email", user.getEmail());
        builder.claim("role", user.getRole().name()); // Añade el rol del usuario al payload

        var claims = builder.build();

        var key = jwtConfig.getSecretKey();

        var jwt = new SignedJWT(header, claims);

        try {
            var signer = new MACSigner(key);
            jwt.sign(signer);
        } catch (JOSEException e) {
            throw new RuntimeException("Error generating JWT Token", e);
        }
        return jwt.serialize();
    }

}
