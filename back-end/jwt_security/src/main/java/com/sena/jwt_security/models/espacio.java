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
	
	@Column (name="clasificacion", nullable= false, length = 36)
	private String clasificacion;
	
	@Column (name="capacidad", nullable= false, length = 36)
	private String capacidad;
	
	@Column (name="descripcion", nullable= false, length = 100)
	private String descripcion;

	public espacio() {
		super();
	}

	public espacio(String id_espacio, String nombre_del_espacio, String clasificacion, String capacidad,
			String descripcion) {
		super();
		this.id_espacio = id_espacio;
		this.nombre_del_espacio = nombre_del_espacio;
		this.clasificacion = clasificacion;
		this.capacidad = capacidad;
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

	public String getClasificacion() {
		return clasificacion;
	}

	public void setClasificacion(String clasificacion) {
		this.clasificacion = clasificacion;
	}

	public String getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(String capacidad) {
		this.capacidad = capacidad;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public boolean contieneCamposVacios() {
		// TODO Auto-generated method stub
		return false;
	}

}
