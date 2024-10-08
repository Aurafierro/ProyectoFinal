package com.sena.jwt_security.interfaces;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.sena.jwt_security.models.reserva;

public interface IReserva extends CrudRepository<reserva, String> {

    // Filtro general por nombre completo, espacio, hora o fecha
    @Query("SELECT r FROM reserva r WHERE "
            + "r.nombre_completo LIKE %?1% OR "
            + "r.nombre_espacio LIKE %?1% OR "
            + "r.hora_entrada LIKE %?1% OR "
            + "r.hora_salida LIKE %?1% OR "
            + "r.fecha_entrada = ?1 OR "
            + "r.fecha_salida = ?1")
    List<reserva> filtroReserva(String filtro);

    // Filtro para evitar duplicidad de reservas con el mismo espacio y horario
    @Query("SELECT r FROM reserva r WHERE r.nombre_espacio = ?1 AND "
            + "(?2 BETWEEN r.hora_entrada AND r.hora_salida OR "
            + "?3 BETWEEN r.hora_entrada AND r.hora_salida)")
    List<reserva> verificarReservaConflicto(String nombre_espacio, String hora_entrada, String hora_salida);

    // Filtro para validar que la hora de entrada y salida no sean iguales
    @Query("SELECT r FROM reserva r WHERE r.hora_entrada != r.hora_salida")
    List<reserva> filtroReservaHorasValidas();

    // Filtro para verificar si ya hay una reserva por espacio y nombre completo
    @Query("SELECT r FROM reserva r WHERE r.nombre_espacio LIKE %?1% OR r.nombre_completo LIKE %?2%")
    List<reserva> filtroIngresoReserva(String nombre_espacio, String nombre_completo);

    // Filtro selectivo para nombre completo
    @Query("SELECT r FROM reserva r WHERE r.nombre_completo LIKE %?1%")
    List<reserva> filtroIngresoReservaSelect(String nombre_completo);
}
