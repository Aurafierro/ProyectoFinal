package com.sena.jwt_security.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
