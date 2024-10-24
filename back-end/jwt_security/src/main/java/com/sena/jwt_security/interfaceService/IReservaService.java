package com.sena.jwt_security.interfaceService;

import java.time.LocalDate;
import java.util.List;

import java.util.Optional;

import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.models.userRegistro;

public interface IReservaService {

	public String save(reserva reserva);
    public List <reserva> findAll();
    public List<reserva> filtroReserva(String filtro);
	public Optional<reserva> findOne(String id_reserva);
	public int delete (String id_reserva);
	public List<reserva> filtroIngresoReserva(espacio espacio, userRegistro userRegistro);
	public List<reserva> verificarReservaConflicto(espacio espacio, String hora_entrada, String hora_salida, userRegistro userRegistro);
	public List<reserva> filtroPorUsuarioYEspacio(String nombreCompleto, String nombreEspacio);	
	public List<reserva> findReservasByUserId(String id_user);
    boolean existeReservaConflicto(Long idEspacio, String horaEntrada, String horaSalida, LocalDate fechaEntrada);
}
