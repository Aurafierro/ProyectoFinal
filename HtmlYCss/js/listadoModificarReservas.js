function historial() {
    var capturarFiltro = document.getElementById("inputSearch").value;
    var urlLocal = urlReserva;
  
    if (capturarFiltro != "") {
      urlLocal += "busquedafiltro/" + capturarFiltro;
    }
  
    $.ajax({
      url: urlLocal,
      type: "GET",
      success: function (result) {
        console.log(result); // Log the entire result to inspect the data
  
        var cuerpoTabla = document.getElementById("cuerpoTabla");
        cuerpoTabla.innerHTML = ""; // Clear the table body
  
        // Iterate over each reservation
        result.forEach(function (reserva) {
          if (reserva.estado === true || reserva.estadoReserva === "ACTIVO") {
            var trResgistro = document.createElement("tr");
            let celdaNombreCompleto = document.createElement("td");
            let celdaNombreEspacio = document.createElement("td");
            let celdaHoraEntrada = document.createElement("td");
            let celdaHoraSalida = document.createElement("td");
            let celdaFechaEntrada = document.createElement("td");
            let celdaFechaSalida = document.createElement("td");
  
            celdaNombreCompleto.innerText = reserva["userRegistro"]["nombre_completo"];
            celdaNombreEspacio.innerText = reserva["espacio"]["nombre_del_espacio"];
            celdaHoraEntrada.innerText = reserva["hora_entrada"];
            celdaHoraSalida.innerText = reserva["hora_salida"];
            celdaFechaEntrada.innerText = reserva["fecha_entrada"];
            celdaFechaSalida.innerText = reserva["fecha_salida"];
  
            trResgistro.appendChild(celdaNombreCompleto);
            trResgistro.appendChild(celdaNombreEspacio);
            trResgistro.appendChild(celdaHoraEntrada);
            trResgistro.appendChild(celdaHoraSalida);
            trResgistro.appendChild(celdaFechaEntrada);
            trResgistro.appendChild(celdaFechaSalida);
            cuerpoTabla.appendChild(trResgistro);
          }
        });
  
        // Llamar a cargarFormulario después de cargar la tabla
        cargarFormulario();
      },
      error: function (error) {
        alert("Error en la petición " + error);
      }
    });
  }
  
  // Función para cancelar una reserva
  function cancelarReserva(idReserva) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urlReserva + "cancelar/" + idReserva, // URL with reservation ID
          type: "PUT",
          success: function (response) {
            Swal.fire({
              title: "¡Cancelado!",
              text: "La reserva ha sido cancelada correctamente.",
              icon: "success"
            });
            // Eliminar la fila correspondiente después de la cancelación
            document.querySelector(`button[value="${idReserva}"]`).closest('tr').remove();
          },
          error: function (error) {
            Swal.fire("Error", "Error al cancelar la reserva. " + error.responseText, "error");
          }
        });
      }
    });
  }
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
          
          // Manejar el retroceso del navegador
          history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
  
          // Desactivar retroceso en el navegador
          window.addEventListener('popstate', function (event) {
              history.pushState(null, null, urlRedireccionInicioSesion); // Desactiva el retroceso
          });
  
          // Redirigir al inicio de sesión
          window.location.href = urlRedireccionInicioSesion;
        }
    });
  }