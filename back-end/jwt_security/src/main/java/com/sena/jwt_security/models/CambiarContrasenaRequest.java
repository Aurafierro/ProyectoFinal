package com.sena.jwt_security.models;


public class CambiarContrasenaRequest {

	  private String nuevaContrasena;
	   private String confirmarContrasena;
	   
	   
	public CambiarContrasenaRequest() {
		super();
	}


	public CambiarContrasenaRequest(String nuevaContrasena, String confirmarContrasena) {
		super();
		this.nuevaContrasena = nuevaContrasena;
		this.confirmarContrasena = confirmarContrasena;
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
