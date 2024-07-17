package com.sena.jwt_security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class emailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public String enviarNotificacionCuenta(String destinatario ) {

		try {
			//String destinatario="marianamayaya@gmail.com";
			String asunto="Bienvenid@s a AsignaWeb";
			String cuerpo=""
				   	+"<div style='background-color: #CCCCCC;'>"
	                 +" <div style='background-color: white; width: 40%; margin: auto; padding: 20px;'>"
	                 +" <div style='background-color: #202C4A; padding: 11px;'>"
	                 +"<center><img style='width: 110px; height: 100px;' src='./5613765 [Recuperado].png'></center>"
	                 +"</div>"
	                 +" <h1 style='color: #2B56C5;'>¡Bienvenido a AsignaWeb!</h1>"
			         +" <p style='color: #000;'>"
	                 +" Explora nuestra plataforma dedicada a facilitar la reserva"
	                 +" de sitios educativos de manera eficiente y conveniente. Con AsignaWeb,"
	                 +"encontrarás la herramienta perfecta para gestionar tus reservas escolares"
	                 +"de manera sencilla, asegurando que cada visita educativa sea organizada"
	                 +"y productiva. Descubre cómo podemos simplificar la planificación de tus"
	                 +"actividades educativas. ¡Bienvenido a una nueva forma de reservar con AsignaWeb!"
	                 +"</p>"
	                 +" <br>"
	                 +" <center><button style='background-color:#2B56C5; color:white; padding:10px 20px; border:none; border-radius:14px; font-size:16px; cursor:pointer; margin-bottom:5%;'>Inicio de sesión</button></center>"
	                 +" <p style='text-align:center;' > ¡Te esperamos pronto! </p>"
	                 +"  <div style='background-color: #202C4A; margin: auto; padding: 35px;'>"
	                 +"  </div>"
	                 +" </div>"
	                 +"</div>";
			        
			var retorno=enviarCorreo(destinatario,asunto,cuerpo);
			if(retorno) {
				return "Se envió correctamente";
			}else {
				return "No se pudo enviar";
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			return "Error al envíar "+e.getMessage();
		}
	}

	public String enviarCorreoRecuperarPassword(String destinatario) {
		try {
			String asunto="Recuperacion de contraseña";
			String cuerpo=""
					+"<div style='background-color: #CCCCCC;'>"
					+" <div style='background-color: white; width: 40%; margin: auto; padding: 20px;'>"
					+" <div style='background-color: #202C4A; padding: 11px;'>"
	                +" <center><img style='width: 110px; height: 100px;' src=´'./5613765 [Recuperado].png'></center>"
	                +" </div>"
	                +" <div style='text-align: center; margin-top: 20px;'>"
	                +" <img style='width: 110px; height: 100px;' src='./Recurso 1@72x.png'>"
	                +"</div>"
	                +"<p style='color: #000;'>Hemos recibido una solicitud para restablecer la contraseña de su cuenta en Asigna Web. "
	                +"Para restablecer su contraseña, por favor haga clic en el siguiente enlace:</p>"
	                +"<p> [Enlace de recuperación]</p>"
	                +"<p> Este enlace es válido por 24 horas. Si el enlace ha expirado, por favor solicite un nuevo enlace a través de la página de recuperación de cuenta.</p>"
	                +"<br>"
		         	+"<center><button style='background-color:#2B56C5; color:white; padding:10px 20px; border:none; border-radius:14px; font-size:16px; cursor:pointer; margin-bottom:5%;'>Recuperar contraseña</button></center>"
		        	+"<p style='text-align:center;'>¡Te esperamos pronto!</p>"
	                +"<div style='background-color: #202C4A; margin: auto; padding: 35px;'>"
	                +"</div>"
	                +" </div>"
	                +" </div>";
			
			var retorno=enviarCorreo(destinatario,asunto,cuerpo);
			if(retorno) {
				return "se envió correctamente";
			}else {
				return "No se pudo envíar";
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			return "Error al envíar "+e.getMessage();
		}
	}
	
	public String enviarCorreoPasswordModificada(String destinatario) {
		try {
			//String destinatario="asignaweb@gmail.com";
			String asunto="Modificación de contraseña";
			String cuerpo=""
				+"	<div style='background-color: #FFFF;'>"
				+"  <div style='background-color: white; width: 40%; margin: auto; padding: 20px;'>"
	       +"     <div style='background-color: #202C4A; padding: 11px;'>"
	           +"     <center><img style='width: 110px; height: 100px;' src='./5613765 [Recuperado].png'></center>"
	           +"  </div>"
	          +"  <p style='color: #000;'>¡Excelente! Has modificado tu ontraseña.</p>"
	          +"     <p>  Queremos informarte que has modificado tu "
	          +"      contraseña correctamente. Este es un paso"
	          +"       importante para mantener la seguridad de tu"
	          +"       cuenta y asegurarnos de que solo tú tengas acceso"
	          +"       a ella.</p>"
	    
	        +"    </div>"
	      +"  </div>"
	  +"  </div>";
			
			var retorno=enviarCorreo(destinatario,asunto,cuerpo);
			if(retorno) {
				return "se envió correctamente";
			}else {
				return "No se pudo envíar";
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			return "Error al envíar "+e.getMessage();
		}
	}
	
	
	
	
	private boolean enviarCorreo(String destinatario,String asunto,String cuerpo) throws MessagingException {
		try {
			MimeMessage message=javaMailSender.createMimeMessage();
			MimeMessageHelper helper=new MimeMessageHelper(message,true);
			
			helper.setTo(destinatario);
			helper.setSubject(asunto);
			helper.setText(cuerpo,true);
			
			javaMailSender.send(message);
			return true;
		}catch (Exception e) {

			return false;
		}
		
	}
	
}
