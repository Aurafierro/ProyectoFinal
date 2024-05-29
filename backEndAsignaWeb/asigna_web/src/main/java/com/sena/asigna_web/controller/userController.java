package com.sena.asigna_web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.asigna_web.interfaceService.IUsuarioService;

@RestController
@RequestMapping("/api/v1/usuario")
@CrossOrigin
public class userController {

	@Autowired 
	private IUsuarioService usuarioService;
	
	
}
