package com.sena.jwt_security.interfaces;

import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sena.jwt_security.models.reserva;

public interface IReserva extends CrudRepository<reserva,String> {

	
	@Query("SELECT r FROM reserva r WHERE "
			+ "r.nombre_completo LIKE %?1% OR "
			+ "r.nombre_espacio LIKE %?1% OR "
			+ "r.hora_entrada LIKE %?1% OR "
			+ "r.hora_salida LIKE %?1% OR"
			+ "r.fecha_entrada = ?1 OR "
			+ "r.fecha_salida = ?1")
	List<reserva>filtroReserva (String filtro);
	
	@Query("SELECT r FROM reserva r WHERE r.nombre_espacio LIKE %?1%")
	List<reserva> filtroIngresoReserva(String nombre_completo );
}
