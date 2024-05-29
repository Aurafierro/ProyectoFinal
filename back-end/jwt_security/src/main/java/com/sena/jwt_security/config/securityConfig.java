package com.sena.jwt_security.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;




//Se indica que es un archivo de configuración 
@Configuration

//configurar la seguridad del proyecto
@EnableWebSecurity

//se incluye el constructor de lombok
@RequiredArgsConstructor

public class securityConfig {
	//el filterchein =es el encargado de filtrar las peticiones e indicar el acceso a los end point
	@Bean
	public SecurityFilterChain securityFilterChain(
			HttpSecurity http
			)throws Exception
	{
		return http
		 .csrf(csrf->csrf.disable())
		 .authorizeHttpRequests(
				 authRequest->authRequest
				 /*
				  * Todas las peticiones que comiencen por /api/v1/public
				  * van hacer permitidas sin restricción de usuario
				  */
				 .requestMatchers("/api/v1/public/**")
				 .permitAll()
				 .anyRequest().permitAll()
				 ).build();
	}

}
