package com.sena.jwt_security.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sena.jwt_security.service.emailService;
import com.sena.jwt_security.service.userService;

@Component
public class task {
	
	@Autowired
	private userService data;
	
	@Autowired
	private emailService email;
	
	//@Scheduled(fixedRate=6000)
	//public void enviarNotificacionCuenta() {
		//var listaUserRegistro=data.enviarNotificacionCuenta();
		//for (com.sena.jwt_security.models.userRegistro userRegistro:listaUserRegistro) {
			//System.out.println("Usuario registrado: "+
		//userRegistro.getNombre_completo());
			//email.enviarNotificacionCuenta(userRegistro.getUsername(),userRegistro.getNombre_completo(), userRegistro.getPassword(), userRegistro.getUsername());
		//}
	//}
	

}
