package com.sena.jwt_security.controller.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
public class emailController {

	@Autowired
	private JavaMailSender javaMailSender;
	
	@GetMapping("/enviar-correo-basico")
	public String enviarCorreoBasico() {
		try {
			String destinatario="asignaweb@gmail.com";
			String asunto="Correo prueba básico 1";
			String cuerpo="correo prueba 1";
			        
			var retorno=enviarCorreo(destinatario,asunto,cuerpo);
			if(retorno) {
				return "se envió correctamente";
			}else {
				return "No se pudo envíar";
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			return "Erro al envíar "+e.getMessage();
		}
	}
	
	@GetMapping("/enviar-correo-avanzado")
	public String enviarCorreoAvanzado() {
		try {
			String destinatario="marianamayaya@gmail.com";
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
				return "se envió correctamente";
			}else {
				return "No se pudo envíar";
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			return "Erro al envíar "+e.getMessage();
		}
	}
	@GetMapping("/enviar-correo-recuperacion")
	public String enviarCorreoRecuperarContraseña() {
		try {
			String destinatario="asignaweb@gmail.com";
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
	public String enviarCorreoExitoso() {
		try {
			String destinatario="asignaweb@gmail.com";
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
				return "se envió correctamente";
			}else {
				return "No se pudo envíar";
			}
			
		}catch (Exception e) {
			// TODO: handle exception
			return "Erro al envíar "+e.getMessage();
		}
	}
	@GetMapping("/enviar-correo-contraseña-modificada")
	public String enviarCorreoContraseñaModificada() {
		try {
			String destinatario="asignaweb@gmail.com";
			String asunto="Contraseña modificada";
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
	
	@GetMapping("/enviar-correo-confirmacion-espacio")
	public String enviarCorreoConfirmacionEspacio() {
		try {
			String destinatario="asignaweb@gmail.com";
			String asunto="Espacio confirmado";
			String cuerpo=""
			
		   	+"<div style='background-color: #CCCCCC;'>"
		   	+" <div style='background-color: white; width: 40%; margin: auto; padding: 20px;'>"
		   	+"  <div style='background-color: #202C4A; padding: 11px;'>"
	         +"   <center><img style='width: 110px; height: 100px;' src='./5613765 [Recuperado].p'></center>"
	         +"  </div>"
	         +"   <h1 style='color: #2B56C5;'>¡Reserva confirmada!</h1>"
			 +"   <p style='color: #000;'>"
			 +"       Estimado/a [Nombre del Usuario], nos complace informarte que tu reserva de espacio"
	         +"       en AsignaWeb ha sido confirmada. "
	         +"   </p>"
	         +"   <p style='color: #000;'>"
			 +"     Detalles de la reserva: [Nombre del Espacio Reservado], [Fecha de la Reserva], desde "
	           +"     [Hora de Inicio] hasta [Hora de Finalización]. "
	          +"  </p>"
	          +"  <p style='color: #000;'>"
			  +"      Llega al menos 10 minutos antes para cualquier preparación necesaria."
	           +" </p>"
	            
	         +"   <p style='text-align:center;' > ¡Te esperamos pronto! </p>"
	         +"   <div style='background-color: #202C4A; margin: auto; padding: 30px;'>"
	              
	         +"   </div>"
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
	
	@GetMapping("/enviar-correo-desactivar-cuenta")
	public String enviarCorreoDesactivarCorreo() {
		try {
			String destinatario="asignaweb@gmail.com";
			String asunto="Cuenta desactivada";
			String cuerpo=""
			
	    +"	 <div style='background-color: #CCCCCC;'>"
	    +"   <div style='background-color: white; width: 40%; margin: auto; padding: 20px;'>"
	        +"    <div style='background-color: #202C4A; padding: 11px;'>"
	       +"         <center><img style='width: 110px; height: 100px;' src='./5613765 [Recuperado].png'></center>"
	       +"      </div>"
	      +"      <h1 style='color: #ec0808;'>¡Desactivada tu cuenta!</h1>"
			+"      <p style='color: #000;'>"
			+"          Para activar tu cuenta en AsignaWeb, envía un "
	     +"           correo electrónico a asignaweb@gmail.com con el"
	     +"           asunto 'Solicitud de Activación de Cuenta'</p> "
	     +"           <p>Ten en cuenta que, aunque tu cuenta "
	     +"           esté desactivada, tu información permanecerá"
	      +"           en nuestra base de datos.</p>"
			+"          <p>Te notificaremos una vez que la activación se "
	        +"        haya completado. </p>  "
	          +"  <p style='text-align:center;' > ¡Vuelve pronto! </p>"
	         +"   <div style='background-color: #202C4A; margin: auto; padding: 30px;'>"     
	         +"   </div>"
	       +" </div>"
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
	
	@GetMapping("/enviar-correo-activar-cuenta")
	public String enviarCorreoActivarCorreo() {
		try {
			String destinatario="asignaweb@gmail.com";
			String asunto="Cuenta activa";
			String cuerpo=""
		
				+"	 <div style='background-color: #CCCCCC;'>"
				+"  <div style='background-color: white; width: 40%; margin: auto; padding: 20px;'>"
	      +"      <div style='background-color: #202C4A; padding: 11px;'>"
	      +"          <center><img style='width: 110px; height: 100px;' src='./5613765 [Recuperado].png'></center>"
	      +"      </div>"
	          +"  <h1 style='color: #2B56C5;'>¡Gracias por activar tu cuenta en AsignaWeb.!</h1>"
	            +"      <p style='color: #000;'>"
	                
	            +"       <p> Estimado/a [Nombre del Usuario].</p>"

	                
	          +"     <p>Nos alegra tenerte de vuelta. Ahora puedes disfrutar de todos nuestros servicios y reservar espacios como antes. </p> "
	           +"   <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos a través de asignaweb@gmail.com.</p>"
	           +"     <p> Agradecemos tu confianza y esperamos que disfrutes de tu experiencia en AsignaWeb.</p>"
	          
	            
	          +"  <div style='background-color: #202C4A; margin: auto; padding: 30px;'>"
	              
	         +"   </div>"
	      +"  </div>"
	 +"   </div>";
					
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
	
	

	public boolean enviarCorreo(String destinatario,String asunto,String cuerpo) throws MessagingException {
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
