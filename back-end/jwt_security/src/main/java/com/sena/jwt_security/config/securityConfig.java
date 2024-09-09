//package com.sena.jwt_security.config;
package com.sena.jwt_security.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;





@Configuration //Se indica que es un archivo de configuración 
@EnableWebSecurity  //configurar la seguridad del proyecto
@RequiredArgsConstructor

public class securityConfig {
	//el filterchein =es el encargado de filtrar las peticiones e indicar el acceso a los end point
	
	//versión basica con el formulario login
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
		return http
		 .csrf(csrf->csrf.disable())
		 .authorizeHttpRequests(
				 authRequest->authRequest
				 /*
				  * Todas las peticiones que comiencen por /api/v1/public
				  * van hacer permitidas sin restricción de usuario
				  */
				 .requestMatchers("/api/v1/public/**").permitAll()
				 .anyRequest().permitAll()//authenticated()
				// . formLogin(withDefaults())
				 ).build();
	}

	  @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
}
