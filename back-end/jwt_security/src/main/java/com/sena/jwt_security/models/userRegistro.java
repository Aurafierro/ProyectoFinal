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
import jakarta.persistence.Id;

@Entity
public class userRegistro implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_user", nullable = false, length = 36)
    private String id_user;

    @Column(name = "tipo_documento", nullable = false, length = 30)
    private String tipo_documento;

    @Column(name = "numero_documento", nullable = false, length = 11)
    private String numero_documento;

    @Column(name = "nombre_completo", nullable = false, length = 120)
    private String nombre_completo;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "password", nullable = true, length = 60)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false, length = 100)
    private rol rol;

    @Column(name = "verificar_contrasena")
    private boolean verificar_contrasena;

    @Column(name = "correo_notificacion", nullable = false)
    private boolean correo_notificacion;

    @Column(name = "estado", nullable = false)
    private boolean estado;
    
    

    public userRegistro() {
		super();
	}


	public userRegistro(String id_user, String tipo_documento, String numero_documento, String nombre_completo,
			String username, String password, com.sena.jwt_security.models.rol rol, boolean verificar_contrasena,
			boolean correo_notificacion, boolean estado) {
		super();
		this.id_user = id_user;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.nombre_completo = nombre_completo;
		this.username = username;
		this.password = password;
		this.rol = rol;
		this.verificar_contrasena = verificar_contrasena;
		this.correo_notificacion = correo_notificacion;
		this.estado = estado;
	}


	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.rol.name()));
    }
    

    public boolean isCorreo_notificacion() {
		return correo_notificacion;
	}


	public void setCorreo_notificacion(boolean correo_notificacion) {
		this.correo_notificacion = correo_notificacion;
	}


	@Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }
    
    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
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

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
