package com.sena.jwt_security.models;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FotoPerfil {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.UUID)
	@Column(name="id_fotoperfil", nullable= false, length = 36)
	private String id_fotoperfil;

	@ManyToOne
	@JoinColumn (name="id_user")
	private userRegistro id_user;
	
	@Column( name="imagen_base", nullable = true)
	private String  imagen_base;

	@Column( name="imagen_url", nullable = true, length = 255 )
	private String imagen_url;
	
	
	
	
	public FotoPerfil() {
		super();
	}

	
	

	public FotoPerfil(String id_fotoperfil, userRegistro id_user, String imagen_base, String imagen_url) {
		super();
		this.id_fotoperfil = id_fotoperfil;
		this.id_user = id_user;
		this.imagen_base = imagen_base;
		this.imagen_url = imagen_url;
	}




	public String getId_fotoperfil() {
		return id_fotoperfil;
	}




	public void setId_fotoperfil(String id_fotoperfil) {
		this.id_fotoperfil = id_fotoperfil;
	}




	public userRegistro getId_user() {
		return id_user;
	}




	public void setId_user(userRegistro id_user) {
		this.id_user = id_user;
	}




	public String getImagen_base() {
		return imagen_base;
	}


	public void setImagen_base(String imagen_base) {
		this.imagen_base = imagen_base;
	}


	public String getImagen_url() {
		return imagen_url;
	}

	 public void setImagen_url(String imagen_url) {
	        if (imagen_url != null && !imagen_url.startsWith("data:image/jpeg;base64,")) {
	            this.imagen_url = "data:image/jpeg;base64," + imagen_url;
	        } else {
	            this.imagen_url = imagen_url;
	        }
	    }

}
