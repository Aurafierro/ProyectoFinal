package com.sena.jwt_security.controller.Security;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.io.IOException;


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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sena.jwt_security.interfaceService.IEspacioService;
import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.respuesta;
import com.sena.jwt_security.service.FileStorageService;



@RestController
@RequestMapping("api/v1/espacio")
@CrossOrigin
public class espacioController {

    @Autowired
    private IEspacioService espacioService;
    
    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/")
    public ResponseEntity<Object> consultarListaEspaciosJson() {
        List<espacio> listaEspacios = espacioService.consultarlistaespacio();
        
        // Establecer la imagen_base como un arreglo de bytes vacío para todos los espacios
        for (espacio espacio : listaEspacios) {
            espacio.setImagen_base(new byte[0]); // Cambiado a byte[] vacío
        }

        return new ResponseEntity<>(listaEspacios, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Object> guardarEspacioJson(@ModelAttribute espacio espacio, @RequestParam("file") MultipartFile file) {
        try {
            // Almacenar el archivo y obtener el nombre del archivo
            String fileName = fileStorageService.storeFile(file);
            espacio.setImagen_url("http://localhost:8080/api/downloadFile/" + fileName);
            
            // Guardar la imagen como byte[] en lugar de Base64
            espacio.setImagen_base(file.getBytes());  // Almacenar los bytes directamente
            
            // Guardar el espacio en la base de datos
            int retorno = espacioService.save(espacio);  // Cambiado a save

            if (retorno == 0) {    
                respuesta respuesta = new respuesta("ok", "Se guardó correctamente");
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            } else {
                respuesta respuesta = new respuesta("error", "Error al guardar");
                return new ResponseEntity<>(respuesta, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to upload file: " + e.getMessage());
        }
<<<<<<< HEAD
    }
=======
        
        
		espacioService.save(espacio);
		return new ResponseEntity<>(espacio,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object>findAll(){
		var ListaEspacio = espacioService.findAll();
		return new ResponseEntity<>(ListaEspacio, HttpStatus.OK);
	}
	
	//filtro
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var Listaespacio = espacioService.filtroEspacio(filtro);
		return new ResponseEntity<>(Listaespacio, HttpStatus.OK);
	}
	//@PathVariable recibe una variable por el enlace
	
	@GetMapping("/{id_espacio}")
	public ResponseEntity<Object> findOne ( @PathVariable String id_espacio ){
		var espacio= espacioService.findOne(id_espacio);
		return new ResponseEntity<>(espacio, HttpStatus.OK);
	}
	
	

	
			@PutMapping("/{id_espacio}")
			public ResponseEntity<Object> update(@PathVariable String id_espacio, @RequestBody espacio espacioUpdate) {
			    
				// Verificar si hay campos vacíos
				
				if (espacioUpdate.contieneCamposVacios()) {
					return new ResponseEntity<>("Todos los campos son obligatorios", HttpStatus.BAD_REQUEST);
				}

				var espacio = espacioService.findOne(id_espacio).get();
				if (espacio != null) {
					  // Verificar si el titulo se está cambiando
			        if (!espacio.getNombre_del_espacio().equals(espacioUpdate.getNombre_del_espacio())) {
			            // El titulo se está cambiando, verificar si ya está en uso
			            List<espacio> espacios_con_mismo_titulo = espacioService.filtroIngresoEspacio(espacioUpdate.getNombre_del_espacio());
			            if (!espacios_con_mismo_titulo.isEmpty()) {
			                // Si hay otros espacios con el mismo número de documento, devuelve un error
			                return new ResponseEntity<>("El espacio ya está registrado", HttpStatus.BAD_REQUEST);
			            }
			        }
>>>>>>> origin/main



    // Método para buscar espacios por filtro
    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        List<espacio> listaEspacio = espacioService.filtroEspacio(filtro);
        return new ResponseEntity<>(listaEspacio, HttpStatus.OK);
    }

    // Método para consultar un espacio específico por ID
    @GetMapping("/{id_espacio}")
    public ResponseEntity<Object> findOne(@PathVariable String id_espacio) {
        Optional<espacio> espacio = espacioService.findOne(id_espacio);
        if (espacio.isPresent()) {
            return new ResponseEntity<>(espacio.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Espacio no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    // Método para actualizar un espacio existente
    @PutMapping("/{id_espacio}")
    public ResponseEntity<Object> update(@PathVariable String id_espacio, @RequestBody espacio espacioUpdate) {
        // Validar si hay campos vacíos
        String validationError = validateEspacio(espacioUpdate);
        if (validationError != null) {
            return new ResponseEntity<>(validationError, HttpStatus.BAD_REQUEST);
        }

        Optional<espacio> optionalEspacio = espacioService.findOne(id_espacio);
        if (optionalEspacio.isPresent()) {
            espacio espacio = optionalEspacio.get();

            // Verificar si el nombre del espacio está siendo modificado y ya existe
            if (!espacio.getNombre_del_espacio().equals(espacioUpdate.getNombre_del_espacio())) {
                List<espacio> espaciosConMismoNombre = espacioService.filtroIngresoEspacio(espacioUpdate.getNombre_del_espacio());
                if (!espaciosConMismoNombre.isEmpty()) {
                    return new ResponseEntity<>("El espacio ya está registrado", HttpStatus.BAD_REQUEST);
                }
            }

            // Actualizar los campos del espacio
            espacio.setNombre_del_espacio(espacioUpdate.getNombre_del_espacio());
            espacio.setClasificacion(espacioUpdate.getClasificacion());
            espacio.setCapacidad(espacioUpdate.getCapacidad());
            espacio.setDescripcion(espacioUpdate.getDescripcion());

            // Guardar los cambios
            espacioService.save(espacio);
            return new ResponseEntity<>("Espacio actualizado con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Espacio no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    // Método para eliminar un espacio por ID
    @DeleteMapping("/{id_espacio}")
    public ResponseEntity<Object> delete(@PathVariable("id_espacio") String id_espacio) {
        if (espacioService.findOne(id_espacio).isPresent()) {
            espacioService.delete(id_espacio);
            return new ResponseEntity<>("Espacio eliminado", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Espacio no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    // Método para validar los campos del espacio
    private String validateEspacio(espacio espacio) {
        if (espacio.getNombre_del_espacio().isEmpty()) {
            return "El nombre del espacio es obligatorio";
        }
        if (espacio.getClasificacion().isEmpty()) {
            return "La clasificación es obligatoria";
        }
        if (espacio.getCapacidad().isEmpty()) {
            return "La capacidad es obligatoria";
        }
        if (espacio.getDescripcion().isEmpty()) {
            return "La descripción es obligatoria";
        }
        return null;
    }
}
