package com.sena.jwt_security.service;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.interfaces.UserRegistroRepository;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.estadoUser;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.preregisterRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.rol;
import com.sena.jwt_security.models.userRegistro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;



import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class AuthService implements IUserService {

	@Autowired
    private UserRegistroRepository userRegistroRepository;
	
	@Autowired
	private emailService emailService;
    private final Iuser data;
    private final jwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender javaMailSender; 
  
    public AuthService(Iuser data, jwtService jwtService, PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager,JavaMailSender javaMailSender) {
        this.data = data;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.javaMailSender = javaMailSender; 
    }
    @Override
    public AuthResponse register(resgisterRequest request) {
        userRegistro userData = new userRegistro();
        userData.setTipo_documento(request.getTipo_documento());
        userData.setNumero_documento(request.getNumero_documento());
        userData.setNombre_completo(request.getNombre_completo());
        userData.setUsername(request.getUsername());

        // Generar contraseña aleatoria
        String contrasena = codigoAleatorio();
        userData.setPassword(passwordEncoder.encode(contrasena));

        userData.setRol(request.getRol());
        userData.setVerificar_contrasena(true); // Requiere cambiar la contraseña

        // Establecer el estado como "cuenta_activa" para ambos roles
        userData.setEstadoUser(estadoUser.cuenta_activa);

        // Guardar usuario
        data.save(userData);

        // Enviar notificación al correo
        emailService.enviarNotificacionCuenta(
            userData.getUsername(),
            userData.getNombre_completo(),
            userData.getUsername(),
            contrasena
        );

        return AuthResponse.builder()
                .token(jwtService.getToken(userData))
                .build();
    }

    
    @Override
    public AuthResponse preregister(preregisterRequest request) {
        userRegistro userData = new userRegistro();
        userData.setTipo_documento(request.getTipo_documento());
        userData.setNumero_documento(request.getNumero_documento());
        userData.setNombre_completo(request.getNombre_completo());
        userData.setUsername(request.getUsername());

        // Generar contraseña aleatoria
        String contrasena = codigoAleatorio();
        userData.setPassword(passwordEncoder.encode(contrasena));

        userData.setRol(request.getRol());
        userData.setVerificar_contrasena(true); // Requiere cambiar la contraseña

        // Estado inicial como "cuenta_inactiva" (pre-registro)
        userData.setEstadoUser(estadoUser.cuenta_inactiva);

        // Guardar usuario
        data.save(userData);

        // Crear una respuesta sin token ya que aún no se ha aprobado
        return AuthResponse.builder()
                .message("Pre-registro exitoso, pendiente de aprobación.")
                .token(null)
                .build();
    }

    
 
    
    public AuthResponse loginRequest(loginRequest request) {
        // Verificar que el username no sea nulo o vacío
    	 // Verificar que el username no sea nulo o vacío
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario no puede ser nulo o vacío.");
        }

        // Proceder con la autenticación
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Nombre de usuario o contraseña incorrectos.");
        }

        // Obtener el usuario autenticado
        userRegistro user = findByUsername(request.getUsername()).orElseThrow();

        // Verificar el estado del usuario antes de continuar
        if (user.getEstadoUser() != estadoUser.cuenta_activa) {
            throw new IllegalArgumentException("La cuenta no está activa o no ha sido aprobada.");
        }

        // Comprobar si es la primera vez que se loguea
        if (user.isVerificar_contrasena()) {
            user.setVerificar_contrasena(false);
            data.save(user); // Guarda los cambios en la base de datos
        }

        // Generar el token de autenticación
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }
    private static int numeroAleatorioEnRango(int minimo, int maximo) {
    	//nextInt regresa en rango pero con limite superior exclusivo.
    	return  ThreadLocalRandom.current().nextInt(minimo, maximo +1);
    	
    }

    private String codigoAleatorio() {
    	int longitud =10;
    	
    	String banco = "abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$%#";

    	//CADENA EN DONDE  SE VA IR AGREGANDO UN CÁCTER ALEATORIO
    	String cadena ="";
    	for (int x = 0; x < longitud; x++) {
    		int indiceAleatorio =numeroAleatorioEnRango(0, banco.length()-1);
    		char caracterAleatorio = banco.charAt(indiceAleatorio);
    		cadena += caracterAleatorio;
    	}
    	
    	return cadena.toString(); 
    }
    
    @Override
    public AuthResponse login(loginRequest request) {
        // Autenticar al usuario con el AuthenticationManager
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        // Buscar el usuario autenticado en la base de datos
        userRegistro user = findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        // Generar el token JWT
        String token = jwtService.getToken(user);

        // Retornar la respuesta con el token
        return AuthResponse.builder()
                .token(token)
                .build();
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
	@Override
	public void savePasswordResetToken(userRegistro user, String token) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<userRegistro> enviarNotificacionCuenta(String numero_documento) {
	    // Busca usuarios con el número de documento proporcionado
	    List<userRegistro> usuarios = userRegistroRepository.enviarNotificacionCuenta(numero_documento);
	    
	    // Verifica si se encontraron usuarios
	    if (usuarios.isEmpty()) {
	        throw new RuntimeException("No se encontró usuario con el documento: " + numero_documento);
	    }
	    
	    // Aquí puedes implementar la lógica para enviar la notificación por correo, si es necesario
	    // Por ejemplo:
	    for (userRegistro usuario : usuarios) {
	        // Lógica para enviar notificación (ejemplo de llamada a un servicio de email)
	        // emailService.enviarNotificacionCuenta(usuario.getEmail(), usuario.getNombreCompleto(), ...);
	    }
	    
	    // Devuelve la lista de usuarios encontrados
	    return usuarios;
	}
	@Override
	public List<userRegistro> filtroIngresoUserByEmail(String username) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public userRegistro findById(String idUser) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String generarContrasenaAleatoria() {
	    return codigoAleatorio();
	}
	@Override
	public List<userRegistro> obtenerUsuariosPorEstado(estadoUser cuentaInactiva) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<userRegistro> obtenerUsuariosInactivos() {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
