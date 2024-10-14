package com.sena.jwt_security.controller.Security;


import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.io.IOException;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

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
		List<espacio> listaEspacios= espacioService.consultarlistaespacio();
		//String blob="";
		//listaEspacios.get(0).setImagen_base(blob);
		return new ResponseEntity<> (listaEspacios, HttpStatus.OK);
    }
 @PostMapping("/")
	//eliminar @RequestBody 
	public ResponseEntity<Object> guardarEspacioJson(espacio espacio, @RequestParam("file") MultipartFile file) throws IOException  {

		try {
			String fileName = fileStorageService.storeFile(file);
			espacio.setImagen_url("http://5.183.11.147:8888/api/downloadFile/" + fileName);
            
          
        } catch (IOException e) {
           
        }

		espacio.setImagen_base(Base64.getEncoder().encodeToString(file.getBytes()));
		int retorno=espacioService.save(espacio);
		if(retorno==0) {	
			respuesta respuesta=new respuesta(
				"ok",
				"Se guardó correctamente"
				);
			return new ResponseEntity<> (respuesta, HttpStatus.OK);
		}else {
			respuesta respuesta=new respuesta(
						"error",
						"Error al guardar"
						);
			return new ResponseEntity<> (respuesta, HttpStatus.OK);
		}
		
	}
 
    /*
    @PostMapping("/")
    public ResponseEntity<Object> guardarEspacioJson(@ModelAttribute espacio espacio, 
                                                     @RequestParam("file") MultipartFile file, 
                                                     HttpServletRequest request) {
        try {
            // Verificar si el archivo no es nulo y no está vacío
            if (file != null && !file.isEmpty()) {
                // Almacenar el archivo y obtener el nombre del archivo
                String fileName = fileStorageService.storeFile(file);

                // Codificar el nombre del archivo para URL (evita problemas con espacios y caracteres especiales)
                String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString());

                // Construir la URL completa del archivo con el nombre codificado
                String serverUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
                espacio.setImagen_url(serverUrl + "/api/downloadFile/" + encodedFileName);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                     .body("Archivo no proporcionado o está vacío");
            }

            // Guardar el espacio en la base de datos
            espacioService.save(espacio);

            // Devolver respuesta de éxito
            respuesta respuesta = new respuesta("ok", "Se guardó correctamente");
            return new ResponseEntity<>(respuesta, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error al subir el archivo: " + e.getMessage());
        }
    }

    */


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
        // Validar nombre_del_espacio
        if (espacio.getNombre_del_espacio().isEmpty()) {
            return "El nombre del espacio es obligatorio";
        } else if (!isValidInput(espacio.getNombre_del_espacio())) {
            return "El nombre del espacio contiene caracteres no permitidos";
        }

        // Validar clasificacion
        if (espacio.getClasificacion().isEmpty()) {
            return "La clasificación es obligatoria";
        } else if (!isValidInput(espacio.getClasificacion())) {
            return "La clasificación contiene caracteres no permitidos";
        }

        // Validar capacidad
        if (espacio.getCapacidad().isEmpty()) {
            return "La capacidad es obligatoria";
        } else if (!isNumeric(espacio.getCapacidad())) {
            return "La capacidad debe ser un número válido";
        }

        // Validar descripcion
        if (espacio.getDescripcion().isEmpty()) {
            return "La descripción es obligatoria";
        } else if (!isValidInput(espacio.getDescripcion())) {
            return "La descripción contiene caracteres no permitidos";
        }

        return null;
    }

    // Método para validar la entrada de caracteres
    private boolean isValidInput(String input) {
        // Expresión regular para caracteres permitidos (letras, números y espacios)
        String regex = "^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$";
        return Pattern.matches(regex, input);
    }

    // Método para verificar si la cadena es numérica
    private boolean isNumeric(String str) {
        return str.matches("\\d+"); // Verifica si la cadena contiene solo dígitos
    }
}

