package com.sena.jwt_security.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CambiarContrasenaRequest {

	 private String contrasenaActual;
	    private String nuevaContrasena;
		public CambiarContrasenaRequest() {
			super();
		}
		public CambiarContrasenaRequest(String contrasenaActual, String nuevaContrasena) {
			super();
			this.contrasenaActual = contrasenaActual;
			this.nuevaContrasena = nuevaContrasena;
		}
		public String getContrasenaActual() {
			return contrasenaActual;
		}
		public void setContrasenaActual(String contrasenaActual) {
			this.contrasenaActual = contrasenaActual;
		}
		public String getNuevaContrasena() {
			return nuevaContrasena;
		}
		public void setNuevaContrasena(String nuevaContrasena) {
			this.nuevaContrasena = nuevaContrasena;
		}
	    
	    
}
