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
	private String telefono;
	private String correo;
	private String contrasena;
	private rol  rol;
	
	
}
