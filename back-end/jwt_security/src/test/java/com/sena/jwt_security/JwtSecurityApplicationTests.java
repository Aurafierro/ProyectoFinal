package com.sena.jwt_security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sena.jwt_security.models.rol;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.userService;
import com.sena.jwt_security.JwtSecurityApplication;

import static org.mockito.Mockito.*;

@SpringBootTest(classes = JwtSecurityApplication.class)
class JwtSecurityApplicationTests {

    @MockBean
    private userService data;

    @Test
    void testuserRegistro() {
        userRegistro userRegistro = new userRegistro();
        userRegistro.setTipo_documento("CC");
        userRegistro.setNumero_documento("1076503030");
        userRegistro.setNombre_completo("John Sebastian Penna Arias");
   
        userRegistro.setUsername("sebastianpennaariss@gmail.com");
        userRegistro.setRol(rol.Usuario);
        userRegistro.setPassword("");

        data.save(userRegistro);
    }

    @Test
    void testuserRegistroIncorrecto() {
        userRegistro userRegistro = new userRegistro();
        userRegistro.setTipo_documento("CC");
        userRegistro.setNumero_documento("");
        userRegistro.setNombre_completo("John Sebastian Penna Arias");
     
        userRegistro.setUsername("sebastianpennaariss@gmail.com");
        userRegistro.setRol(rol.Usuario);
        userRegistro.setPassword("");

        data.save(userRegistro);
    }

    @Test
    void testuserRegistroFiltroIngresoUser() {
        userRegistro user1 = new userRegistro();
        user1.setTipo_documento("CC");
        user1.setNumero_documento("1076503030");
        user1.setNombre_completo("John Sebastian Penna Arias");

        user1.setUsername("sebastianpennaariss@gmail.com");
        user1.setRol(rol.Usuario);
        user1.setPassword("");

       
        List<userRegistro> listaSimulada = new ArrayList<>();
        listaSimulada.add(user1);
     
        String filtro = "John";
        when(data.filtroIngresoUser(filtro)).thenReturn(listaSimulada);

        List<userRegistro> listaFiltrada = data.filtroIngresoUser(filtro);

        assertNotNull(listaFiltrada);

        assertEquals(1, listaFiltrada.size());

        verify(data).filtroIngresoUser(filtro);
    }
}
