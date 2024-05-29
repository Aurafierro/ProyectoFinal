package com.sena.asigna_web.interfaceService;

import java.util.List;
import java.util.Optional;


public class IUsuarioService {

	public String save(user user);
    public List <user> findAll();
    public List<user> filtroUsuario(String filtro);
	public List<user> filtroIngresoUsuario(String numero_documento );
	public Optional<user> findOne(String id_usuario);
	public int delete (String id_usuario);
	
}
