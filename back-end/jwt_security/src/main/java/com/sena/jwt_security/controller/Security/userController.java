package com.sena.jwt_security.controller.Security;




import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.rol;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.AuthService;
import com.sena.jwt_security.service.emailService;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class userController {

	

@Autowired
private IUserService userService;
@Autowired
private emailService emailService;


@Autowired
private AuthService AuthService;


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
        if (userRegistro.getUsername().equals("")) {
            
            return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
          
		userService.save(userRegistro);
		emailService.enviarNotificacionCuenta(userRegistro.getUsername(),userRegistro.getNombre_completo(),userRegistro.getUsername(),userRegistro.getPassword());
		return new ResponseEntity<>(userRegistro,HttpStatus.OK);
	}	

	@GetMapping("/")
	public ResponseEntity<Object>findAll(){
		var ListaUserRegistro = userService.findAll();
		return new ResponseEntity<>(ListaUserRegistro, HttpStatus.OK);
	}
	
	
	@GetMapping("/profile")
	public ResponseEntity<userRegistro>getProfile(){
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		userRegistro user=(userRegistro) auth.getPrincipal();
		return new ResponseEntity<userRegistro>(user,HttpStatus.OK);
	}
	
	/*
	 * Esta anotación  protege el acceso a este método,
	 *  que  asegura de que solo los usuarios con el rol de "Administrador"
	 *   puedan acceder a ciertos métodos del controlador. 
	 *   Esto es clave para mantener la seguridad y la separación 
	 *   de roles.
	 */
	@PreAuthorize("hasRole('Administrador')")
	@PostMapping("/register/")
	public ResponseEntity<Object> register(@RequestBody resgisterRequest request) {
	    // Validaciones
	    if (request.getNumero_documento().isEmpty()) {
	        return new ResponseEntity<>("El número de identidad es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }

	    if (request.getNombre_completo().isEmpty()) {
	        return new ResponseEntity<>("El nombre completo es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }

	    if (request.getTelefono().isEmpty()) {
	        return new ResponseEntity<>("El número de teléfono es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }

	    if (request.getUsername().isEmpty()) {
	        return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }

	    // Validar formato del correo electrónico
	    if (!isValidEmail(request.getUsername())) {
	        return new ResponseEntity<>("El correo electrónico debe estar completo y en un formato válido", HttpStatus.BAD_REQUEST);
	    }

	    // Validaciones de caracteres inusuales
	    if (containsInvalidCharacters(request.getNumero_documento()) ||
	        containsInvalidCharacters(request.getNombre_completo()) ||
	        containsInvalidCharacters(request.getTelefono())) {
	        return new ResponseEntity<>("Los campos no deben contener caracteres inválidos", HttpStatus.BAD_REQUEST);
	    }

	    // Verificar si ya existe un usuario con el mismo número de documento
	    List<userRegistro> existingUserByDoc = userService.filtroIngresoUser(request.getNumero_documento());
	    if (!existingUserByDoc.isEmpty()) {
	        return new ResponseEntity<>("El usuario ya está registrado con este número de documento", HttpStatus.BAD_REQUEST);
	    }

	    // Llamar al servicio de autenticación para registrar el usuario
	    AuthResponse response = AuthService.register(request);
	    
	    return ResponseEntity.ok(response);
	}

	// Método para validar el formato del correo electrónico
	private boolean isValidEmail(String email) {
	    return email != null && email.matches("^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$");
	}

	// Método para verificar caracteres inválidos en los campos
	private boolean containsInvalidCharacters(String input) {
	    return input != null && !input.matches("^[a-zA-Z0-9_\\s]+$"); // Permite solo letras, números y espacios
	}



	/*
	@PostMapping("/register/")
	    public ResponseEntity<AuthResponse> register(@RequestBody resgisterRequest request) {
	        AuthResponse response = authService.register(request);
	        return ResponseEntity.ok(response);
	    }*/
	@GetMapping("/admin/findAll/")
	public ResponseEntity<String>findAllAdmin(){
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		var user =(userRegistro)auth.getPrincipal();
		if (user.getRol()!=rol.Administrador)
			return new ResponseEntity<String>("No tiene permiso",HttpStatus.FORBIDDEN);
		return new ResponseEntity<String>("Método administrador",HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaUserRegistro = userService.filtroIngresoUser(filtro);
		return new ResponseEntity<>(ListaUserRegistro, HttpStatus.OK);
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
	public ResponseEntity<Object> update(@PathVariable String id_user, @RequestBody userRegistro userUpdate) { 
		var user = userService.findOne(id_user).get();
		if (user != null) {
	
			user.setTipo_documento(userUpdate.getTipo_documento());
			user.setNumero_documento(userUpdate.getNumero_documento());
			user.setNombre_completo(userUpdate.getNombre_completo());
			user.setTelefono(userUpdate.getTelefono());
			user.setUsername(userUpdate.getUsername());
			user.setRol(userUpdate.getRol());
			user.setPassword(userUpdate.getPassword());
		
			userService.save(user);
			return new ResponseEntity<>("Guardado", HttpStatus.OK);

		} else {
			return new ResponseEntity<>("Error usuario no encontrado", HttpStatus.BAD_REQUEST);
		}
	}

}
