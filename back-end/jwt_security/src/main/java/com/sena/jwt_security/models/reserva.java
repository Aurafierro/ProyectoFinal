package com.sena.jwt_security.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_reserva", nullable = false, length = 36)
    private String id_reserva;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private userRegistro userRegistro;

    @ManyToOne
    @JoinColumn(name = "id_espacio")
    private espacio espacio;

    @Column(name = "hora_entrada", nullable = false, length = 10)
    private String hora_entrada;

    @Column(name = "hora_salida", nullable = false, length = 10)
    private String hora_salida;

    @Column(name = "fecha_entrada", nullable = true)
    private Date fecha_entrada;

    @Column(name = "fecha_salida", nullable = true)
    private Date fecha_salida;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 10)
    private estado estadoReserva = estado.ACTIVO;



    public reserva() {
        super();
    }

	public reserva(String id_reserva, com.sena.jwt_security.models.userRegistro userRegistro,
			com.sena.jwt_security.models.espacio espacio, String hora_entrada, String hora_salida, Date fecha_entrada,
			Date fecha_salida, estado estadoReserva) {
		super();
		this.id_reserva = id_reserva;
		this.userRegistro = userRegistro;
		this.espacio = espacio;
		this.hora_entrada = hora_entrada;
		this.hora_salida = hora_salida;
		this.fecha_entrada = fecha_entrada;
		this.fecha_salida = fecha_salida;
		this.estadoReserva = estadoReserva;
	}

	public String getId_reserva() {
		return id_reserva;
	}

	public void setId_reserva(String id_reserva) {
		this.id_reserva = id_reserva;
	}

	public userRegistro getUserRegistro() {
		return userRegistro;
	}

	public void setUserRegistro(userRegistro userRegistro) {
		this.userRegistro = userRegistro;
	}

	public espacio getEspacio() {
		return espacio;
	}

	public void setEspacio(espacio espacio) {
		this.espacio = espacio;
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

	public estado getEstadoReserva() {
		return estadoReserva;
	}

	public void setEstadoReserva(estado estadoReserva) {
		this.estadoReserva = estadoReserva;
	}
    
    
    
}
