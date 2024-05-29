package com.sena.jwt_security.models.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class resgisterRequest {

	/*contiene la estructura de la petición de registro
	 * 
	 */
	String email ;
	String password;
	String confirmPassword;
	
}
