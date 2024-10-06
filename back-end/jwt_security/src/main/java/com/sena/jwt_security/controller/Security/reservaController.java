package com.sena.jwt_security.controller.Security;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.sena.jwt_security.interfaceService.IReservaService;
import com.sena.jwt_security.models.estado;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.service.emailService;

@RestController
@RequestMapping("/api/v1/reserva")
@CrossOrigin
public class reservaController {
	

@Autowired
private IReservaService reservaService;
@Autowired
private emailService emailService;

@PostMapping("/")
public ResponseEntity<Object> save(@RequestBody reserva reserva) {
    List<reserva> user = reservaService.filtroIngresoReserva(reserva.getNombre_espacio(), reserva.getNombre_completo());
    if (!user.isEmpty()) {
        return new ResponseEntity<>("La reserva ya tiene un ingreso activo", HttpStatus.BAD_REQUEST);
    }

    // Validaciones
    if (reserva.getNombre_completo().isEmpty()) {
        return new ResponseEntity<>("El nombre completo es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (reserva.getNombre_espacio().isEmpty()) {
        return new ResponseEntity<>("El nombre del espacio es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (reserva.getHora_entrada().isEmpty()) {
        return new ResponseEntity<>("La hora de entrada es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (reserva.getHora_salida().isEmpty()) {
        return new ResponseEntity<>("La hora de salida es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (reserva.getFecha_entrada() == null) { // Assuming this is a Date object
        return new ResponseEntity<>("La fecha de entrada es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (reserva.getFecha_salida() == null) { // Assuming this is a Date object
        return new ResponseEntity<>("La fecha de salida es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (reserva.getUsername().isEmpty()) {
        return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
    }

    // Asignar estado como 'Activo', true o 1
    reserva.setEstado(estado.ACTIVO); // Usar el enum
    // reserva.setEstado(1); // Si es un entero
    // reserva.setEstado("Activo"); // Si es un String

    // Guardar reserva y enviar notificación por correo
    reservaService.save(reserva);
    emailService.enviarNotificacionReservaRealizada(reserva.getUsername(), reserva.getNombre_completo(),
            reserva.getNombre_espacio(), reserva.getHora_entrada(), reserva.getHora_salida(),
            reserva.getFecha_entrada(), reserva.getFecha_salida());

    return new ResponseEntity<>(reserva, HttpStatus.OK);
}


	@GetMapping("/")
	public ResponseEntity<Object>findAll(){
		var ListaReserva = reservaService.findAll();
		return new ResponseEntity<>(ListaReserva, HttpStatus.OK);
	}
	@GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadPdf() throws MalformedURLException, IOException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy"); // Formato de fecha

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            /*
            // Para añadir el logo de nuestro sitio web
            String logoPath = "";
            Image logo = Image.getInstance(logoPath);
            logo.scaleToFit(100, 100); // AJUSTARLE EL TAMAÑO
            logo.setAlignment(Image.ALIGN_CENTER);
            document.add(logo);*/

            // PARA AÑADIR TITULO AL PDF
            Paragraph title = new Paragraph("Reservaciones realizadas",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Font.BOLD, BaseColor.BLACK));
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            // Añadir un espacio después del título
            document.add(new Paragraph(" "));

            // Crear una tabla con las columnas especificadas
            PdfPTable table = new PdfPTable(6); // Número de columnas
            table.setWidthPercentage(100);

            // Añadir encabezados a la tabla
            table.addCell("Nombre completo");
            table.addCell("Nombre del espacio");
            table.addCell("Fecha de la reservación");
            table.addCell("Fecha finalizada");
            table.addCell("Hora entrada");
            table.addCell("Hora salida");

            // Añadir contenido a la tabla
            List<reserva> reservas = reservaService.findAll();
            for (reserva reserva : reservas) {
                table.addCell(reserva.getNombre_completo());
                table.addCell(reserva.getNombre_espacio());
                table.addCell(dateFormat.format(reserva.getFecha_entrada())); // Convertir fecha a String
                table.addCell(dateFormat.format(reserva.getFecha_salida())); // Convertir fecha a String
                table.addCell(reserva.getHora_entrada());
                table.addCell(reserva.getHora_salida());
            }

            // Añadir la tabla al documento
            document.add(table);

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Configurar encabezados para la descarga del archivo
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "reservas.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(out.toByteArray());
    }

	
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var ListaReserva = reservaService.filtroIngresoReserva(filtro, filtro);
		return new ResponseEntity<>(ListaReserva, HttpStatus.OK);
	}
	

	@GetMapping("/busquedafiltroselect/{filtro}")
	public ResponseEntity<Object>findFiltrosSelect(@PathVariable String filtro){
		var ListaReserva = reservaService.filtroIngresoReservaSelect(filtro);
		return new ResponseEntity<>(ListaReserva, HttpStatus.OK);
	}
	
	@GetMapping("/{id_reserva}")
	public ResponseEntity<Object> findOne ( @PathVariable String id_reserva ){
		var reserva= reservaService.findOne(id_reserva);
		return new ResponseEntity<>(reserva, HttpStatus.OK);
	}
	
	
	   @DeleteMapping ("/{id_reserva}")
		public ResponseEntity<Object> delete(@PathVariable String id_reserva){
			 reservaService.delete(id_reserva);
					return new ResponseEntity<>("Reserva eliminada con éxito",HttpStatus.OK);
		}
	   
	
	@PutMapping("/{id_reserva}")
	public ResponseEntity<Object> update(@PathVariable String id_reserva,@RequestBody reserva reservaUpdate) {
	   
		
		var reserva = reservaService.findOne(id_reserva).get();
		if (reserva != null) {
		
			reserva.setNombre_espacio(reservaUpdate.getNombre_espacio());
			reserva.setHora_entrada(reservaUpdate.getHora_entrada());
			reserva.setHora_salida(reservaUpdate.getHora_salida());
			reserva.setFecha_entrada(reservaUpdate.getFecha_entrada());
			reserva.setFecha_salida(reservaUpdate.getFecha_salida());

			reservaService.save(reserva);
			return new ResponseEntity<>("Guardado", HttpStatus.OK);

		} else {
			return new ResponseEntity<>("Error reserva no encontrada", HttpStatus.BAD_REQUEST);
		}
	}

	
	@PutMapping("/cancelar/{id_reserva}")
	public ResponseEntity<Object> cancelarReserva(@PathVariable String id_reserva) {
	    var reserva = reservaService.findOne(id_reserva).orElse(null);
	    if (reserva != null) {
	        // Validar si la reserva ya está en estado "CANCELADO"
	        if (reserva.getEstadoReserva() == estado.CANCELADO) {
	            return new ResponseEntity<>("La reserva ya está cancelada", HttpStatus.BAD_REQUEST);
	        }

	        // Cambiar el estado a "CANCELADO"
	        reserva.setEstadoReserva(estado.CANCELADO);

	        // Guardar los cambios
	        reservaService.save(reserva);
	        return new ResponseEntity<>("Reserva cancelada y estado cambiado a cancelado", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Error: reserva no encontrada", HttpStatus.NOT_FOUND);
	    }
	}



}
