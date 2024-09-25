package com.sena.jwt_security.interfaceService;

import java.util.List;

import com.sena.jwt_security.models.FotoPerfil;
import com.sena.jwt_security.models.espacio;

public interface IFotoperfilService {
	public int save(FotoPerfil FotoPerfil);
	public List<FotoPerfil> consultarlistafotoperfil();
}
