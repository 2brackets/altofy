package com.altofy.server.api.controller;

import com.altofy.server.api.ApiResponse;
import com.altofy.server.api.dto.UserDto;
import com.altofy.server.repository.UserRepository;
import com.altofy.server.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public record LoginRequest(String email, String password) {}
    public record LoginResponse(String accessToken, UserDto user) {}

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest req) {
        String email = req.email().trim().toLowerCase();
        var userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty() || !passwordEncoder.matches(req.password(), userOpt.get().getPassword())) {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(401,
                            "Invalid credentials",
                            null,
                            null)
            );
        }
        var user = userOpt.get();
        user.setLastLogin(OffsetDateTime.now());
        userRepository.save(user);

        String token = jwtUtil.generate(user.getId(), user.getEmail(), user.getRole());
        var body = new LoginResponse(token,UserDto.from(user));
        return ResponseEntity.ok(new ApiResponse<>(200, "OK", body, null));
    }
}
