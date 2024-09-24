package com.sena.jwt_security.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sena.jwt_security.models.espacio;

public interface IEspacio extends CrudRepository<espacio,String>{
	
	@Query("SELECT e FROM espacio e WHERE "
			+ "e.nombre_del_espacio LIKE %?1% OR "
			+ "e.clasificacion LIKE %?1% OR "
			+ "e.capacidad LIKE %?1% OR "
			+ "e.descripcion LIKE %?1%")
	List <espacio>filtroEspacio(String filtro);

	@Query("SELECT e FROM espacio e WHERE e.nombre_del_espacio LIKE %?1%")
	List <espacio>filtroIngresoEspacio(String nombre_del_espacio);
}
