package com.sena.jwt_security.models;

//import java.sql.Blob;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
//consultorr
@Builder
//constructor sin argumento o vacio
@NoArgsConstructor
//constructor sin argumentos
@AllArgsConstructor
@Entity

public class espacio {

	@Id
	@GeneratedValue (strategy=GenerationType.UUID)
	@Column (name="id_espacio", nullable= false, length = 36)
	private String id_espacio;
	
	@Column (name="nombre_del_espacio", nullable= false, length = 40)
	private String nombre_del_espacio;
	
	//@Column (name="imagen_espacio", nullable= true)
	//private String imagen_espacio;
	
	@Column (name="descripcion", nullable= false, length = 36)
	private String descripcion;

	public espacio() {
		super();
	}

	public espacio(String id_espacio, String nombre_del_espacio, /*Blob imagen_espacio,*/ String descripcion) {
		super();
		this.id_espacio = id_espacio;
		this.nombre_del_espacio = nombre_del_espacio;
		//this.imagen_espacio = "data:image/jpeg;base64,"+ imagen_espacio;
		this.descripcion = descripcion;
	}

	public String getId_espacio() {
		return id_espacio;
	}

	public void setId_espacio(String id_espacio) {
		this.id_espacio = id_espacio;
	}

	public String getNombre_del_espacio() {
		return nombre_del_espacio;
	}

	public void setNombre_del_espacio(String nombre_del_espacio) {
		this.nombre_del_espacio = nombre_del_espacio;
	}

	//public Blob getImagen_espacio() {
		//return imagen_espacio;
	//}

	//public void setImagen_espacio(Blob imagen_espacio) {
		//this.imagen_espacio = imagen_espacio;
	//}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	
	
	
	
}
