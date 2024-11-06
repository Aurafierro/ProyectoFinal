package com.sena.jwt_security.interfaces;

import java.sql.Date;
import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.estadoUser;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.models.userRegistro;

public interface Iuser extends CrudRepository<userRegistro, String> {

    @Query("SELECT u FROM userRegistro u WHERE u.numero_documento = ?1")
    List<userRegistro> filtroIngresoUser(String numero_documento);

    @Query("SELECT u FROM userRegistro u WHERE u.username = :username")
    Optional<userRegistro> findByUsername(String username);

    @Query("SELECT u FROM userRegistro u WHERE u.numero_documento = ?1")
    List<userRegistro> enviarNotificacionCuenta(String numero_documento);

    // Consultar usuarios por correo electrónico (podría devolver múltiples resultados)
    @Query("SELECT u FROM userRegistro u WHERE u.username = :username")
    List<userRegistro> filtroIngresoUserByEmail(@Param("username") String username);

    
    @Query("SELECT u FROM userRegistro u WHERE u.estadoUser = 'cuenta_inactiva'")
    List<userRegistro> findAllByEstadoInactivo();

    @Query("SELECT u FROM userRegistro u WHERE u.estadoUser = :estado")
    List<userRegistro> findAllByEstadoUser(@Param("estado") estadoUser estado);

 // Filtro para verificar si ya hay una reserva por espacio y nombre completo
    @Query("SELECT u FROM userRegistro u WHERE "
    	       + "u.nombre_completo LIKE %:filtro% OR "
    	       + "u.username LIKE %:filtro% OR "
    	       + "u.numero_documento LIKE %:filtro%")
    	List<userRegistro> findFiltroRegistros(@Param("filtro") String filtro);

 



}


