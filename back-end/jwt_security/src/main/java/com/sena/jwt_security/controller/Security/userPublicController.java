package com.sena.jwt_security.controller.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.jwt_security.interfaceService.IUserService;
import com.sena.jwt_security.models.userRegistro;
import com.sena.jwt_security.models.seguridad.authResponse;
import com.sena.jwt_security.models.seguridad.loginRequest;

@RestController
@RequestMapping ("/api/v1/public/user")
public class userPublicController {
	
	@Autowired
	private IUserService userService;
	
	
	//register
	@PostMapping("/")
	public ResponseEntity <Object> save (@ModelAttribute("Usuario") userRegistro userRegistro){
		userService.save(userRegistro);
		return new ResponseEntity<>(userRegistro, HttpStatus.OK);
	}
	
	@GetMapping ("/")
	public ResponseEntity <authResponse> login (@RequestBody loginRequest request){
		//falta desarrollar
		
		authResponse response=new authResponse () ;
		return new ResponseEntity <authResponse>(response,HttpStatus.OK);
		
	}
	
	//lOGIN
	
	@GetMapping ("/forgot-password/")
	public ResponseEntity <Object> forgot_password(){
		//falta desarrollar
		return new ResponseEntity <>("",HttpStatus.OK);
		
	}
	
	
	
	

}
