package com.sena.jwt_security.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CambioCotrasenaRequest {

	
	 private String antiguaContrasena;
	  private String nuevaContrasena;
	   private String confirmarContrasena;
	   
	   
	public CambioCotrasenaRequest() {
		super();
	}


	public CambioCotrasenaRequest(String antiguaContrasena, String nuevaContrasena, String confirmarContrasena) {
		super();
		this.antiguaContrasena = antiguaContrasena;
		this.nuevaContrasena = nuevaContrasena;
		this.confirmarContrasena = confirmarContrasena;
	}


	public String getAntiguaContrasena() {
		return antiguaContrasena;
	}


	public void setAntiguaContrasena(String antiguaContrasena) {
		this.antiguaContrasena = antiguaContrasena;
	}


	public String getNuevaContrasena() {
		return nuevaContrasena;
	}


	public void setNuevaContrasena(String nuevaContrasena) {
		this.nuevaContrasena = nuevaContrasena;
	}


	public String getConfirmarContrasena() {
		return confirmarContrasena;
	}


	public void setConfirmarContrasena(String confirmarContrasena) {
		this.confirmarContrasena = confirmarContrasena;
	}  
	   
	   
}
