package com.altofy.server.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "statusCode", "metadata", "message", "data" })
@NoArgsConstructor
@Getter @Setter
public class ApiResponse<T> {
    private int statusCode;
    private MetaData metadata;
    private String message;
    private T data;

    public ApiResponse(int statusCode, String message, T data, MetaData metadata) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.metadata = metadata;
    }
}
