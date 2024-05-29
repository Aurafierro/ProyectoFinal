package com.sena.asigna_web.models.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class registerRequest {

	String correo;
	String password;
	String confirmarPassword;
}
