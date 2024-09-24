package com.sena.jwt_security.interfaces;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sena.jwt_security.models.userRegistro;

public interface Iuser extends CrudRepository<userRegistro, String> {

    @Query("SELECT u FROM userRegistro u WHERE u.numero_documento = ?1")
    List<userRegistro> filtroIngresoUser(String numero_documento);

    @Query("SELECT u FROM userRegistro u WHERE u.username = :username")
    Optional<userRegistro> findByUsername(String username);

    @Query("SELECT u FROM userRegistro u WHERE u.numero_documento = ?1")
    List<userRegistro> enviarNotificacionCuenta(String numero_documento);

}


