package com.sena.jwt_security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sena.jwt_security.models.rol;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.service.userService;



@SpringBootTest
class JwtSecurityApplicationTests {

    @Autowired
    private userService data;

    @Test
    void testUserRegistro() {
 
        userRegistro userRegistro = new userRegistro();
        userRegistro.setTipo_documento("CC");
        userRegistro.setNumero_documento("1076503030");
        userRegistro.setNombre_completo("John Sebastian Penna Arias");
        userRegistro.setTelefono("3023073134");
        userRegistro.setUsername("sebastianpennaariss@gmail.com");
        userRegistro.setRol(rol.Usuario);
        userRegistro.setPassword("");
        
    

        data.save(userRegistro);

       
       
    }
    @Test
    void testUserRegistroIncorrecto() {
 
        userRegistro userRegistro = new userRegistro();
        userRegistro.setTipo_documento("CC");
        userRegistro.setNumero_documento("");
        userRegistro.setNombre_completo("John Sebastian Penna Arias");
        userRegistro.setTelefono("3023073134");
        userRegistro.setUsername("sebastianpennaariss@gmail.com");
        userRegistro.setRol(rol.Usuario);
        userRegistro.setPassword("");
        
    

        data.save(userRegistro);
}
    
   
    }