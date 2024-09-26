package com.sena.jwt_security.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.IPasswordResetTokenRepository;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.PasswordResetToken;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.userRegistro;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class userService implements IUserService {

	
	@Autowired
	private Iuser data;
	
	@Autowired
	private IPasswordResetTokenRepository tokenRepository;

	public void savePasswordResetToken(userRegistro user, String token) {
	    PasswordResetToken resetToken = new PasswordResetToken();
	    resetToken.setUser(user);
	    resetToken.setToken(token);
	    resetToken.setExpiryDate(LocalDateTime.now().plusHours(24)); // Cambiado a 24 horas

	    // Guarda el token en la base de datos
	    tokenRepository.save(resetToken);
	}


	  
	
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
	public AuthResponse  register(resgisterRequest request) {
		
		return null;
	}

	 @Override
	    public Optional<userRegistro> findByUsername(String username) {
	        return data.findByUsername(username);

	    }
	
	

	@Override
	public AuthResponse login(loginRequest request) {
		// TODO Auto-generated method stub
		return null;
	}



    @Override
    public List<userRegistro>enviarNotificacionCuenta(String numero_documento){
    	List <userRegistro>listaUserRegistro=data.enviarNotificacionCuenta(numero_documento);
    	return listaUserRegistro;
    }




    @Override
    public List<userRegistro> filtroIngresoUserByEmail(String username) {
        // Verificar si el nombre de usuario es nulo o vacío
        if (username == null || username.isEmpty()) {
            return Collections.emptyList(); // Devolver una lista vacía si no se proporciona un nombre de usuario
        }

        // Usar el repositorio para encontrar usuarios por su correo electrónico (nombre de usuario)
        return data.findByUsername(username)
                   .map(Collections::singletonList) // Si se encuentra un usuario, devolverlo en una lista
                   .orElse(Collections.emptyList()); // Si no se encuentra, devolver una lista vacía
    }




    @Override
    public userRegistro findById(String idUser) {
        // Buscar el usuario por su ID utilizando el repositorio
        Optional<userRegistro> optionalUser = data.findById(idUser);
        
        // Si el usuario existe, devolverlo, si no, lanzar una excepción o devolver null
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            // Puedes manejarlo de distintas formas, como lanzar una excepción personalizada
            return null;
        }
    }

	
}

