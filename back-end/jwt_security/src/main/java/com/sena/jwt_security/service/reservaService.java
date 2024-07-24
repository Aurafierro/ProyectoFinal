package com.sena.jwt_security.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.interfaceService.IReservaService;
import com.sena.jwt_security.interfaces.IReserva;
import com.sena.jwt_security.models.reserva;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class reservaService implements IReservaService{
	
	@Autowired
	private IReserva data;

	// se implementa 

	//private final jwtServices datajwt;

	// se implementa el administrador de autenticacion
	//private final AuthenticationManager authManager;
	// se implementa el servicio de codificaion y 
	//private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

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
	    List<reserva> listaReserva = data.filtroIngresoReserva(filtro);
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
	public List<reserva> filtroIngresoReserva(String nombre_completo) {
	    List<reserva> listaReserva = data.filtroIngresoReserva(nombre_completo);
	    return listaReserva;
	}

	

}
