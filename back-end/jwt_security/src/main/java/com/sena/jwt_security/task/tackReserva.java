package com.sena.jwt_security.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.emailService;
import com.sena.jwt_security.service.reservaService;
import com.sena.jwt_security.service.userService;


@Component
public class tackReserva {


	@Autowired
    private reservaService data;
    
  

    @Autowired
    private emailService email;

   
    @Scheduled(fixedRate = 60000) // Ejecuta la tarea cada minuto
    public void enviarNotificacionReservaUnDiaAntes() {
        // Obtén la lista de reservas para el día siguiente
        List<reserva> listaReserva = data.enviarNotificacionReservaUnDiaAntes();
        
        // Recorre la lista de reservas y envía notificaciones
        for (reserva reserva : listaReserva) {
            String mensaje = "Recuerda que tienes asignada tu reserva para el día de mañana: " + reserva.getFecha_entrada()
                + " en la fecha: " + reserva.getFecha_entrada();
            
            // Muestra el mensaje en la consola
            System.out.println(mensaje);
            
            // Envía la notificación por correo electrónico
            email.enviarNotificacionReservaUnDiaAntes(
                reserva.getFecha_entrada(),
                mensaje // Agrega el mensaje para el correo
            );
        }
    }
}