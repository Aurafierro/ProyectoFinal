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

	public Object filtroIngresoReservaSelect(String filtro);
	public List<reserva> filtroIngresoReserva(String nombre_espacio, String nombre_completo);
	public List<reserva> verificarReservaConflicto(String nombre_espacio, String hora_entrada, String hora_salida);
}
