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

import com.sena.jwt_security.interfaceService.IReservaService;
import com.sena.jwt_security.models.reserva;

@RestController
@RequestMapping("/api/v1/reserva")
@CrossOrigin
public class reservaController {
	

@Autowired

private IReservaService reservaService;

@PostMapping("/")
public ResponseEntity<Object> save(@RequestBody reserva reserva) {
	    
    List<reserva> user = reservaService.filtroIngresoReserva(reserva.getNombre_espacio());
	    if (!user.isEmpty()) {
	        return new ResponseEntity<>("La reserva ya tiene un ingreso activo", HttpStatus.BAD_REQUEST);
	    }

        if (reserva.getNombre_completo().equals("")) {
            
            return new ResponseEntity<>("El nombre completo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

       

        if (reserva.getNombre_espacio().equals("")) {
            
            return new ResponseEntity<>("El nombre del espacio es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
        

        if (reserva.getHora_entrada().equals("")) {
            
            return new ResponseEntity<>("La hora de entrada es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
        
        if (reserva.getHora_salida().equals("")) {
            
            return new ResponseEntity<>("La hora de salida es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }   
        
if (reserva.getFecha().equals("")) {
            
            return new ResponseEntity<>("La fecha es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }   
        
        
        
		reservaService.save(reserva);
		return new ResponseEntity<>(reserva,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object>findAll(){
		var ListaReserva = reservaService.findAll();
		return new ResponseEntity<>(ListaReserva, HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaReserva = reservaService.filtroIngresoReserva(filtro);
		return new ResponseEntity<>(ListaReserva, HttpStatus.OK);
	}
	
	@GetMapping("/{id_reserva}")
	public ResponseEntity<Object> findOne ( @PathVariable String id_reserva ){
		var user= reservaService.findOne(id_reserva);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	   @DeleteMapping ("/{id_reserva}")
		public ResponseEntity<Object> delete(@PathVariable String id_reserva){
			 reservaService.delete(id_reserva);
					return new ResponseEntity<>("Reserva eliminada con éxito",HttpStatus.OK);
		}
	   
	
	@PutMapping("/{id_reserva}")
	public ResponseEntity<Object> update(@RequestBody reserva reservaUpdate,@PathVariable String id_reserva) {
	   
		
		var reserva = reservaService.findOne(id_reserva).get();
		if (reserva != null) {
			
			


			reserva.setNombre_completo(reservaUpdate.getNombre_completo());
			reserva.setNombre_espacio(reservaUpdate.getNombre_espacio());
			reserva.setHora_entrada(reservaUpdate.getHora_entrada());
			reserva.setHora_salida(reservaUpdate.getHora_salida());
			reserva.setFecha(reservaUpdate.getFecha());
			

			reservaService.save(reserva);
			return new ResponseEntity<>("Guardado", HttpStatus.OK);

		} else {
			return new ResponseEntity<>("Error reserva no encontrada", HttpStatus.BAD_REQUEST);
		}
	}



}
