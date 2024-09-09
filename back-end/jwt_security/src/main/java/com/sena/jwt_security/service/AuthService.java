package com.sena.jwt_security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.userRegistro;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService implements IUserService {

    private final Iuser data;
    private final jwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(Iuser data, jwtService jwtService, PasswordEncoder passwordEncoder) {
        this.data = data;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse register(resgisterRequest request) {
        userRegistro userData = new userRegistro();
        userData.setTipo_documento(request.getTipo_documento());
        userData.setNumero_documento(request.getNumero_documento());
        userData.setNombre_completo(request.getNombre_completo());
        userData.setTelefono(request.getTelefono());
        userData.setUsername(request.getUsername());
        userData.setPassword(passwordEncoder.encode(request.getPassword(/* metodo de generacion de contraseña*/)));
        userData.setRol(request.getRol());

        data.save(userData);

        // Generar el token JWT
        String token = jwtService.getToken(userData);

        // Devolver la respuesta con el token
        return new AuthResponse(token);
    }

    @Override
    public AuthResponse login(loginRequest request) {
        // Implementa la lógica de inicio de sesión aquí
        return new AuthResponse();
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
