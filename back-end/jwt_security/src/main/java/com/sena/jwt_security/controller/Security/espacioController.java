package com.sena.jwt_security.controller.Security;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.sena.jwt_security.interfaceService.IEspacioService;
import com.sena.jwt_security.models.espacio;

@RestController
@RequestMapping("api/v1/espacio")
@CrossOrigin
public class espacioController {
	
@Autowired 
	
	private IEspacioService espacioService;
	/*
	 * retorna un json , indicando si funciono, presentó
	 * error, los datos solicitados
	 */
	@PostMapping("/")
public ResponseEntity<Object> save(@RequestBody espacio espacio) {
	    
	    List<espacio> espacios = espacioService.filtroIngresoEspacio(espacio.getNombre_del_espacio());
	    if (!espacios.isEmpty()) {
	        return new ResponseEntity<>("El espacio ya se encuentra registrado", HttpStatus.BAD_REQUEST);
	    }
	    if (espacio.getNombre_del_espacio().equals("")) {

            return new ResponseEntity<>("El nombre del espacio es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (espacio.getClasificacion().equals("")) {
            
            return new ResponseEntity<>("La clasificación es obligatoria", HttpStatus.BAD_REQUEST);
        }
        
        if ( espacio.getCapacidad().equals("")) {
            
            return new ResponseEntity<>("La capacidad es obligatoria", HttpStatus.BAD_REQUEST);
        }

        if (espacio.getDescripcion().equals("")) {
            
            return new ResponseEntity<>("La descripción es obligatoria", HttpStatus.BAD_REQUEST);
        }
        
        
		espacioService.save(espacio);
		return new ResponseEntity<>(espacio,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object>findAll(){
		var Listaespacio = espacioService.findAll();
		return new ResponseEntity<>(Listaespacio, HttpStatus.OK);
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


					espacio.setNombre_del_espacio(espacioUpdate.getNombre_del_espacio());
					espacio.setClasificacion(espacioUpdate.getClasificacion());
					espacio.setCapacidad(espacioUpdate.getCapacidad());
					espacio.setDescripcion(espacioUpdate.getDescripcion());

					espacioService.save(espacio);
					return new ResponseEntity<>("Guardado", HttpStatus.OK);

				} else {
					return new ResponseEntity<>("Error espacio no encontrado", HttpStatus.BAD_REQUEST);
				}
			}
			
			@DeleteMapping("/{id_espacio}")
			public ResponseEntity<Object>delete (@PathVariable("id_espacio")String id_espacio){
				espacioService.delete(id_espacio);
				return new ResponseEntity<>("Espacio eliminado",HttpStatus.OK);
			}
	

}
