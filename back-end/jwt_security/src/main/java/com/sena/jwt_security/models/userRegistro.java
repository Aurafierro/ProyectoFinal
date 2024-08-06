package com.sena.jwt_security.models;

import java.util.Collection;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence. Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//get and set
@Data
//consultorr
@Builder
//constructor sin argumento o vacio
@NoArgsConstructor
//constructor sin argumentos
@AllArgsConstructor
@Entity


public class userRegistro implements UserDetails{

	
	@Id
	@GeneratedValue(strategy=GenerationType.UUID)
	@Column(name="id_user", nullable= false, length = 36)
	private String id_user;

	@Column(name="tipo_documento", nullable= false, length = 2)
	private String tipo_documento;

	@Column(name="numero_documento", nullable= false, length = 11)
	private String numero_documento;

	@Column(name="nombre_completo", nullable= false, length = 120)
	private String nombre_completo;

	@Column(name="telefono", nullable= false, length = 15)
	private String telefono;

	@Column(name="correo", nullable= false, length = 100)
	private String correo;

	@Column(name="contrasena", nullable= false, length = 16)
	private String contrasena;
	
	@Column(name="confirmar_contrasena", nullable= false, length = 16)
	private String confirmar_contrasena;
	
	@Enumerated(EnumType.STRING)
	@Column(name="rol", nullable= false, length = 100)
	private rol  rol;
	
	@Column (name="verificar_contrasena")
	private boolean verificar_contrasena;
	
	
	//@Column (name="enabled",nullable=true)
	//private boolean enabled;

	
	//constructor vacío, con todos los parámetros y los getters and setters
	
	

	//este metodo es el encargado de indicar los permisos del usuario, se obtine e rol del usuario
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of (new SimpleGrantedAuthority(this.rol.name()));
		
	}

	public String getId_user() {
		return id_user;
	}

	public void setId_user(String id_user) {
		this.id_user = id_user;
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

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public String getConfirmar_contrasena() {
		return confirmar_contrasena;
	}

	public void setConfirmar_contrasena(String confirmar_contrasena) {
		this.confirmar_contrasena = confirmar_contrasena;
	}

	public rol getRol() {
		return rol;
	}

	public void setRol(rol rol) {
		this.rol = rol;
	}

	public boolean isVerificar_contrasena() {
		return verificar_contrasena;
	}

	public void setVerificar_contrasena(boolean verificar_contrasena) {
		this.verificar_contrasena = verificar_contrasena;
	}

	public userRegistro(String id_user, String tipo_documento, String numero_documento, String nombre_completo,
			String telefono, String correo, String contrasena, String confirmar_contrasena,
			com.sena.jwt_security.models.rol rol, boolean verificar_contrasena) {
		super();
		this.id_user = id_user;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.nombre_completo = nombre_completo;
		this.telefono = telefono;
		this.correo = correo;
		this.contrasena = contrasena;
		this.confirmar_contrasena = confirmar_contrasena;
		this.rol = rol;
		this.verificar_contrasena = verificar_contrasena;
	}

	public userRegistro() {
		super();
	}

	@Override
	public String getPassword() {
		
		//metodo de reornar la contraseña y por seguridad se retornará vacío
		
		return "";
	}

	@Override
	public String getUsername() {
		//metodo para teronar el userName, en este caso es el correo
		return this.correo;
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	
	

	

	

	
}
