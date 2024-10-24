package com.sena.jwt_security.models;

public class AuthResponse {

    private String token;
    private String message;

    // Constructor vacío
    public AuthResponse() {
        super();
    }

    // Constructor con token y mensaje
    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    // Getters y Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Builder para AuthResponse
    public static class Builder {
        private String token;
        private String message;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(this.token, this.message);
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}
