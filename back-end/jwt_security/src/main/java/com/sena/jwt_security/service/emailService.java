package com.sena.jwt_security.service;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.userRegistro;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class emailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public String enviarNotificacionCuenta(String destinatario, String nombre_completo, String username, String password ) {

		try {
			
			
			String asunto="Bienvenid@ " +nombre_completo + " a AsignaWeb";
			String cuerpo=""
					+"<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>" 
			      +  "  <div style='background-color: #CCCCCC;'>" 
			       + "   <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>" 
			   +     "       <div style='background-color: #202C4A; padding: 11px; text-align: center;'>" 
			    +    "           <img style='width: 110px; height: 100px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo'>" 
			    +    "       </div>" 
			      +  "<h1 style='color: #2B56C5; text-align: center; font-size: 24px; margin-top: 20px;'>¡Bienvenid@, " + nombre_completo + " a AsignaWeb!</h1>"

			    +    "      <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>" 
			      +  "          Explora nuestra plataforma dedicada a facilitar la reserva" 
			     +   "          de sitios educativos de manera eficiente y conveniente. Con AsignaWeb," 
			     +   "          encontrarás la herramienta perfecta para gestionar tus reservas escolares" 
			    +    "          de manera sencilla, asegurando que cada visita educativa sea organizada" 
			    +    "          y productiva. Descubre cómo podemos simplificar la planificación de tus" 
			    +    "          actividades educativas. ¡Bienvenido a una nueva forma de reservar con AsignaWeb!" 
			    +    "      </p>" 
			   +     "      <br>" 
			       + "    <center>" 
			   +" <strong> Tus credenciales son las siguientes: </strong>"
			       +"<br>"
			       +"<br>"
			       
                   + "          <strong>Nombre de Usuario: </strong> " + username + " "
                   +"<br>"
                   + "          <strong>Contraseña: " + password + "</strong>"
                   +"<br>"
                        
			     
			      +  "         <a href='http://127.0.0.1:5502/HtmlYCss/indexHTML/index.html' style='text-decoration: none;'>" 
			      +  "             <button style='background-color:#2B56C5; color:white; padding:10px 20px; border:none; border-radius:14px; font-size:16px; cursor:pointer; margin-bottom:3%; margin-top:3%;'>Inicio de sesión</button>" 
			      +  "         </a>" 
			     +   "    </center>" 
			     +   "       <p style='text-align:center; font-size: 16px;'>¡Te esperamos pronto!</p>" 
			      +  "       <div style='background-color: #202C4A; margin: auto; padding: 35px;'>" 
			      +  "       </div>" 
			      +  "      </div>" 
			     +   "   </div>" 
			     +   "</body>";
			        
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

	public String enviarCorreoRecuperarPassword(String destinatario, String enlace) {
		try {
			String asunto="Recuperacion de contraseña";
			String cuerpo = "<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>"
				    + "<div style='background-color: #CCCCCC;'>"
				    + "    <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>"
				    + "        <div style='background-color: #202C4A; padding: 11px; text-align: center;'>"
				    + "            <img style='width: 90px; height: 70px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo AsignaWeb'>"
				    + "        </div>"
				    + "        <div style='text-align: center; margin-top: 20px;'>"
				    + "            <img style='width: 110px; height: 100px;' src='https://i.postimg.cc/jSVFBzwY/Recurso-1-72x.png' alt='Icono Recuperar Contraseña'>"
				    + "        </div>"
				    + "        <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>"
				    + "            Hemos recibido una solicitud para restablecer la contraseña de su cuenta en Asigna Web. "
				    + "            Para restablecer su contraseña, por favor haga clic en el siguiente enlace:"
				    + "        </p>"
				    + "        <p style='font-size: 16px; color: #000; text-align: center; margin: 20px 0;'>"
				    + "            Para restablecer su contraseña, haga clic en el siguiente enlace: " + enlace
				    + "        </p>"
				    + "        <p style='color: #000; font-size: 16px; line-height: 1.5;'>"
				    + "            Este enlace es válido por 24 horas. Si el enlace ha expirado, por favor solicite un nuevo enlace a través de la página de recuperación de cuenta."
				    + "        </p>"
				    + "        <br>"
				 
				    
				    + "        <div style='background-color: #202C4A; margin: auto; padding: 15px;'>"
		            +"         <p style='text-align:center; font-size: 16px; color: #FFFFFF;'>¡Te esperamos pronto!</p>"
				    + "        </div>"
				    + "    </div>"
				    + "</div>"
				    + "</body>";

		
			
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
				
				+"	<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>"
				+"    <div style='background-color: #CCCCCC;'>"
		+"        <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>"
		+"            <div style='background-color: #202C4A; padding: 11px; text-align: center;'>"
		+"                <img style='width: 90px; height: 70px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo'>"
		+"            </div>"
		+"            <h1 style='color: #2B56C5; text-align: center; font-size: 24px; margin-top: 20px;'>¡Excelente! Has modificado tu contraseña.</h1>"
		+"            <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>"
		+"                Queremos informarte que has modificado tu contraseña correctamente. Este es un paso importante para mantener la seguridad de tu cuenta y asegurarnos de que solo tú tengas acceso a ella."
		+"            </p>"
		+"            <br>"
		+"            <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>"
		+"                Recuerda utilizar una contraseña fuerte, que contenga una combinación de letras, números y símbolos para mejorar la protección de tu cuenta."
		+"            </p>"
		           
		            
		+"            <div style='background-color: #202C4A; margin: auto; padding: 5px;'>"
		 +"               <center><p style='font-size: 1em; color: white;'>Gracias por confiar en nosotros.</p></center>"
		+"            </div>"
		            
		+"        </div>"
		+"    </div>"
		+"</body>";
			
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
	
	
	public String enviarNotificacionReservaRealizada(userRegistro userRegistro, espacio espacio, String hora_entrada, String hora_salida, Date fecha_entrada, Date fecha_salida) {
	    try {
	        // Extraer el destinatario desde el objeto userRegistro
	        String destinatario = userRegistro.getUsername(); // Asumiendo que el campo 'username' es el correo del usuario
	        
	        String asunto = "Confirmación de reservación en Asigna Web";

	        String cuerpo = ""
	            + "<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>"
	            + "  <div style='background-color: #CCCCCC;'>"
	            + "   <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>"
	            + "       <div style='background-color: #202C4A; padding: 11px; text-align: center;'>"
	            + "           <img style='width: 110px; height: 100px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo'>"
	            + "       </div>"
	            + "       <h1 style='color: #2B56C5; text-align: center; font-size: 24px; margin-top: 20px;'>Hola, " + userRegistro.getNombre_completo() + ", confirmamos tu reservación</h1>"
	            + "       <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>"
	            + "          Esperamos que te encuentres bien. Por medio de este correo, queremos confirmar tu reserva realizada en Asigna Web."
	            + "      </p>"
	            + "      <br>"
	            + "      <strong>Detalles de la reserva:</strong>"
	            + "      <br>"
	            + "          <strong>Realizada por: </strong> " + userRegistro.getNombre_completo() + " "
	            + "      <br>"
	            + "          <strong>Espacio reservado: </strong> " + espacio.getNombre_del_espacio() + " "
	            + "      <br>"
	            + "          <strong>Hora de entrada: </strong> " + hora_entrada + " "
	            + "      <br>"
	            + "          <strong>Hora de salida: </strong> " + hora_salida + " "
	            + "      <br>"
	            + "          <strong>Fecha de entrada: </strong> " + fecha_entrada + " "
	            + "      <br>"
	            + "          <strong>Fecha de salida: </strong> " + fecha_salida + " "
	            + "      <br>"
	            + "       <p style='text-align:center; font-size: 16px;'>¡Te esperamos pronto!</p>"
	            + "       <div style='background-color: #202C4A; margin: auto; padding: 35px;'>"
	            + "       </div>"
	            + "      </div>"
	            + "   </div>"
	            + "</body>";

	        // Llamada al método que envía el correo
	        boolean retorno = enviarCorreo(destinatario, asunto, cuerpo);
	        return retorno ? "Se envió correctamente" : "No se pudo enviar";

	    } catch (Exception e) {
	        return "Error al enviar: " + e.getMessage();
	    }
	}

	
	
	public String enviarCorreoDesactivacionCuenta(String destinatario) {
		try {
			//String destinatario="asignaweb@gmail.com";
			String asunto="Desactivación de cuenta";
			String cuerpo=""
				
				+"	<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>"
				+"    <div style='background-color: #CCCCCC;'>"
		+"        <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>"
		+"            <div style='background-color: #202C4A; padding: 11px; text-align: center;'>"
		+"                <img style='width: 90px; height: 70px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo'>"
		+"            </div>"
		+"            <h1 style='color: #2B56C5; text-align: center; font-size: 24px; margin-top: 20px;'>Has desactivado tu cuenta en Asigna Web</h1>"
		+"            <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>"
		+"                Recuerda, para activar de nuevo tu cuenta en AsignaWeb, envía un correo electrónico a asignaweb@gmail.com con el asunto \"Solicitud de Activación de Cuenta\" Ten presente, aunque tu cuenta esté inactiva, tu información permanecerá en nuestra base de datos."
		+"            </p>"
		+"            <br>"
		+"            <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>"
		+"                Te notificaremos una vez que la activación se haya completado."
		+"            </p>"
		           
		            
		+"            <div style='background-color: #202C4A; margin: auto; padding: 5px;'>"
		 +"               <center><p style='font-size: 1em; color: white;'>Gracias por confiar en nosotros.</p></center>"
		+"            </div>"
		            
		+"        </div>"
		+"    </div>"
		+"</body>";
			
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
	
	
	public String enviarNotificacionRegistro(String destinatario, String nombre_completo, String username, String password ) {

		try {
			
			
			String asunto="Bienvenid@ " +nombre_completo + " a AsignaWeb";
			String cuerpo=""
					+"<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>" 
				    +  "  <div style='background-color: #CCCCCC;'>" 
				     + "   <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>" 
				 +     "       <div style='background-color: #202C4A; padding: 11px; text-align: center;'>" 
				  +    "           <img style='width: 110px; height: 100px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo'>" 
				  +    "       </div>" 
				    +  "<h1 style='color: #2B56C5; text-align: center; font-size: 24px; margin-top: 20px;'>¡Bienvenid@, " + nombre_completo + " a AsignaWeb!</h1>"

				  +    "      <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>" 
				    +  "        ¡Felicidades! Tu registro ha sido aceptado y ahora formas parte de nuestra comunidad.	" 
				   +   "   Estamos emocionados de darte la bienvenida y esperamos que disfrutes de la experiencia completa que        " 
				   +   "       ofrecemos en nuestro sitio web. Ahora podrás acceder a contenido exclusivo, participar en  " 
				  +    "      eventos especiales y aprovechar todas las funcionalidades que   " 
				  +    "       hemos diseñado pensando en ti.    " 
				 
				  +    "      </p>" 
				 +     "      <br>" 
				     + "    <center>" 
				 +" <strong> Tus credenciales son las siguientes: </strong>"
				     +"<br>"
				     +"<br>"
				     
				     + "          <strong>Nombre de Usuario: </strong> " + username + " "
				     +"<br>"
				     + "          <strong>Contraseña: " + password + "</strong>"
				     +"<br>"
				          
				   
				    +  "         <a href='http://127.0.0.1:5502/HtmlYCss/indexHTML/index.html' style='text-decoration: none;'>" 
				    +  "             <button style='background-color:#2B56C5; color:white; padding:10px 20px; border:none; border-radius:14px; font-size:16px; cursor:pointer; margin-bottom:3%; margin-top:3%;'>Inicio de sesión</button>" 
				    +  "         </a>" 
				   +   "    </center>" 
				   +   "       <p style='text-align:center; font-size: 16px;'>¡Te esperamos pronto!</p>" 
				    +  "       <div style='background-color: #202C4A; margin: auto; padding: 35px;'>" 
				    +  "       </div>" 
				    +  "      </div>" 
				   +   "   </div>" 
				   +   "</body>";
			        
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
	
	
	
	
	public String enviarNotificacionRegitroRechazado(String destinatario, String nombre_completo) {

		try {
			
			
			String asunto="Bienvenid@ " +nombre_completo + " a AsignaWeb";
			String cuerpo=""
					+"<body style='margin: 0; padding: 0; background-color: #CCCCCC;'>" 
				    +  "  <div style='background-color: #CCCCCC;'>" 
				     + "   <div style='background-color: white; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box;'>" 
				 +     "       <div style='background-color: #202C4A; padding: 11px; text-align: center;'>" 
				  +    "           <img style='width: 110px; height: 100px;' src='https://i.postimg.cc/L8hJKpjP/5613765-Recuperado.png' alt='Logo'>" 
				  +    "       </div>" 
				    +  "<h1 style='color: #2B56C5; text-align: center; font-size: 24px; margin-top: 20px;'>¡Lo sentimos, " + nombre_completo + " !</h1>"

				  +    "      <p style='color: #000; font-size: 16px; line-height: 1.5; margin-top: 20px;'>" 
				    



				    +  "        Lamentamos informarte que tu solicitud de registro en AsignaWeb ha sido rechazada por los" 
				   +   "   administradores. Si deseas obtener más información o comunicarte con el equipo de soporte, por favor envía un correo  " 
				    
				+"   <center>" 
				   +"senasofia@edu.co. "
				    
				   
				  +    "      Gracias por tu interés en AsignaWeb. " 
				 
				  +    "      </p>" 
				  +   "    </center>"


				   +   "       <p style='text-align:center; font-size: 16px;'>¡Te esperamos pronto!</p>" 
				    +  "       <div style='background-color: #202C4A; margin: auto; padding: 35px;'>" 
				    +  "       </div>" 
				    +  "      </div>" 
				   +   "   </div>" 
				   +   "</body>";
			        
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
	
}
