package com.sena.jwt_security.models;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class resgisterRequest {

	private String tipo_documento;
	private String numero_documento;
	private String nombre_completo;
	
	private String username;
	

	private rol  rol;


	public resgisterRequest() {
		super();
	}


	public resgisterRequest(String tipo_documento, String numero_documento, String nombre_completo, String username,
			com.sena.jwt_security.models.rol rol) {
		super();
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.nombre_completo = nombre_completo;
		this.username = username;
		this.rol = rol;
	}


	public String getTipo_documento() {
		return tipo_documento;
	}


	public void setTipo_documento(String tipo_documento) {
		this.tipo_documento = tipo_documento;
	}


	public String getNumero_documento() {
		return numero_documento;
	}


	public void setNumero_documento(String numero_documento) {
		this.numero_documento = numero_documento;
	}


	public String getNombre_completo() {
		return nombre_completo;
	}


	public void setNombre_completo(String nombre_completo) {
		this.nombre_completo = nombre_completo;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public rol getRol() {
		return rol;
	}


	public void setRol(rol rol) {
		this.rol = rol;
	}


	
	
	
}
