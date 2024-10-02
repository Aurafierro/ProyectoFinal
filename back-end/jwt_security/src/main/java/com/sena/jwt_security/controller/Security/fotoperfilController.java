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

import com.fasterxml.jackson.databind.ObjectMapper;
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
        try {
            List<FotoPerfil> listaFotoperfil = FotoperfilService.consultarlistafotoperfil();

            // Establecer la imagen_url como nula para todos los espacios si es necesario
            for (FotoPerfil fotoPerfil : listaFotoperfil) {
                fotoPerfil.setImagen_base(null); // Se elimina el arreglo de bytes
            }

            return new ResponseEntity<>(listaFotoperfil, HttpStatus.OK);
        } catch (Exception e) {
            // Manejo de excepciones para devolver un mensaje adecuado en caso de error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error al consultar la lista de fotos de perfil: " + e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<Object> guardarFotoperfilJson(
            @RequestParam("fotoPerfil") MultipartFile file,
            @RequestParam("fotoPerfilJson") String fotoPerfilJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            FotoPerfil fotoPerfil = objectMapper.readValue(fotoPerfilJson, FotoPerfil.class);
            
            String username = org.springframework.security.core.context.SecurityContextHolder.getContext()
                                  .getAuthentication().getName();

            List<userRegistro> usuarioList = userService.filtroIngresoUserByEmail(username);
            
            if (usuarioList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body("Usuario no encontrado");
            }

            userRegistro usuario = usuarioList.get(0); // Obtener el usuario
            
            fotoPerfil.setId_user(usuario.getId_user());
           
            if (file != null && !file.isEmpty()) {
                String fileName = fileStorageService.storeFile(file);
                fotoPerfil.setImagen_url("http://localhost:8080/api/downloadFile/" + fileName);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                     .body("Archivo no proporcionado o está vacío");
            }

            FotoperfilService.save(fotoPerfil);

            respuesta respuesta = new respuesta("ok", "Se guardó correctamente");
            return new ResponseEntity<>(respuesta, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error al subir el archivo: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error inesperado: " + e.getMessage());
        }
    }
}
