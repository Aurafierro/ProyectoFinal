package com.sena.jwt_security.models;

public class AuthResponse {

    private String token;

 
    public AuthResponse() {
        super();
    }

   
    public AuthResponse(String token) {
        super();
        this.token = token;
    }

  
    public String getToken() {
        return token;
    }

 
    public void setToken(String token) {
        this.token = token;
    }

   
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

	public static builder builder() {
		// TODO Auto-generated method stub
		return null;
	}
}
