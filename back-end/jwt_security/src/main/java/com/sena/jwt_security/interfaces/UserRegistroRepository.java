package com.sena.jwt_security.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sena.jwt_security.models.userRegistro;

import java.util.List;

@Repository
public interface UserRegistroRepository extends JpaRepository<userRegistro, String> {
    @Query("SELECT u FROM userRegistro u WHERE u.numero_documento = ?1")
    List<userRegistro> enviarNotificacionCuenta(String numero_documento);
}
