package com.sena.jwt_security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sena.jwt_security.interfaceService.IFotoperfilService;
import com.sena.jwt_security.interfaces.IFotoPerfil;
import com.sena.jwt_security.models.FotoPerfil;



@Service

public class fotoperfilService implements IFotoperfilService {

	
	
	
	@Autowired
	private IFotoPerfil data;

	 @Override
	    public List<FotoPerfil> consultarlistafotoperfil() {
	        return (List<FotoPerfil>) data.findAll();
	    }

	    @Override
	    public int save(FotoPerfil fotoPerfil) {
	        try {
	            // Guarda la FotoPerfil y si se guarda correctamente no lanzará excepción
	            data.save(fotoPerfil);
	            return 0; // 0 si se guardó correctamente
	        } catch (Exception e) {
	            // Manejo de excepción
	            System.err.println("Error al guardar FotoPerfil: " + e.getMessage());
	            return 1; // 1 si hubo un error
	        }
	    }
    
	 
}
