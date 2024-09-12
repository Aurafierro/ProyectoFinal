package com.sena.jwt_security.controller.Security;

import org.springframework.web.bind.annotation.GetMapping;

public class loginController {
	@GetMapping("/login")
    public String login() {
        return "login";
    }

}
