package com.sena.jwt_security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.userRegistro;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class authService{ //implements IUserService {

	/*
    private final Iuser data;
    private final jwtService jwtService;

    @Override
    public userRegistro register(resgisterRequest request) {
       
        userRegistro userData = userRegistro.builder()
            .email(request.getEmail())
            .password(request.getPassword())
            .confirmarPassword(request.getConfirmarPassword())
          
            .build();
        
      
        data.save(userData);

       return AuthResponse.builder()
    		   .token(jwtService.getToken(userData))
    		   .build();
  
    }*/
 
}
