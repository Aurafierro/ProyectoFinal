package com.sena.jwt_security.controller.Security;




import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.emailService;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class userController {

	

@Autowired
private IUserService userService;
@Autowired
private emailService emailService;

private static int numeroAleatorioEnRango(int minimo, int maximo) {
	
	//nextInt regresa en rango pero con limite superior exclusivo.
	
	return  ThreadLocalRandom.current().nextInt(minimo, maximo +1);
	
}

private String codigoAleatorio() {
	int longitud =10;
	
	String banco ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$%#";
	
	//CADENA EN DONDE  SE VA IR AGREGANDO UN CÁCTER ALEATORIO
	
	String cadena ="";
	for (int x = 0; x < longitud; x++) {
		int indiceAleatorio =numeroAleatorioEnRango(0, banco.length()-1);
		char caracterAleatorio = banco.charAt(indiceAleatorio);
		cadena += caracterAleatorio;
	}
	
	return cadena;
}


@PostMapping("/")
public ResponseEntity<Object> save(@RequestBody userRegistro userRegistro) {
	    
    List<userRegistro> user = userService.filtroIngresoUser(userRegistro.getNumero_documento());
	    if (!user.isEmpty()) {
	        return new ResponseEntity<>("El usuario ya tiene un ingreso activo", HttpStatus.BAD_REQUEST);
	    }
	    if (userRegistro.getNumero_documento().equals("")) {

            return new ResponseEntity<>("El numero de identidad es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (userRegistro.getNombre_completo().equals("")) {
            
            return new ResponseEntity<>("El nombre completo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

       

        if (userRegistro.getTelefono().equals("")) {
            
            return new ResponseEntity<>("El numero de télefono es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
        

       /* if (userRegistro.getContrasena() == null || userRegistro.getContrasena().isEmpty()) {
            return new ResponseEntity<>("La contraseña es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (userRegistro.getConfirmar_contrasena() == null || userRegistro.getConfirmar_contrasena().isEmpty()) {
            return new ResponseEntity<>("Confirmar contraseña es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
  */

        if (userRegistro.getCorreo().equals("")) {
            
            return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
        
        
        userRegistro.setContrasena(codigoAleatorio());
		userService.save(userRegistro);
		emailService.enviarNotificacionCuenta(userRegistro.getCorreo(),userRegistro.getNombre_completo(),userRegistro.getCorreo(),userRegistro.getContrasena());
		return new ResponseEntity<>(userRegistro,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object>findAll(){
		var ListaUserRegistro = userService.findAll();
		return new ResponseEntity<>(ListaUserRegistro, HttpStatus.OK);
	}
	

	
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaUserRegistro = userService.filtroIngresoUser(filtro);
		return new ResponseEntity<>(ListaUserRegistro, HttpStatus.OK);
	}
	
	@GetMapping("/prueba/{nombre}/")
	public String prueba(@PathVariable String nombre) {
		return "Hola ";
	}
	
	@GetMapping("/{id_user}")
	public ResponseEntity<Object> findOne ( @PathVariable String id_user ){
		var user= userService.findOne(id_user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	   @DeleteMapping ("/{id_user}")
		public ResponseEntity<Object> delete(@PathVariable String id_user){
			 userService.delete(id_user);
					return new ResponseEntity<>("Usuario eliminado con éxito",HttpStatus.OK);
		}
	   
	
	@PutMapping("/{id_user}")
	public ResponseEntity<Object> update(@PathVariable String id_user, @ModelAttribute("userRegistro") userRegistro userUpdate) {
	   
		
		var user = userService.findOne(id_user).get();
		if (user != null) {
			
			


			user.setTipo_documento(userUpdate.getTipo_documento());
			user.setNumero_documento(userUpdate.getNumero_documento());
			user.setNombre_completo(userUpdate.getNombre_completo());
			user.setTelefono(userUpdate.getTelefono());
			user.setCorreo(userUpdate.getCorreo());
			user.setRol(userUpdate.getRol());
			user.setContrasena(userUpdate.getContrasena());
		

			userService.save(user);
			return new ResponseEntity<>("Guardado", HttpStatus.OK);

		} else {
			return new ResponseEntity<>("Error usuario no encontrado", HttpStatus.BAD_REQUEST);
		}
	}


}
