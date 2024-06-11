package com.sena.jwt_security.service.jwt;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class jwtServices {

	//la clase jwtServices sirve para generar los token, verificar la validez del token y extraer la informacion incluida en el token
	
	@SuppressWarnings("deprecation")
	public String getToken(
			Map <String,Object>extraClaims,UserDetails user) {
		//clains: informacion adicional del token
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(user.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60)
				.signWith(getKey(),SignatureAlgorithm.HS256)
				.compact();
	}
	
	private static final String secretKey="1CCxUrixg/pr/s2HjdRQ2gSC0oAWphH/XU3HTbRDKic=";
	// metodo para obtener la clave
	private Key getKey () {
		byte[]keyBytes=Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
