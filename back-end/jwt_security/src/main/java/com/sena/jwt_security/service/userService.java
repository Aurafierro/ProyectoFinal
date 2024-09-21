package com.sena.jwt_security.service;

import java.time.LocalDateTime;
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
	
	private Map<String, PasswordResetToken> tokenStore = new HashMap<>();

	  
	
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
    public void savePasswordResetToken(userRegistro user, String token) {
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));

        // Almacena en el mapa
        tokenStore.put(token, resetToken);
    }



    public boolean validatePasswordResetToken(String token) {
        PasswordResetToken resetToken = tokenStore.get(token); // O busca en la base de datos
        return resetToken != null && resetToken.getExpiryDate().isAfter(LocalDateTime.now());
    }




	//public Object enviarNotificacionCuenta() {
		// TODO Auto-generated method stub
		//return null;
	//}
		
	//@Override
	//public List<userRegistro>enviarNotificacionCuenta(){
		//List<userRegistro>listaUserRegistro=data.enviarNotificacionCuenta();
		//return listaUserRegistro;
	//}
	
}

