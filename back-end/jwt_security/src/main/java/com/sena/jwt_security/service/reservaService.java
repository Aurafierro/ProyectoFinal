package com.sena.jwt_security.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.interfaceService.IReservaService;
import com.sena.jwt_security.interfaces.IReserva;
import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.models.userRegistro;



@Service

public class reservaService implements IReservaService{
	
	@Autowired
	private IReserva data;
	
	@Override
	public String save(reserva reserva) {
	    data.save(reserva);
	    return reserva.getId_reserva();
	}

	@Override
	public List<reserva> findAll() {
	    List<reserva> listaReserva = (List<reserva>) data.findAll();
	    return listaReserva;
	}

	@Override
	public List<reserva> filtroReserva(String filtro) {
	    List<reserva> listaReserva = data.filtroReserva(filtro);
	    return listaReserva;
	}

	@Override
	public Optional<reserva> findOne(String id_reserva) {
	    Optional<reserva> reserva = data.findById(id_reserva);
	    return reserva;
	}

	@Override
	public int delete(String id_reserva) {
	    data.deleteById(id_reserva);
	    return 1;
	}

	@Override
	public List<reserva> filtroIngresoReserva(espacio espacio, userRegistro userRegistro) {
	    // Llama al repositorio con ambos parámetros
	    List<reserva> listaReserva = data.filtroIngresoReserva(espacio, userRegistro);
	    return listaReserva;
	}

	@Override
	public List<reserva> verificarReservaConflicto(String nombre_espacio, String hora_entrada, String hora_salida) {
	    // Llama al repositorio para verificar si ya hay una reserva con el mismo espacio y horario
	    List<reserva> listaReservaConflicto = data.verificarReservaConflicto(nombre_espacio, hora_entrada, hora_salida);
	    return listaReservaConflicto;
	}
	
	public List<reserva> filtroPorUsuarioYEspacio(String nombreCompleto, String nombreEspacio) {
        // Llama al método en el repositorio
        return data.filtroPorUsuarioYEspacio(nombreCompleto, nombreEspacio);
    }
	
	public List<reserva> findReservasByUserId(String id_user) {
        // Llama al método del repositorio para obtener las reservas de un usuario específico
        return data.findReservasByUserId(id_user);
    }

}
