package com.sena.jwt_security;

import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import io.jsonwebtoken.security.Keys;

import io.jsonwebtoken.SignatureAlgorithm;

@EnableScheduling
@SpringBootApplication
public class JwtSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtSecurityApplication.class, args);
		System.out.println("Contraseña generada aleatoriamente: " + getBase64Key());
	}

	private static final SecretKey secret_key=Keys.secretKeyFor(SignatureAlgorithm.HS256);
	public static String getBase64Key() {
		var key=Base64.getEncoder().encodeToString(secret_key.getEncoded());
		return key;
	}
}
