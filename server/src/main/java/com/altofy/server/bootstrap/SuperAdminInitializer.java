package com.altofy.server.bootstrap;

import com.altofy.server.common.Role;
import com.altofy.server.domain.User;
import com.altofy.server.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.UUID;

@Component
public class SuperAdminInitializer implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(SuperAdminInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SuperAdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Value("${app.superadmin.enabled}")
    private boolean enabled;

    @Value("${app.superadmin.firstname}")
    private String firstName;

    @Value("${app.superadmin.lastname}")
    private String lastName;

    @Value("${app.superadmin.email}")
    private String email;

    @Value("${app.superadmin.password}")
    private String password;

    @Override
    public void run(ApplicationArguments args) {
        if (!enabled) {
            log.info("Superadmin creation disabled.");
            return;
        }
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            log.warn("Superadmin enabled but email/password missing. Skipping.");
            return;
        }

        if (userRepository.existsByRole(Role.SUPER_ADMIN)) {
            log.info("SUPER_ADMIN already exists. Skipping creation.");
            return;
        }

        final String normalizedEmail = email.trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            log.warn("User with superadmin email already exists. Skipping creation.");
            return;
        }

        User u = new User(null,  normalizedEmail);
        u.setFirstName(firstName);
        u.setLastName(lastName);
        u.setPassword(passwordEncoder.encode(password));
        u.setRole(Role.SUPER_ADMIN);
        u.setCreated(OffsetDateTime.now());

        userRepository.save(u);
        log.info("SUPER_ADMIN created with email {}", normalizedEmail);
    }
}
