package com.altofy.server.config;

import com.altofy.server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Bean
    public JwtUtil jwtUtil(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-time:86400000}") long expMs
    ) {
        return new JwtUtil(secret, expMs);
    }
}