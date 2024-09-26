package com.sena.jwt_security.service;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.interfaces.Iuser;
import com.sena.jwt_security.interfaces.UserRegistroRepository;
import com.sena.jwt_security.models.AuthResponse;
import com.sena.jwt_security.models.loginRequest;
import com.sena.jwt_security.models.resgisterRequest;
import com.sena.jwt_security.models.userRegistro;

import org.springframework.beans.factory.annotation.Autowired;
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
        String contrasena = codigoAleatorio();  // Almacena la contraseña original
        userData.setPassword(passwordEncoder.encode(contrasena));  // Almacena la versión encriptada

        userData.setRol(request.getRol());
        userData.setVerificar_contrasena(true);  // Establecer en true para indicar que se requiere cambiar la contraseña

        // Guardar el usuario en la base de datos
        data.save(userData);
        
        // Enviar la contraseña original por correo en texto plano
        emailService.enviarNotificacionCuenta(
            userData.getUsername(), 
            userData.getNombre_completo(), 
            userData.getUsername(), 
            contrasena  // Enviar la contraseña original
        );

        return AuthResponse.builder()  // Corregido el uso del constructor de AuthResponse
                .token(jwtService.getToken(userData))
                .build();
    }


    
    
    public AuthResponse loginRequest(loginRequest request) {
        // Longitud esperada de la contraseña
        int expectedLength = 8; // Ajusta según tu requerimiento

        // Verificación de la longitud de la contraseña
        if (request.getPassword().length() != expectedLength) {
            throw new IllegalArgumentException("La contraseña debe tener exactamente " + expectedLength + " caracteres.");
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
            throw new IllegalArgumentException("Nombre de usuario o contraseña incorrectos."); // Manejo de errores mejorado
        }

        // Obtener el usuario autenticado
        userRegistro user = findByUsername(request.getUsername()).orElseThrow();

        // Comprobar si es la primera vez que se loguea
        if (user.isVerificar_contrasena()) { // Si es la primera vez
            // Aquí no se hace nada especial, simplemente se permite el inicio de sesión
            // El estado de verificar_contrasena se mantiene en true (1)
        } else {
            // Si ya se ha logueado antes, se debe cambiar el estado a false
            user.setVerificar_contrasena(false); // Cambiar a false para indicar que ya no necesita cambiar la contraseña

            // Guardar los cambios en la base de datos
            try {
                data.save(user); // Guarda los cambios en la base de datos
            } catch (Exception e) {
                throw new IllegalStateException("Error al actualizar el estado de verificar_contrasena: " + e.getMessage());
            }

            // Confirmar si el estado se actualizó correctamente
            userRegistro updatedUser = findByUsername(request.getUsername()).orElseThrow();
            if (updatedUser.isVerificar_contrasena()) {
                throw new IllegalStateException("El estado de verificar_contrasena no se actualizó correctamente.");
            }
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
    	
    	String banco ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$%#";
    	
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

}
