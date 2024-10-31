

// Función para cargar la tabla de registros inactivos
function tablaRegistro() {
  fetch(urlUsuariosInactivos)
      .then(response => {
          if (!response.ok) throw new Error("Error en la solicitud: " + response.status);
          return response.json();
      })
      .then(data => mostrarRegistros(data))
      .catch(error => {
          console.error("Error:", error);
          Swal.fire("Error", "No se pudieron cargar los registros: " + error.message, "error");
      });
}

// Función para mostrar los registros en la tabla
function mostrarRegistros(registros) {
  const cuerpoTabla = document.getElementById("cuerpoTabla");
  cuerpoTabla.innerHTML = ""; // Limpiar la tabla antes de llenarla

  registros.forEach(registro => {
      let trRegistro = document.createElement("tr");

      // Crear celdas con los valores del registro
      let celdaTipoDocumento = document.createElement("td");
      celdaTipoDocumento.innerText = registro.tipo_documento;

      let celdaNumeroDocumento = document.createElement("td");
      celdaNumeroDocumento.innerText = registro.numero_documento;

      let celdaRol = document.createElement("td");
      celdaRol.innerText = registro.rol || "Sin rol"; // Usa "Sin rol" como valor por defecto

      let celdaNombreCompleto = document.createElement("td");
      celdaNombreCompleto.innerText = registro.nombre_completo;

      let celdaCorreo = document.createElement("td");
      celdaCorreo.innerText = registro.username;

      let celdaEstado = document.createElement("td");

      // Botón Aceptar
      let botonAceptarRegistro = document.createElement("button");
      botonAceptarRegistro.innerText = "Aceptar";
      botonAceptarRegistro.className = "btnRegistro";
      botonAceptarRegistro.style.backgroundColor = "#007bff";
      botonAceptarRegistro.style.color = "white";
      botonAceptarRegistro.onclick = function () {
          aceptarRegistro(registro.id_user, trRegistro);
      };
      celdaEstado.appendChild(botonAceptarRegistro);

      // Botón Rechazar
      let botonRechazarRegistro = document.createElement("button");
      botonRechazarRegistro.innerText = "Rechazar";
      botonRechazarRegistro.className = "btnRechazar";
      botonRechazarRegistro.style.backgroundColor = "#dc3545";
      botonRechazarRegistro.style.color = "white";
      botonRechazarRegistro.onclick = function () {
          rechazarRegistro(registro.id_user, trRegistro);
      };
      celdaEstado.appendChild(botonRechazarRegistro);

      // Añadir celdas a la fila
      trRegistro.appendChild(celdaTipoDocumento);
      trRegistro.appendChild(celdaNumeroDocumento);
      trRegistro.appendChild(celdaRol);
      trRegistro.appendChild(celdaNombreCompleto);
      trRegistro.appendChild(celdaCorreo);
      trRegistro.appendChild(celdaEstado);

      // Añadir la fila completa al cuerpo de la tabla
      cuerpoTabla.appendChild(trRegistro);
  });
}

// Función para aceptar un registro (aprobar usuario)
function aceptarRegistro(id, fila) {
  fetch(urlAceptarRegistro + id, { method: "PUT" })
      .then(response => {
          if (!response.ok) throw new Error("Error en la solicitud: " + response.status);
          Swal.fire("Éxito", "El registro ha sido aprobado.", "success").then(() => {
              fila.remove(); // Eliminar la fila después de la aprobación
          });
      })
      .catch(error => {
          console.error("Error:", error);
          Swal.fire("Error", "No se pudo aprobar el registro: " + error.message, "error");
      });
}

// Función para rechazar un registro (marcar usuario como rechazado)
function rechazarRegistro(id, fila) {
  fetch(urlRechazarRegistro + id, { method: "DELETE" })
      .then(response => {
          if (!response.ok) throw new Error("Error en la solicitud: " + response.status);
          Swal.fire("Registro rechazado", "El registro ha sido marcado como rechazado.", "info").then(() => {
              fila.cells[5].innerText = "Rechazado"; // Cambiar el estado en la celda
              fila.cells[5].style.color = "red"; // Color rojo para indicar rechazo
              fila.cells[5].style.fontWeight = "bold";
              fila.cells[5].innerHTML = "Rechazado"; // Cambiar contenido de la celda
          });
      })
      .catch(error => {
          console.error("Error:", error);
          Swal.fire("Error", "No se pudo rechazar el registro: " + error.message, "error");
      });
}

// Llamar a tablaRegistro al cargar la página
window.onload = function() {
  tablaRegistro();
};
function cerrarSesion() {
  Swal.fire({
      title: "Cerrar sesión",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar"
  }).then(result => {
      if (result.isConfirmed) {
        // Eliminar el token de autenticación
    localStorage.removeItem('authTokens'); 
          window.location.href = urlRedireccionInicioSesion;
      }
  });
}
