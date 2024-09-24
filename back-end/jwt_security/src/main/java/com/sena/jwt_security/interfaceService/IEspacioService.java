package com.sena.jwt_security.interfaceService;

import java.util.List;
import java.util.Optional;

import com.sena.jwt_security.models.espacio;

public interface IEspacioService {
	public String save(espacio espacio);
	public List<espacio>findAll();
	public List<espacio>filtroEspacio(String filtro);
	public Optional<espacio>findOne(String id_espacio);
	public int delete (String id_espacio);
	public List<espacio>filtroIngresoEspacio(String nombre_del_espacio);
	
}
