package com.altofy.server.domain;

import com.altofy.server.common.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter @Setter
@Table("app_user")
public class User {
    @Id
    private UUID id;
    @Column("first_name")
    private String firstName;
    @Column("last_name")
    private String lastName;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private Role role;
    @Column("last_login")
    private OffsetDateTime lastLogin;
    private OffsetDateTime created;

    public User() {}
    public User(UUID id, String email) {
        this.id = id;
        this.email = email;
    }
}
