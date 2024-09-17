package com.sena.jwt_security.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class jwtService {

    private static final String SECRET_KEY = "Bw0mtfRa9WhRJuXHmpbtKnYlgR6Wov9lyEa7NUsUPCI=";

    
    public String getToken(UserDetails userData) {
        return getToken(new HashMap<>(), userData);
    }

    private String getToken(HashMap<String, Object> extraClaims, UserDetails userData) {
    	var token=Jwts
    			.builder()
    			.setSubject(userData.getUsername())
    			.setIssuedAt(new Date(System.currentTimeMillis()))
    			.setExpiration(new Date(System.currentTimeMillis()+1000 * 60*60 * 24))
    			.signWith(getKey(),SignatureAlgorithm.HS256)
    			.compact();
        return token;
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String getUsernameFromToken(String token) {
    	return GetClaims(token, Claims::getSubject);
    }
    
    public boolean isTokenValid(String token, UserDetails userDetails) {
    	final String username=getUsernameFromToken(token);
    	return (username.equals(userDetails.getUsername())&& !isTokenExpired(token));
    	
    }
    
    private Claims getAllClaims(String token) {
    	return Jwts
    			.parserBuilder()
    			.setSigningKey(getKey())
    			.build()
    			.parseClaimsJws(token)
    			.getBody();
    }
    
    public <T> T GetClaims(String token, Function<Claims,T> claimsResolver) {
    	final Claims claims=getAllClaims(token);
    	return claimsResolver.apply(claims);
    }
    
    private Date getExpiration(String token) {
    	return GetClaims(token, Claims::getExpiration);
    }
    
    private boolean isTokenExpired(String token) {
    	return getExpiration (token).before(new Date());
    }
}
