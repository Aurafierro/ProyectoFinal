package com.sena.jwt_security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.rol;
import com.sena.jwt_security.models.userRegistro;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class authService implements IUserService {

	@Override
	public String save(userRegistro userRegistro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<userRegistro> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<userRegistro> filtroUser(String filtro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<userRegistro> filtroIngresoUser(String numero_documento) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<userRegistro> findOne(String id_user) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public int delete(String id_user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public userRegistro register(resgisterRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<userRegistro> findByUsername(String username) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

/*	
    private final Iuser data;
    private final jwtService jwtService;

 
public AuthResponse register (resgisterRequest request) {
	
	userRegistro userData = userRegistro
			.builder() 
		    .tipoDocumento(request.)
		    .nombreCompleto(request.getNombre_completo())
		    .telefono(request.getTelefono())
		    .username(request.getUsername())  
		    .password(passwordEncoder.encode(request.getPassword())
		    .rol(rol.userRegistro)
		    .build();

	data.save(userData);
	return AuthResponse.builder()
			.tocken(jwtService.getToken(userData))
			.token(jwtService.getToken(userData))
			.build();
	
}
public AuthResponse login (loginRequest request) {
	return new AuthResponse();
}*/
}
