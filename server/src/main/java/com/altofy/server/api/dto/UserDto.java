package com.altofy.server.api.dto;

import com.altofy.server.common.Role;
import com.altofy.server.domain.User;

import java.time.OffsetDateTime;
import java.util.UUID;

public record UserDto(
        UUID id,
        String firstName,
        String lastName,
        String email,
        Role role,
        OffsetDateTime lastLogin,
        OffsetDateTime created
) {
    public static UserDto from(User u) {
        return new UserDto(
                u.getId(),
                u.getFirstName(),
                u.getLastName(),
                u.getEmail(),
                u.getRole(),
                u.getLastLogin(),
                u.getCreated()
        );
    }
}
