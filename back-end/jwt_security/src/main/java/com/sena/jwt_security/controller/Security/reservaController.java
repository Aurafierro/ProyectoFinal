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
import org.springframework.web.bind.annotation.RequestParam;
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
import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.estado;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.emailService;
import com.sena.jwt_security.service.espacioService;
import com.sena.jwt_security.service.userService;

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
    	
        // Validación de que la hora de entrada no sea igual a la hora de salida
        if (reserva.getHora_entrada().equals(reserva.getHora_salida())) {
            return new ResponseEntity<>("La hora de entrada no puede ser igual a la hora de salida", HttpStatus.BAD_REQUEST);
        }

        // Validación de que la hora de entrada no sea posterior a la hora de salida
        if (reserva.getHora_entrada().equals(reserva.getHora_salida())) {
            return new ResponseEntity<>("La hora de entrada no puede ser después de la hora de salida", HttpStatus.BAD_REQUEST);
        }

        // Validaciones adicionales para el usuario
        if (reserva.getUserRegistro() == null || reserva.getUserRegistro().getNombre_completo() == null) {
            return new ResponseEntity<>("El nombre completo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        // Validación del espacio (ahora validamos por id_espacio)
        if (reserva.getEspacio() == null || reserva.getEspacio().getId_espacio() == null) {
            return new ResponseEntity<>("El espacio reservado es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

     // Asignar estado como 'Activo'
        reserva.setEstadoReserva(estado.ACTIVO);

        // Guardar la reserva en la base de datos
        reservaService.save(reserva);

        // Enviar notificación por correo
        String mensaje = emailService.enviarNotificacionReservaRealizada(
            reserva.getUserRegistro(), 
            reserva.getEspacio(), 
            reserva.getHora_entrada(), 
            reserva.getHora_salida(),
            reserva.getFecha_entrada(), 
            reserva.getFecha_salida()
        );

        // Retornar respuesta de éxito
        return new ResponseEntity<>(mensaje, HttpStatus.OK);
    }



    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var ListaReserva = reservaService.findAll();
        return new ResponseEntity<>(ListaReserva, HttpStatus.OK);
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadPdf() throws MalformedURLException, IOException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // TÍTULO DEL PDF
            Paragraph title = new Paragraph("Reservaciones realizadas",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Font.BOLD, BaseColor.BLACK));
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));

            // Crear tabla
            PdfPTable table = new PdfPTable(6); // Número de columnas
            table.setWidthPercentage(100);

            // Encabezados
            table.addCell("Nombre completo");
            table.addCell("Nombre del espacio");
            table.addCell("Fecha de la reservación");
            table.addCell("Fecha finalizada");
            table.addCell("Hora entrada");
            table.addCell("Hora salida");

            // Obtener reservas
            List<reserva> reservas = reservaService.findAll();
            for (reserva reserva : reservas) {
                String userNombre = obtenerNombreUser(reserva.getUserRegistro());
                String espacioNombre = obtenerNombreEspacio(reserva.getEspacio());
                table.addCell(userNombre); // Mostrar el nombre del usuario
                table.addCell(espacioNombre);
                table.addCell(dateFormat.format(reserva.getFecha_entrada()));
                table.addCell(dateFormat.format(reserva.getFecha_salida()));
                table.addCell(reserva.getHora_entrada());
                table.addCell(reserva.getHora_salida());
            }

            document.add(table);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "reservas.pdf");

        return ResponseEntity.ok().headers(headers).body(out.toByteArray());
    }

    private String obtenerNombreUser(Object user) {
        if (user instanceof userRegistro) {
            userRegistro usuario = (userRegistro) user;
            return usuario.getNombre_completo(); // Asegúrate de que este método exista en la clase userRegistro
        }
        return "Usuario desconocido"; // Retorno por defecto si el objeto no es del tipo esperado
    }

   /* @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        espacio espacioEncontrado = espacioService.findByFiltro(filtro);
        userRegistro usuarioEncontrado = userService.findByFiltro(filtro);

        var listaReserva = reservaService.filtroIngresoReserva(espacioEncontrado, usuarioEncontrado);

        return new ResponseEntity<>(listaReserva, HttpStatus.OK);
    }*/
     
    
    @GetMapping("/busquedafiltro")
    public ResponseEntity<Object> findFiltro(@RequestParam String nombreCompleto, @RequestParam String nombreEspacio) {
        var listaReservas = reservaService.filtroPorUsuarioYEspacio(nombreCompleto, nombreEspacio);
        return new ResponseEntity<>(listaReservas, HttpStatus.OK);
    }


    @GetMapping("/{id_reserva}")
    public ResponseEntity<Object> findOne(@PathVariable String id_reserva) {
        var reserva = reservaService.findOne(id_reserva);
        return new ResponseEntity<>(reserva, HttpStatus.OK);
    }

    @DeleteMapping("/{id_reserva}")
    public ResponseEntity<Object> delete(@PathVariable String id_reserva) {
        reservaService.delete(id_reserva);
        return new ResponseEntity<>("Reserva eliminada con éxito", HttpStatus.OK);
    }

    @PutMapping("/{id_reserva}")
    public ResponseEntity<Object> update(@PathVariable String id_reserva, @RequestBody reserva reservaUpdate) {
        var reserva = reservaService.findOne(id_reserva).orElse(null);
        if (reserva != null) {
            reserva.setEspacio(reservaUpdate.getEspacio());
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
            if (reserva.getEstadoReserva() == estado.CANCELADO) {
                return new ResponseEntity<>("La reserva ya está cancelada", HttpStatus.BAD_REQUEST);
            }

            reserva.setEstadoReserva(estado.CANCELADO);
            reservaService.save(reserva);
            return new ResponseEntity<>("Reserva cancelada y estado cambiado a cancelado", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error: reserva no encontrada", HttpStatus.NOT_FOUND);
        }
    }

    private String obtenerNombreEspacio(espacio espacio) {
        // Aquí deberías implementar la lógica para obtener el nombre del espacio desde la tabla espacio.
        // Por ejemplo, llamar al servicio de espacio o consultar el repositorio.
        return espacio.getId_espacio(); // Asegúrate de que el método getNombre() exista en la clase espacio
    }
}
