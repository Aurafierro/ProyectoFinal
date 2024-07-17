package com.sena.jwt_security.interfaceService;

import java.util.List;

import java.util.Optional;

import com.sena.jwt_security.models.reserva;

public interface IReservaService {

	public String save(reserva reserva);
    public List <reserva> findAll();
    public List<reserva> filtroReserva(String filtro);
	public Optional<reserva> findOne(String id_reserva);
	public int delete (String id_reserva);
	public List<reserva> filtroIngresoReserva(String nombre_espacio);
}
