package com.sena.jwt_security.service;

import java.util.List;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.models.userRegistro;
//import com.sena.jwt_security.models.seguridad.authResponse;
//import com.sena.jwt_security.models.seguridad.loginRequest;
//import com.sena.jwt_security.service.jwt.jwtServices;
import com.sena.jwt_security.models.seguridad.resgisterRequest;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class userService implements IUserService {

	
	@Autowired
	private Iuser data;

	// se implementa 
	
	//private final jwtServices datajwt;
	
	// se implementa el administrador de autenticacion
	//private final AuthenticationManager authManager;
	// se implementa el servicio de codificaion y 
	//private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
	@Override
	public String save(userRegistro userRegistro) {
		data.save(userRegistro);
		return userRegistro.getId_user();
	}

	@Override
	public List<userRegistro> findAll() {
		List <userRegistro> listaUserRegistro = (List<userRegistro>) data.findAll() ;
		
		return listaUserRegistro;
	}

	@Override
	public List<userRegistro> filtroUser(String filtro) {
		List <userRegistro> listauserRegistro=data.filtroIngresoUser(filtro);
		return listauserRegistro;
	}
	
	
	@Override
	public Optional<userRegistro> findOne(String id_user) {
		Optional<userRegistro>userRegistro=data.findById(id_user);
		
		return userRegistro;
	}

	@Override
	public int delete(String id_user) {
		data.deleteById(id_user);
		return 1;
	}
	@Override

	public List<userRegistro> filtroIngresoUser(String numero_documento) {
		List<userRegistro> listaUserRegistro=data.filtroIngresoUser(numero_documento);
		return listaUserRegistro;
	}

	@Override
	public userRegistro register(resgisterRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	 @Override
	    public Optional<userRegistro> findByUsername(String nombre_completo) {
	        return data.findByNombreCompleto(nombre_completo);

	    }
	//@Override
	//public authResponse login (loginRequest request) {
		
	//}
	
}

