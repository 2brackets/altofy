package com.altofy.server.api.controller;

import com.altofy.server.api.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    private final JdbcTemplate jdbc;
    public record HealthStatus(boolean server, boolean database) {}

    public HealthController(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<HealthStatus>> getHealth() {
        boolean server = true;
        boolean database = this.getDatabaseStatus();
        return ResponseEntity.ok(
                new ApiResponse<>(
                        200,
                        "OK",
                        new HealthStatus(server, database),
                        null
                )
        );
    }

    private boolean getDatabaseStatus() {
        try {
            Integer one = jdbc.queryForObject("select 1", Integer.class);
            return one != null && one == 1;
        } catch (Exception e) {
            return false;
        }
    }
}
