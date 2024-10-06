package com.sena.jwt_security.controller.Security;




import java.util.Base64;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.sena.jwt_security.models.CambiarContrasenaRequest;
import com.sena.jwt_security.models.CambioCotrasenaRequest;
import com.sena.jwt_security.models.RecuperarContrasenaRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.respuesta;
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


@Autowired
private PasswordEncoder passwordEncoder;


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
        
        if (userRegistro.getUsername().equals("")) {
            
            return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
          
        userRegistro.setEstado(true);
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
	
	@PreAuthorize("hasRole('Administrador')")
	@PostMapping("/register/")
	public ResponseEntity<Object> register(@RequestBody resgisterRequest request) {
	    if (request.getNumero_documento().isEmpty()) {
	        return new ResponseEntity<>("El número de identidad es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }
	    if (request.getNombre_completo().isEmpty()) {
	        return new ResponseEntity<>("El nombre completo es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }
	    if (request.getUsername().isEmpty()) {
	        return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
	    }
	    if (!isValidEmail(request.getUsername())) {
	        return new ResponseEntity<>("El correo electrónico debe estar completo y en un formato válido", HttpStatus.BAD_REQUEST);
	    }

	    // Verificar si ya existe un usuario con el mismo número de documento
	    List<userRegistro> existingUserByDoc = userService.filtroIngresoUser(request.getNumero_documento());
	    if (!existingUserByDoc.isEmpty()) {
	        return new ResponseEntity<>("El usuario ya está registrado con este número de documento", HttpStatus.BAD_REQUEST);
	    }
	    
	    // Verificar si ya existe un usuario con el mismo correo electrónico
	    List<userRegistro> existingUserByEmail = userService.filtroIngresoUserByEmail(request.getUsername());
	    if (!existingUserByEmail.isEmpty()) {
	        return new ResponseEntity<>("El correo electrónico ya está registrado", HttpStatus.BAD_REQUEST);
	    }

	    // Establecer el estado del usuario como Activo (1 o true)
	    request.setEstado(true); // o request.setEstado(true); o request.setEstado("Activo");
	    
	    // Llamar al servicio de autenticación para registrar el usuario
	    AuthResponse response = AuthService.register(request);
	    
	    return ResponseEntity.ok(response);
	}


	// Método para validar el formato del correo electrónico
	private boolean isValidEmail(String email) {
	    return email != null && email.matches("^[\\w-\\.]+@[\\w-]+\\.[a-zA-Z]{2,}$");
	}

	@GetMapping("/admin/findAll/")
	public ResponseEntity<Map<String, Object>> findAllAdmin() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    var user = (userRegistro) auth.getPrincipal();
	    
	    Map<String, Object> response = new HashMap<>();
	    
	    // Devolver el rol del usuario
	    if (user.getRol() == rol.Administrador) {
	        response.put("role", "Admin");
	    } else {
	        response.put("role", "Usuario"); // Asignar "Usuario" para roles no administradores
	    }
	    
	    return new ResponseEntity<>(response, HttpStatus.OK); // Cambiar a OK para ambos roles
	}


	@GetMapping("/rol")
	   public ResponseEntity<Object> getRole() {
	       Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	       
	       if (auth == null || !(auth.getPrincipal() instanceof userRegistro)) {
	           return ResponseEntity
	                   .status(HttpStatus.UNAUTHORIZED)
	                   .body(Collections.singletonMap("message", "Usuario no autenticado"));
	       }

	       userRegistro user = (userRegistro) auth.getPrincipal();
	       rol rol = user.getRol(); //

	       if (rol == null) {
	           return ResponseEntity
	                   .status(HttpStatus.NOT_FOUND)
	                   .body(Collections.singletonMap("message", "Rol no encontrado"));
	       }
	       
	       return ResponseEntity.ok(Collections.singletonMap("role", rol.name()));
	   }
	
	@PutMapping("/cambiar-contrasena")
	public ResponseEntity<respuesta> cambiarContraseña(@RequestBody CambiarContrasenaRequest request) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    userRegistro user = (userRegistro) auth.getPrincipal();
	    var respuesta = new respuesta("", "");

	    String nuevaContrasena = request.getNuevaContrasena();

	    if (passwordEncoder.matches(nuevaContrasena, user.getPassword())) {
	        respuesta.setStatus(HttpStatus.BAD_REQUEST.toString());
	        respuesta.setMessage("La nueva contraseña no puede ser igual a la anterior");
	        return new ResponseEntity<>(respuesta, HttpStatus.BAD_REQUEST);
	    }

	    if (!nuevaContrasena.equals(request.getConfirmarContrasena())) {
	        respuesta.setStatus(HttpStatus.BAD_REQUEST.toString());
	        respuesta.setMessage("La nueva contraseña y la confirmación no coinciden");
	        return new ResponseEntity<>(respuesta, HttpStatus.BAD_REQUEST);
	    }

	    if (!esContrasenaValida(nuevaContrasena)) {
	        respuesta.setStatus(HttpStatus.BAD_REQUEST.toString());
	        respuesta.setMessage("La nueva contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial.");
	        return new ResponseEntity<>(respuesta, HttpStatus.BAD_REQUEST);
	    }

	    // Establecer la nueva contraseña
	    user.setPassword(passwordEncoder.encode(nuevaContrasena));
	    user.setVerificar_contrasena(false); //
	    userService.save(user);

	    // Enviar correo de confirmación
	    emailService.enviarCorreoPasswordModificada(user.getUsername());

	    // Configurar la respuesta de éxito
	    respuesta.setStatus(HttpStatus.OK.toString());
	    respuesta.setMessage("Cambio de contraseña exitoso");

	    return new ResponseEntity<>(respuesta, HttpStatus.OK);
	}


	private boolean esContrasenaValida(String contraseña) {
	    if (contraseña.length() < 8) {
	        return false;
	    }

	    boolean tieneMayuscula = contraseña.chars().anyMatch(Character::isUpperCase);
	    boolean tieneNumero = contraseña.chars().anyMatch(Character::isDigit);
	    boolean tieneCaracterEspecial = contraseña.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*");

	    return tieneMayuscula && tieneNumero && tieneCaracterEspecial;
	}

	@GetMapping("/cambiar-contrasena")
	public ResponseEntity<?> verificarContrasena() {
	    try {
	        // Obtener el usuario autenticado directamente desde el contexto de seguridad
	        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	        userRegistro user = (userRegistro) auth.getPrincipal(); // Aquí obtienes el usuario autenticado

	        if (user == null) {
	            return new ResponseEntity<>("Usuario no encontrado.", HttpStatus.NOT_FOUND);
	        }

	        // Verificar si el usuario necesita cambiar su contraseña
	        boolean verificarContrasena = user.isVerificar_contrasena(); // Campo booleano que indica si debe cambiar su contraseña

	        Map<String, Object> response = new HashMap<>();
	        response.put("verificar_contrasena", verificarContrasena);

	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        return new ResponseEntity<>("Error al verificar la contraseña: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	@PostMapping("/recuperar-contrasena")
	public ResponseEntity<Map<String, String>> recuperarContrasena(@RequestBody RecuperarContrasenaRequest request) {
	    Map<String, String> response = new HashMap<>();

	    if (request.getUsername() == null || request.getUsername().isEmpty()) {
	        response.put("message", "El correo es un campo obligatorio");
	        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	    }

	    if (!isValidEmail(request.getUsername())) {
	        response.put("message", "El correo electrónico debe estar completo y en un formato válido");
	        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	    }

	    java.util.Optional<userRegistro> optionalUser = userService.findByUsername(request.getUsername());

	    if (!optionalUser.isPresent()) {
	        response.put("message", "El usuario no existe");
	        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	    }

	    userRegistro user = optionalUser.get();
	    String token = UUID.randomUUID().toString();
	    userService.savePasswordResetToken(user, token);
	    
	    String enlace = "https://asignaweb.com/cambiar_contrasena?u=" + 
                Base64.getEncoder().encodeToString(user.getUsername().getBytes()) + 
                "&t=" + token;


	    emailService.enviarCorreoRecuperarPassword(user.getUsername(), enlace);
	    
	    response.put("message", "Se ha enviado un enlace para recuperar la contraseña");
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

	
	@PutMapping("/cambio-contrasena")
	public ResponseEntity<String> cambiarContrasena(@RequestBody CambioCotrasenaRequest request) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    userRegistro user = (userRegistro) auth.getPrincipal();

	    // Verificar la contraseña antigua
	    if (!passwordEncoder.matches(request.getAntiguaContrasena(), user.getPassword())) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body("La contraseña antigua no es correcta");
	    }

	    String nuevaContrasena = request.getNuevaContrasena();

	    if (passwordEncoder.matches(nuevaContrasena, user.getPassword())) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body("La nueva contraseña no puede ser igual a la antigua");
	    }

	    if (!nuevaContrasena.equals(request.getConfirmarContrasena())) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body("La nueva contraseña y la confirmación no coinciden");
	    }

	    if (!esContrasenaValida(nuevaContrasena)) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body("La nueva contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial.");
	    }

	    // Actualizar la contraseña
	    user.setPassword(passwordEncoder.encode(nuevaContrasena));
	    userService.save(user);

	    // Enviar correo de confirmación
	    emailService.enviarCorreoPasswordModificada(user.getUsername());

	    return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Contraseña cambiada exitosamente");
	}

	@PostMapping("/cerrar-sesion")
	public ResponseEntity<String> logout() {
	    // solo devolver una respuesta confirmando el cierre de sesión.
	    return new ResponseEntity<>("Cierre de sesión exitoso", HttpStatus.OK);
	}

	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaUserRegistro = userService.filtroIngresoUser(filtro);
		return new ResponseEntity<>(ListaUserRegistro, HttpStatus.OK);
	}
	
	@GetMapping("/{id_user}")
	public ResponseEntity<Object> findOne(@PathVariable String id_user) {
	    // Buscar el usuario por ID
	    var optionalUser = userService.findOne(id_user);
	    
	    // Verificar si el usuario existe
	    if (optionalUser.isPresent()) {
	        return new ResponseEntity<>(optionalUser.get(), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(Collections.singletonMap("message", "Error: usuario no encontrado"), HttpStatus.NOT_FOUND);
	    }
	}

	
	
	   @DeleteMapping ("/{id_user}")
		public ResponseEntity<Object> delete(@PathVariable String id_user){
			 userService.delete(id_user);
					return new ResponseEntity<>("Usuario eliminado con éxito",HttpStatus.OK);
		}
	   
	
	   @PutMapping("/{id_user}")
	   public ResponseEntity<Map<String, Object>> update(@PathVariable String id_user, @RequestBody userRegistro userUpdate) {
	       // Buscar el usuario por ID
	       var optionalUser = userService.findOne(id_user);

	       if (optionalUser.isPresent()) {
	           userRegistro user = optionalUser.get();

	           // Actualizar los detalles del usuario si no son nulos
	           if (userUpdate.getTipo_documento() != null) {
	               user.setTipo_documento(userUpdate.getTipo_documento());
	           }
	           if (userUpdate.getNumero_documento() != null) {
	               user.setNumero_documento(userUpdate.getNumero_documento());
	           }
	           if (userUpdate.getNombre_completo() != null) {
	               user.setNombre_completo(userUpdate.getNombre_completo());
	           }
	           if (userUpdate.getUsername() != null) {
	               // Validar el nuevo correo
	               if (!isValidEmail(userUpdate.getUsername())) {
	                   return new ResponseEntity<>(Collections.singletonMap("error", "El correo electrónico debe estar completo y en un formato válido"), HttpStatus.BAD_REQUEST);
	               }
	               user.setUsername(userUpdate.getUsername());
	           }
	           if (userUpdate.getRol() != null) {
	               user.setRol(userUpdate.getRol());
	           }

	           // Opcional: Encriptar la nueva contraseña si se está actualizando
	           if (userUpdate.getPassword() != null && !userUpdate.getPassword().isEmpty()) {
	               user.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
	           }

	           // Guardar el usuario actualizado
	           userService.save(user);
	           return new ResponseEntity<>(Collections.singletonMap("message", "Usuario actualizado correctamente"), HttpStatus.OK);
	       } else {
	           return new ResponseEntity<>(Collections.singletonMap("error", "Error: usuario no encontrado"), HttpStatus.NOT_FOUND);
	       }
	   }

	@GetMapping("/verificar-contrasena")
	public ResponseEntity<Object> verificarEstadoContrasena() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

	    if (auth == null || !(auth.getPrincipal() instanceof userRegistro)) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(Collections.singletonMap("message", "Usuario no autenticado"));
	    }

	    userRegistro user = (userRegistro) auth.getPrincipal();
	    boolean verificarContrasena = user.isVerificar_contrasena(); // Obtener el estado

	    return ResponseEntity.ok(Collections.singletonMap("verificar_contrasena", verificarContrasena));
	}

	@GetMapping("/verificar-estado")
	public ResponseEntity<Map<String, Object>> verificarEstado() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

	    if (auth == null || !(auth.getPrincipal() instanceof userRegistro)) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(Collections.singletonMap("message", "Usuario no autenticado"));
	    }

	    userRegistro user = (userRegistro) auth.getPrincipal();
	    String estado = user.isEstado() ? "Activo" : "Inactivo"; // Cambiar aquí

	    return ResponseEntity.ok(Collections.singletonMap("estado", estado));
	}


	@PutMapping("/desactivar/{id_user}")
	public ResponseEntity<Object> desactivarUsuario(@PathVariable String id_user) {
	    var optionalUser = userService.findOne(id_user);

	    if (optionalUser.isPresent()) {
	        userRegistro user = optionalUser.get();

	        // Verificar si el usuario ya está desactivado
	        if (!user.isEstado()) {
	            return new ResponseEntity<>(Collections.singletonMap("message", "La cuenta ya está inactiva."), HttpStatus.BAD_REQUEST);
	        }

	        // Desactivar la cuenta del usuario
	        user.setEstado(false); // 'false' significa desactivado
	        userService.save(user);

	        // Enviar correo de desactivación
	        String destinatario = user.getUsername(); // Asegúrate de que el usuario tenga un método para obtener el email
	        String emailStatus = emailService.enviarCorreoDesactivacionCuenta(destinatario);

	        return new ResponseEntity<>(Collections.singletonMap("estado", "Inactivo, " + emailStatus), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(Collections.singletonMap("error", "Error: usuario no encontrado"), HttpStatus.NOT_FOUND);
	    }
	}


	@PutMapping("/activar/{id_user}")
	public ResponseEntity<Object> activarUsuario(@PathVariable String id_user) {
	    var optionalUser = userService.findOne(id_user);

	    if (optionalUser.isPresent()) {
	        userRegistro user = optionalUser.get();
	        user.setEstado(true); // 'true' significa activado
	        userService.save(user);
	        
	        return new ResponseEntity<>(Collections.singletonMap("estado", "Activo"), HttpStatus.OK); // Cambiar aquí
	    } else {
	        return new ResponseEntity<>(Collections.singletonMap("error", "Error: usuario no encontrado"), HttpStatus.NOT_FOUND);
	    }
	}


}
