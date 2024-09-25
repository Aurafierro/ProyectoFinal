package com.sena.jwt_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sena.jwt_security.interfaceService.IFotoperfilService;
import com.sena.jwt_security.interfaces.IFotoPerfil;
import com.sena.jwt_security.models.FotoPerfil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class fotoperfilService implements IFotoperfilService {

	
	
	
	@Autowired
	private IFotoPerfil data;

	@Override
	public List<FotoPerfil> consultarlistafotoperfil() {
		
		return (List<FotoPerfil>) data.findAll(); 
	}
	 
	@Override
	public int save(FotoPerfil FotoPerfil) {
		   int res = 0;
	       
	        FotoPerfil savedFotoPerfil = data.save(FotoPerfil);
	        if (savedFotoPerfil == null) { 
	            res = 1; // Indicador de error si no se guardó correctamente
	        }
	        return res; // Devuelve 0 si se guardó correctamente, 1 si hubo un error
	    }
    
	 
}
