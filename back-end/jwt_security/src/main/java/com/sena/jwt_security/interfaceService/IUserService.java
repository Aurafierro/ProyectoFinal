package com.sena.jwt_security.interfaceService;

import java.util.List;


import java.util.Optional;

import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.userRegistro;

public interface IUserService {


	public String save(userRegistro userRegistro);
    public List <userRegistro> findAll();
    public List<userRegistro> filtroUser(String filtro);
	public List<userRegistro> filtroIngresoUser(String numero_documento );
	public Optional<userRegistro> findOne(String id_user);
	public int delete (String id_user);

	
	public AuthResponse register(resgisterRequest request);

	public Optional<userRegistro>findByUsername(String username);
	AuthResponse login(loginRequest request);
	public void savePasswordResetToken(userRegistro user, String token);

	
	//public List<userRegistro>enviarNotificacionCuenta();
	
	

	
}
