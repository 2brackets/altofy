package com.altofy.server.common;

public enum Role {
    USER,
    ADMIN,
    SUPER_ADMIN;

    public String asAuthority() {
        return "ROLE_" + name(); // t.ex. "ROLE_ADMIN"
    }
}
