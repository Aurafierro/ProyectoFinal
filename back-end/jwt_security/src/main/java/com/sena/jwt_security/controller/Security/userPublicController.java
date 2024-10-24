package com.sena.jwt_security.controller.Security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.preregisterRequest;
import com.sena.jwt_security.service.AuthService;

@RestController
@RequestMapping("/api/v1/public/user")
@CrossOrigin
public class userPublicController {

    private final AuthService authService;

    // Constructor para la inyección de dependencias
    public userPublicController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody loginRequest request) {
        AuthResponse response = authService.login(request);
        return new ResponseEntity<AuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/pre-register/")
    public ResponseEntity<AuthResponse> preRegister(@RequestBody preregisterRequest request) {
        // Llamar al servicio de preRegistro
        AuthResponse response = authService.preregister(request);
        // Devolver la respuesta con el token
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

   /*
    @PostMapping("/register/")
    public ResponseEntity<AuthResponse> register(@RequestBody resgisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }*/
}


