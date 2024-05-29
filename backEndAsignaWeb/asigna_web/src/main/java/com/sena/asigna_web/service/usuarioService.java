package com.sena.asigna_web.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.asigna_web.intefaceService.IUsuarioService;
import com.sena.asigna_web.interfaces.IUsuario;
import com.sena.asigna_web.models.user;


@Service
public class usuarioService  implements IUsuarioService{

	
	@Autowired
	private IUsuario data;

	@Override
	public String save(user user) {
		data.save(user);
		return user.getId_usuario();
	}

	@Override
	public List<user> findAll() {
		List <user> listaUser = (List<user>) data.findAll() ;
		
		return listaUser;
	}

	@Override
	public List<user> filtroUser(String filtro) {
		List <user> listaMedico=data.filtroUser(filtro);
		return listaUser;
	}
	
	
	@Override
	public Optional<user> findOne(String id_usuario) {
		Optional<user>user=data.findById(id_usuario);
		
		return user;
	}

	@Override
	public int delete(String id_usuario) {
		data.deleteById(id_usuario);
		return 1;
	}
	@Override

	public List<user> filtroIngresoUsuario(String numero_documento) {
		List<user> listaUser=data.filtroIngresoUsuario(numero_documento);
		return listaUser;
	}
	

}
