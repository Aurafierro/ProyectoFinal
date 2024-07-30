package com.sena.jwt_security.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class reserva {
	
	@Id
	@GeneratedValue(strategy=GenerationType.UUID)
	@Column(name="id_reserva", nullable= false, length = 36)
	private String id_reserva;
	
	@Column(name="nombre_completo", nullable= false, length = 36)
	private String nombre_completo;
	
	@Column(name="nombre_espacio", nullable= false, length = 36)
	private String nombre_espacio;
	
	@Column(name="hora_entrada", nullable= false, length = 36)
	private String hora_entrada;
	
	@Column(name="hora_salida", nullable= false, length = 36)
	private String hora_salida;
	
	@Column(name="fecha_entrada", nullable= true)
	private Date fecha_entrada;

	@Column(name="fecha_salida", nullable= true)
	private Date fecha_salida;

	public reserva() {
		super();
	}

	public reserva(String id_reserva, String nombre_completo, String nombre_espacio, String hora_entrada,
			String hora_salida, Date fecha_entrada, Date fecha_salida) {
		super();
		this.id_reserva = id_reserva;
		this.nombre_completo = nombre_completo;
		this.nombre_espacio = nombre_espacio;
		this.hora_entrada = hora_entrada;
		this.hora_salida = hora_salida;
		this.fecha_entrada = fecha_entrada;
		this.fecha_salida = fecha_salida;
	}

	public String getId_reserva() {
		return id_reserva;
	}

	public void setId_reserva(String id_reserva) {
		this.id_reserva = id_reserva;
	}

	public String getNombre_completo() {
		return nombre_completo;
	}

	public void setNombre_completo(String nombre_completo) {
		this.nombre_completo = nombre_completo;
	}

	public String getNombre_espacio() {
		return nombre_espacio;
	}

	public void setNombre_espacio(String nombre_espacio) {
		this.nombre_espacio = nombre_espacio;
	}

	public String getHora_entrada() {
		return hora_entrada;
	}

	public void setHora_entrada(String hora_entrada) {
		this.hora_entrada = hora_entrada;
	}

	public String getHora_salida() {
		return hora_salida;
	}

	public void setHora_salida(String hora_salida) {
		this.hora_salida = hora_salida;
	}

	public Date getFecha_entrada() {
		return fecha_entrada;
	}

	public void setFecha_entrada(Date fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}

	public Date getFecha_salida() {
		return fecha_salida;
	}

	public void setFecha_salida(Date fecha_salida) {
		this.fecha_salida = fecha_salida;
	}

	
}
