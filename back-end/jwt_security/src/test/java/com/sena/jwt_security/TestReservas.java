package com.sena.jwt_security;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.sql.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import com.sena.jwt_security.interfaceService.IReservaService;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.controller.Security.reservaController;

@WebMvcTest(reservaController.class)
public class TestReservas {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private IReservaService reservaService;

    @InjectMocks
    private reservaController reservaController;

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() throws Exception {
        // Preparar datos de prueba
        reserva reserva1 = new reserva();
        reserva1.setNombre_completo("John Doe");
        reserva1.setNombre_espacio("Espacio A");
        reserva1.setHora_entrada("10:00");
        reserva1.setHora_salida("12:00");
        var fechaEntrada=new Date(2024, 9, 12);
        reserva1.setFecha_entrada(fechaEntrada); 
        var fechaSalida=new Date(2024, 9, 12);
        reserva1.setFecha_salida(fechaSalida);  
        reserva1.setUsername("john@example.com");

        reserva reserva2 = new reserva();
        reserva2.setNombre_completo("Jane Doe");
        reserva2.setNombre_espacio("Espacio B");
        reserva2.setHora_entrada("13:00");
        reserva2.setHora_salida("15:00");
        var fechaEntrada2=new Date(2024, 9, 13);
        reserva2.setFecha_entrada(fechaEntrada2);  
        var fechaSalida2=new Date(2024, 9, 13);
        reserva2.setFecha_salida(fechaSalida2);   
       reserva2.setUsername("jane@example.com");

        // Simular comportamiento del servicio
        when(reservaService.findAll()).thenReturn(Arrays.asList(reserva1, reserva2));

        // Realizar la solicitud GET y verificar el resultado
        mockMvc.perform(get("/api/v1/reserva/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].nombre_completo", is("John Doe")))
                .andExpect(jsonPath("$[1].nombre_completo", is("Jane Doe")));
    }

    // Método auxiliar para crear fechas
    private Date createDate(String dateString) throws ParseException {
        return dateFormat.parse(dateString);
    }
}


