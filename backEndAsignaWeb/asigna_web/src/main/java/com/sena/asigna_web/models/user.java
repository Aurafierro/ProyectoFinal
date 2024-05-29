package com.sena.asigna_web.models;


import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class user {

	@Id
	@GeneratedValue(strategy=GenerationType.UUID)
	@Column(name="id_usuario", nullable= false, length = 36)
	private String id_usuario;

	@Column(name="tipo_documento", nullable= false, length = 2)
	private String tipo_documento;

	@Column(name="numero_documento", nullable= false, length = 11)
	private String numero_documento;

	@Enumerated(EnumType.STRING)
	@Column(name="rol", nullable= false, length = 100)
	private rol  rol;
	
	@Column(name="nombre_completo", nullable= false, length = 120)
	private String nombre_completo;
	
	@Column(name="password", nullable= false, length = 100)
	private String password;
	
	@Column(name="confirmar_password", nullable= false, length = 100)
	private String confirmar_password;

	@Column(name="telefono", nullable= false, length = 15)
	private String telefono;

	@Column(name="correo", nullable= false, length = 100)
	private String correo;

	public user() {
		super();
	}

	public user(String id_usuario, String tipo_documento, String numero_documento, com.sena.asigna_web.models.rol rol,
			String nombre_completo, String password, String confirmar_password, String telefono, String correo) {
		super();
		this.id_usuario = id_usuario;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.rol = rol;
		this.nombre_completo = nombre_completo;
		this.password = password;
		this.confirmar_password = confirmar_password;
		this.telefono = telefono;
		this.correo = correo;
	}

	public String getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(String id_usuario) {
		this.id_usuario = id_usuario;
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

	public rol getRol() {
		return rol;
	}

	public void setRol(rol rol) {
		this.rol = rol;
	}

	public String getNombre_completo() {
		return nombre_completo;
	}

	public void setNombre_completo(String nombre_completo) {
		this.nombre_completo = nombre_completo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmar_password() {
		return confirmar_password;
	}

	public void setConfirmar_password(String confirmar_password) {
		this.confirmar_password = confirmar_password;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

}
