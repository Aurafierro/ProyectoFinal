package com.sena.jwt_security.models;

public class AuthResponse {

    private String token;

    // Constructor sin argumentos
    public AuthResponse() {
        super();
    }

    // Constructor con el token
    public AuthResponse(String token) {
        super();
        this.token = token;
    }

    // Getter para el token
    public String getToken() {
        return token;
    }

    // Setter para el token
    public void setToken(String token) {
        this.token = token;
    }

    // Método toString opcional para representar el objeto como una cadena
    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                '}';
    }

    // Builder para AuthResponse
    public static class builder {
        private String token;

        public builder token(String token) {
            this.token = token;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(this.token);
        }
    }
}
