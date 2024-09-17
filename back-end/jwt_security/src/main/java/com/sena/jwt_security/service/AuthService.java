package com.sena.jwt_security.service;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.userRegistro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.core.Authentication;



import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class AuthService implements IUserService {

	@Autowired
	private emailService emailService;
    private final Iuser data;
    private final jwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

  
    public AuthService(Iuser data, jwtService jwtService, PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager) {
        this.data = data;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthResponse register(resgisterRequest request) {
        userRegistro userData = new userRegistro();
        userData.setTipo_documento(request.getTipo_documento());
        userData.setNumero_documento(request.getNumero_documento());
        userData.setNombre_completo(request.getNombre_completo());
        userData.setTelefono(request.getTelefono());
        userData.setUsername(request.getUsername());
        var contrasena=codigoAleatorio();
        userData.setPassword(passwordEncoder.encode(contrasena));

        userData.setRol(request.getRol());

        
        
        data.save(userData);
		emailService.enviarNotificacionCuenta(userData.getUsername(),userData.getNombre_completo(),userData.getUsername(),userData.getPassword());

        return new AuthResponse.builder()
                .token(jwtService.getToken(userData))
                .build();
    }
    public AuthResponse loginRequest(loginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(), 
                request.getPassword()
            )
        );

        userRegistro user = findByUsername(request.getUsername()).orElseThrow();

        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }


    
    private static int numeroAleatorioEnRango(int minimo, int maximo) {
    	
    	//nextInt regresa en rango pero con limite superior exclusivo.
    	
    	return  ThreadLocalRandom.current().nextInt(minimo, maximo +1);
    	
    }

    private String codigoAleatorio() {
    	int longitud =10;
    	
    	String banco ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$%#";
    	
    	//CADENA EN DONDE  SE VA IR AGREGANDO UN CÁCTER ALEATORIO
    	
    	String cadena ="";
    	for (int x = 0; x < longitud; x++) {
    		int indiceAleatorio =numeroAleatorioEnRango(0, banco.length()-1);
    		char caracterAleatorio = banco.charAt(indiceAleatorio);
    		cadena += caracterAleatorio;
    	}
    	
    	return cadena;
    }
    
    
    
    @Override
    public AuthResponse login(loginRequest request) {
        // Autenticar al usuario con el AuthenticationManager
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        // Buscar el usuario autenticado en la base de datos
        userRegistro user = findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Generar el token JWT
        String token = jwtService.getToken(user);

        // Retornar la respuesta con el token
        return AuthResponse.builder()
                .token(token)
                .build();
    }


    @Override
    public String save(userRegistro userRegistro) {
        // Implementa el método save si es necesario
        return null;
    }

    @Override
    public List<userRegistro> findAll() {
        // Implementa el método findAll si es necesario
        return null;
    }

    @Override
    public List<userRegistro> filtroUser(String filtro) {
        // Implementa el método filtroUser si es necesario
        return null;
    }

    @Override
    public List<userRegistro> filtroIngresoUser(String numeroDocumento) {
        // Implementa el método filtroIngresoUser si es necesario
        return null;
    }

    @Override
    public Optional<userRegistro> findOne(String idUser) {
        // Implementa el método findOne si es necesario
        return Optional.empty();
    }

    @Override
    public int delete(String idUser) {
        // Implementa el método delete si es necesario
        return 0;
    }

    @Override
    public Optional<userRegistro> findByUsername(String username) {
        return data.findByUsername(username);
    }
}
