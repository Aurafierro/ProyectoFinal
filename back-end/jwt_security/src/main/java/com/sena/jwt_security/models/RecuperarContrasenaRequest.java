package com.sena.jwt_security.models;


public class RecuperarContrasenaRequest {

	
	 private String username;

	public RecuperarContrasenaRequest() {
		super();
	}

	public RecuperarContrasenaRequest(String username) {
		super();
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	 
	 
}
