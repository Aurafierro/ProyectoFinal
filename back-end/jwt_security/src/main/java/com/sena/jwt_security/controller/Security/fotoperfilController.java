package com.sena.jwt_security.controller.Security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.sena.jwt_security.interfaceService.IFotoperfilService;
import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.models.FotoPerfil;

import com.sena.jwt_security.models.respuesta;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.FileStorageService;


@RestController
@RequestMapping("api/v1/fotoperfil")
@CrossOrigin
public class fotoperfilController {

	
	 @Autowired
	    private IFotoperfilService FotoperfilService;

	    @Autowired
	    private FileStorageService fileStorageService;
	    
	    @Autowired
	    private IUserService userService;

	    @GetMapping("/")
	    public ResponseEntity<Object> consultarListaFotoperfilJson() {
	        List<FotoPerfil> listaFotoperfil = FotoperfilService.consultarlistafotoperfil();

	        // Establecer la imagen_url como nula para todos los espacios si es necesario
	        for (FotoPerfil FotoPerfil : listaFotoperfil) {
	        	FotoPerfil.setImagen_base(null); // Se elimina el arreglo de bytes
	        }

	        return new ResponseEntity<>(listaFotoperfil, HttpStatus.OK);
	    }

	    @PostMapping("/")
	    public ResponseEntity<Object> guardarFotoperfilJson(
	            @ModelAttribute FotoPerfil FotoPerfil, 
	            @RequestParam("file") MultipartFile file) {  // Ya no recibimos id_user en el request
	        try {
	            // Obtener el usuario autenticado del contexto de seguridad
	            org.springframework.security.core.Authentication authentication = 
	                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
	            String username = authentication.getName();  // Esto obtiene el nombre de usuario (o correo)

	            // Buscar el usuario en la base de datos usando el nombre de usuario obtenido
	            List<userRegistro> usuarioList = userService.filtroIngresoUserByEmail(username);
	            
	            if (usuarioList.isEmpty()) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                     .body("Usuario no encontrado");
	            }

	            userRegistro usuario = usuarioList.get(0);  // Obtener el usuario

	            // Asignar el usuario al FotoPerfil
	            FotoPerfil.setId_user(usuario);

	            // Almacenar el archivo y obtener el nombre del archivo
	            String fileName = fileStorageService.storeFile(file);
	            FotoPerfil.setImagen_url("http://localhost:8080/api/downloadFile/" + fileName);

	            // Guardar la entidad FotoPerfil en la base de datos
	            FotoperfilService.save(FotoPerfil);

	            respuesta respuesta = new respuesta("ok", "Se guardó correctamente");
	            return new ResponseEntity<>(respuesta, HttpStatus.OK);

	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                                 .body("Failed to upload file: " + e.getMessage());
	        }
	    }



}
