package com.sena.jwt_security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.interfaceService.IEspacioService;
import com.sena.jwt_security.interfaces.IEspacio;
import com.sena.jwt_security.models.espacio;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class espacioService implements IEspacioService {
	
	@Autowired
	private IEspacio data;
	
	

	@Override
	public List<espacio> findAll() {
	    List<espacio> listaEspacio = (List<espacio>) data.findAll();
	    return listaEspacio;
	}

	@Override
	public List<espacio> filtroEspacio(String filtro) {
	    List<espacio> listaEspacio = data.filtroEspacio(filtro);
	    return listaEspacio;
	}

	@Override
	public Optional<espacio> findOne(String id_espacio) {
	    Optional<espacio> espacio = data.findById(id_espacio);
	    return espacio;
	}

	@Override
	public int delete(String id_espacio) {
	    data.deleteById(id_espacio);
	    return 1;
	}

	@Override
	public List<espacio> filtroIngresoEspacio(String nombre_del_espacio) {
	    List<espacio> listaEspacio = data.filtroIngresoEspacio(nombre_del_espacio);
	    return listaEspacio;
	}

    @Override
    public List<espacio> consultarlistaespacio() {
        // Implementación del método para consultar todos los espacios
        return (List<espacio>) data.findAll(); // Uso de findAll() para obtener la lista de espacios
    }

	
	@Override
	public int save(espacio espacio ) {
		int res=0;
		espacio producto=data.save(espacio);
		if(producto.equals(null)) {
			res=1;
		}
		return res;
	}
}
