package com.altofy.server.service;

import com.altofy.server.common.Role;
import com.altofy.server.domain.User;
import com.altofy.server.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(String email, String rawPassword, Role role) {
        final String normalized = email.trim().toLowerCase();
        User u = new User(null, normalized);
        u.setPassword(passwordEncoder.encode(rawPassword));
        u.setRole(role == null ? Role.USER : role);
        u.setCreated(OffsetDateTime.now());
        return userRepository.save(u);
    }

    public boolean verifyPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

}
