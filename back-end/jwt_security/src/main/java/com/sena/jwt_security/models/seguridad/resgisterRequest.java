package com.sena.jwt_security.models.seguridad;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class resgisterRequest {

	@Id
	@GeneratedValue(strategy=GenerationType.UUID)
	@Column(name="id", nullable= false, length = 36)
	private String id;

	@Column(name="email", nullable= false, length = 320)
	private String email;

	@Column(name="password", nullable= false, length = 19)
	private String password;

	@Column(name="confirmarPassword", nullable= false, length = 19)
	private String confirmarPassword;

	public resgisterRequest() {
		super();
	}

	public resgisterRequest(String id, String email, String password, String confirmarPassword) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.confirmarPassword = confirmarPassword;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmarPassword() {
		return confirmarPassword;
	}

	public void setConfirmarPassword(String confirmarPassword) {
		this.confirmarPassword = confirmarPassword;
	}
	

	
	

	
	
}
