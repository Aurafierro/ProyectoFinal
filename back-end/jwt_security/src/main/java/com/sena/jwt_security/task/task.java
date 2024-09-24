package com.sena.jwt_security.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.emailService;
import com.sena.jwt_security.service.userService;

import java.util.List;

@Component
public class task {

    @Autowired
    private userService data;

    @Autowired
    private emailService email;

    // Puedes definir un número de documento por defecto o usar un método para establecerlo.
    private String numeroDocumento = "default-document-number"; // Cambia esto según tu lógica

    @Scheduled(fixedRate = 1000000)
    public void enviarNotificacionCuenta() {
        List<userRegistro> listaUserRegistro = data.enviarNotificacionCuenta(numeroDocumento);
        
        for (userRegistro userRegistro : listaUserRegistro) {
            System.out.println("Usuario registrado: " + userRegistro.getNombre_completo());
            email.enviarNotificacionCuenta(
                userRegistro.getUsername(),
                userRegistro.getNombre_completo(),
                userRegistro.getPassword(), 
                userRegistro.getUsername()
            );
        }
    }

    // Método para establecer el número de documento, si es necesario
    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }
}
