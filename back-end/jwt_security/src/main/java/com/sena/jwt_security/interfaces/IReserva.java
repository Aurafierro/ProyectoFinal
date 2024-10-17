package com.sena.jwt_security.interfaces;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.sena.jwt_security.models.espacio;
import com.sena.jwt_security.models.reserva;
import com.sena.jwt_security.models.userRegistro;

public interface IReserva extends CrudRepository<reserva, String> {

    // Filtro general por nombre completo, espacio, hora o fecha
    @Query("SELECT r FROM reserva r JOIN r.userRegistro u JOIN r.espacio e WHERE "
            + "u.nombre_completo LIKE %?1% OR "
            + "r.hora_entrada LIKE %?1% OR "
            + "r.hora_salida LIKE %?1% OR "
            + "e.nombre_del_espacio LIKE %?1% OR "
            + "(r.fecha_entrada = ?1) OR "
            + "(r.fecha_salida = ?1)")
    List<reserva> filtroReserva(String filtro);
    
    // Filtro para verificar conflictos en las reservas
    @Query("SELECT r FROM reserva r WHERE r.espacio.nombre_del_espacio = ?1 AND "
            + "((?2 >= r.hora_entrada AND ?2 < r.hora_salida) OR "
            + "(?3 > r.hora_entrada AND ?3 <= r.hora_salida) OR "
            + "(?2 < r.hora_entrada AND ?3 > r.hora_salida))")
    List<reserva> verificarReservaConflicto(String nombre_espacio, String hora_entrada, String hora_salida);

    // Filtro para validar que la hora de entrada y salida no sean iguales
    @Query("SELECT r FROM reserva r WHERE r.hora_entrada != r.hora_salida")
    List<reserva> filtroReservaHorasValidas();

    // Filtro para verificar si ya hay una reserva por espacio y nombre completo
    @Query("SELECT r FROM reserva r WHERE r.espacio = ?1 AND r.userRegistro = ?2")
    
    List<reserva> filtroIngresoReserva(espacio espacio, userRegistro userRegistro);
    
 // Filtro para verificar si ya hay una reserva por espacio y nombre completo
    @Query("SELECT r FROM reserva r JOIN r.userRegistro u JOIN r.espacio e WHERE u.nombre_completo LIKE %:nombreCompleto% OR e.nombre_del_espacio LIKE %:nombreEspacio%")
    List<reserva> filtroPorUsuarioYEspacio(@Param("nombreCompleto") String nombreCompleto, @Param("nombreEspacio") String nombreEspacio);
    
    @Query("SELECT r FROM reserva r JOIN r.userRegistro u WHERE u.id_user = :id_user")
    List<reserva> findReservasByUserId(@Param("id_user") String id_user);


}
