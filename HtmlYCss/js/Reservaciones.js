var url = "http://localhost:8080/api/v1/reserva/";

//document.getElementById("nombre_completo").addEventListener("keypress", soloLetras);
//document.getElementById("nombre_espacio").addEventListener("keypress", soloLetras);
//document.getElementById("hora_entrada").addEventListener("keypress", numerosYcaracteres);
//document.getElementById("hora_salida").addEventListener("keypress", numerosYcaracteres);

document.querySelector('.menu-toggle').addEventListener('click', function () {
  const sidebar = document.querySelector('.sidebar');
  const contenedorContenido = document.querySelector('.contenedorContenido');

  // Alterna la visibilidad de la barra lateral
  sidebar.classList.toggle('visible');

  // Ajusta el margen izquierdo del contenido principal dependiendo del estado del menú
  if (sidebar.classList.contains('visible')) {
      contenedorContenido.style.marginLeft = '250px'; // Desplaza el contenido principal
  } else {
      contenedorContenido.style.marginLeft = '0'; // Restaura el margen original
  }
});
function soloLetras(event) {
  console.log("Llave presionada: " + event.key);
  console.log("Código tecla: " + event.keyCode);
  const letrasPermitidas = [
    //letras en minúsculas
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    //LETRAS EN MAYÚSCULAS
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    //letras con tildes, mayusculas y minusculas
    "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
  ];
  if (!(letrasPermitidas.includes(event.key))) {
    event.preventDefault();
    return;
  }
}
function letrasYnumeros(event) {
  console.log("Llave presionada: " + event.key);
  console.log("Código tecla: " + event.keyCode);

  const letrasPermitidas = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"

  ];
  const numeroPermitidos = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];
  if (
    !(letrasPermitidas.includes(event.key)) &&
    !(numeroPermitidos.includes(event.key))
  ) {
    event.preventDefault();
    return;
  }
}
function soloNumeros(event) {
  console.log("Llave presionada: " + event.key);
  console.log("Código tecla: " + event.keyCode);
  const numeroPermitidos = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];
  if (!(numeroPermitidos.includes(event.key))) {
    event.preventDefault();
    return;
  }
}
function letrasNumerosCaracteres(event) {
  console.log("Llave presionada: " + event.key);
  console.log("Código tecla: " + event.keyCode);
  const letrasPermitidas = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
  ];
  const numeroPermitidos = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];
  const caracteresPermitidos = [
    '@', '_', '-', '.'
  ];
  if (!(numeroPermitidos.includes(event.key)) && (letrasPermitidas.includes(event.key)) && (caracteresPermitidos.includes(event.key))) {
    event.preventDefault();
    return;
  }
}
function numerosYcaracteres(event) {
  console.log("Llave presionada: " + event.key);
  console.log("Código tecla: " + event.keyCode);
  const numeroPermitidos = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];
  const caracteresPermitidos = [
    ':'
  ];
  if (!(numeroPermitidos.includes(event.key)) && (caracteresPermitidos.includes(event.key))) {
    event.preventDefault();
    return;
  }
}
function crearReserva() {
  let formData = {
    "nombre_completo": document.getElementById("nombre_completo").value,
    "nombre_espacio": document.getElementById("nombre_espacio").value,
    "hora_entrada": document.getElementById("hora_entrada").value,
    "hora_salida": document.getElementById("hora_salida").value,
    "fecha_entrada": document.getElementById("fecha_entrada").value,
    "fecha_salida": document.getElementById("fecha_salida").value,
    "username": document.getElementById("username").value
  };
  let camposValidos = true;
  let camposRequeridos = [
    "nombre_completo",
    "nombre_espacio",
    "hora_entrada",
    "hora_salida",
    "fecha_entrada",
    "fecha_salida",
    "username"
  ];
  camposRequeridos.forEach(function (campo) {
    let valorCampo = document.getElementById(campo).value.trim();
    if (valorCampo === "") {
      camposValidos = false;
      return false; // Terminar la iteración si se encuentra un campo vacío
    }
  });
  if (camposValidos) {
    $.ajax({
      url: url,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        Swal.fire({
          title: "¡Excelente!",
          text: "Se guardó correctamente",
          icon: "success"
        });
        limpiarFormulario();
        tablaReservas();
      },
      error: function (error) {
        Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
      },
    });

  } else {
    Swal.fire({
      title: "¡Error!",
      text: "Llene todos los campos correctamente",
      icon: "error"
    });
  }

}
function listaReservasCrearReserva() {
  $.ajax({
    url: url, // URL para obtener todas las reservas
    type: "GET",
    success: function (result) {
      console.log(result); // Asegúrate de que los datos lleguen correctamente

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      if (!cuerpoTabla) {
        console.error("Tabla no encontrada");
        return;
      }

      cuerpoTabla.innerHTML = ""; // Limpiar el cuerpo de la tabla

      result.forEach(function (reserva) {
        // Verificar si el estado de la reserva es "ACTIVO"
        if (reserva.estadoReserva === "ACTIVO") {
          var trResgistro = document.createElement("tr");

          // Crear celdas para cada campo de la reserva
          let celdaNombreCompleto = document.createElement("td");
          let celdaNombreEspacio = document.createElement("td");
          let celdaHoraEntrada = document.createElement("td");
          let celdaHoraSalida = document.createElement("td");
          let celdaFechaEntrada = document.createElement("td");
          let celdaFechaSalida = document.createElement("td");

          // Asignar los valores correspondientes a las celdas
          celdaNombreCompleto.innerText = reserva["nombre_completo"];
          celdaNombreEspacio.innerText = reserva["nombre_espacio"];
          celdaHoraEntrada.innerText = reserva["hora_entrada"];
          celdaHoraSalida.innerText = reserva["hora_salida"];
          celdaFechaEntrada.innerText = reserva["fecha_entrada"];
          celdaFechaSalida.innerText = reserva["fecha_salida"];

          // Añadir las celdas a la fila
          trResgistro.appendChild(celdaNombreCompleto);
          trResgistro.appendChild(celdaNombreEspacio);
          trResgistro.appendChild(celdaHoraEntrada);
          trResgistro.appendChild(celdaHoraSalida);
          trResgistro.appendChild(celdaFechaEntrada);
          trResgistro.appendChild(celdaFechaSalida);

          // Añadir la fila al cuerpo de la tabla
          cuerpoTabla.appendChild(trResgistro);
          console.log("Fila añadida al cuerpo de la tabla");
        }
      });
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}

function tablaReservas() {
  var capturarFiltro = document.getElementById("inputSearch").value;
  var urlLocal = url;
  if (capturarFiltro != "") {
    urlLocal += "busquedafiltro/" + capturarFiltro;
  }
  $.ajax({
    url: urlLocal,
    type: "GET",
    success: function (result) {
      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = ""; // Limpiar tabla
      result.forEach(function (reserva) {
        var trResgistro = document.createElement("tr");
        let celdaNombreCompleto = document.createElement("td");
        let celdaNombreEspacio = document.createElement("td");
        let celdaHoraEntrada = document.createElement("td");
        let celdaHoraSalida = document.createElement("td");
        let celdaFechaEntrada = document.createElement("td");
        let celdaFechaSalida = document.createElement("td");
        let celdaEstado = document.createElement("td");
        celdaNombreCompleto.innerText = reserva.nombre_completo;
        celdaNombreEspacio.innerText = reserva.nombre_espacio;
        celdaHoraEntrada.innerText = reserva.hora_entrada;
        celdaHoraSalida.innerText = reserva.hora_salida;
        celdaFechaEntrada.innerText = reserva.fecha_entrada;
        celdaFechaSalida.innerText = reserva.fecha_salida;
        // Mostrar estado como "Activo" o "Cancelado"
        celdaEstado.innerText = reserva.estadoReserva === "ACTIVO" ? "Activo" : "Cancelado";
        trResgistro.appendChild(celdaNombreCompleto);
        trResgistro.appendChild(celdaNombreEspacio);
        trResgistro.appendChild(celdaHoraEntrada);
        trResgistro.appendChild(celdaHoraSalida);
        trResgistro.appendChild(celdaFechaEntrada);
        trResgistro.appendChild(celdaFechaSalida);
        trResgistro.appendChild(celdaEstado);
        cuerpoTabla.appendChild(trResgistro);
      });
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}
function cerrarSesion() {
  localStorage.removeItem('authTokens'); 
  window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html';
}
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const header = document.querySelector('.header');
  if (sidebar.classList.contains('hidden')) {
      sidebar.classList.remove('hidden');
      sidebar.classList.add('visible');
      mainContent.classList.add('shifted');
      header.classList.add('shifted');
  } else {
      sidebar.classList.remove('visible');
      sidebar.classList.add('hidden');
      mainContent.classList.remove('shifted');
      header.classList.remove('shifted');
  }
}
  function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.querySelector('.main-content');
            const header = document.querySelector('.header');
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                sidebar.classList.add('visible');
                mainContent.classList.add('shifted');
                header.classList.add('shifted');
            } else {
                sidebar.classList.remove('visible');
                sidebar.classList.add('hidden');
                mainContent.classList.remove('shifted');
                header.classList.remove('shifted');
            }
        }
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
                console.log("Reserva:", reserva); // Log each reservation to inspect the structure
        
                // Filtrar solo las reservas activas (estado === true o estadoReserva === "ACTIVO")
                if (reserva.estado === true || reserva.estadoReserva === "ACTIVO") {
                  var trResgistro = document.createElement("tr");
        
                  let celdaNombreCompleto = document.createElement("td");
                  let celdaNombreEspacio = document.createElement("td");
                  let celdaHoraEntrada = document.createElement("td");
                  let celdaHoraSalida = document.createElement("td");
                  let celdaFechaEntrada = document.createElement("td");
                  let celdaFechaSalida = document.createElement("td");
        
                  celdaNombreCompleto.innerText = reserva["nombre_completo"];
                  celdaNombreEspacio.innerText = reserva["nombre_espacio"];
                  celdaHoraEntrada.innerText = reserva["hora_entrada"];
                  celdaHoraSalida.innerText = reserva["hora_salida"];
                  celdaFechaEntrada.innerText = reserva["fecha_entrada"];
                  celdaFechaSalida.innerText = reserva["fecha_salida"];
        
                  let celdaOpcionEditar = document.createElement("td");
                  let botonEditarReserva = document.createElement("button");
                  botonEditarReserva.value = reserva["id_reserva"];
                  botonEditarReserva.innerHTML = "Modificar reserva";
                  botonEditarReserva.onclick = function (e) {
                    $('#exampleModal').modal('show');
                    consultarReservaID(this.value);
                  };
                  botonEditarReserva.className = "btnEditar";
                  celdaOpcionEditar.appendChild(botonEditarReserva);
        
                  let celdaOpcionEliminar = document.createElement("td");
                  let botonEliminarReserva = document.createElement("button");
                  botonEliminarReserva.value = reserva["id_reserva"];
                  botonEliminarReserva.innerHTML = "Cancelar";
                  botonEliminarReserva.onclick = function (e) {
                    cancelarReserva(this.value);
                  };
                  botonEliminarReserva.className = "btnEliminar";
                  celdaOpcionEliminar.appendChild(botonEliminarReserva);
        
                  trResgistro.appendChild(celdaNombreCompleto);
                  trResgistro.appendChild(celdaNombreEspacio);
                  trResgistro.appendChild(celdaHoraEntrada);
                  trResgistro.appendChild(celdaHoraSalida);
                  trResgistro.appendChild(celdaFechaEntrada);
                  trResgistro.appendChild(celdaFechaSalida);
                  trResgistro.appendChild(celdaOpcionEditar);
                  trResgistro.appendChild(celdaOpcionEliminar);
                  cuerpoTabla.appendChild(trResgistro);
                }
              });
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
function limpiarFormulario() {
  document.getElementById("nombre_completo").className = "form-control";
  document.getElementById("nombre_espacio").className = "form-control";
  document.getElementById("hora_entrada").className = "form-control";
  document.getElementById("hora_salida").className = "form-control";
  document.getElementById("fecha_entrada").className = "form-control";
  document.getElementById("fecha_salida").className = "form-control";
  document.getElementById("username").className = "form-control";
  document.getElementById("nombre_completo").value = "";
  document.getElementById("nombre_espacio").value = "";
  document.getElementById("hora_entrada").value = "";
  document.getElementById("hora_salida").value = "";
  document.getElementById("fecha_entrada").value = "";
  document.getElementById("fecha_salida").value = "";
  document.getElementById("username").value = "";
}
function openModal() {
  const modal = document.getElementById('editModal');
  modal.style.display = 'block';
}
function closeModal() {
  const modal = document.getElementById('editModal');
  modal.style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('editModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
var modal = document.getElementById("myModal");
// Obtener el botón que abre el modal
var opcionesButtons = document.querySelectorAll(".opciones-btn");
// Obtener el <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];
// Cuando el usuario hace clic en el botón, se abre el modal
opcionesButtons.forEach(button => {
  button.onclick = function () {
    modal.style.display = "block";
  };
});
// Cuando el usuario hace clic en cualquier lugar fuera del modal, se cierra
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function consultarReservaID(id) {
  //alert(id);
  $.ajax({
    url: url + id,
    type: "GET",
    success: function (result) {
      document.getElementById("id_reserva").value = result["id_reserva"];
      document.getElementById("nombre_espacio").value = result["nombre_espacio"];
      document.getElementById("hora_entrada").value = result["hora_entrada"];
      document.getElementById("hora_salida").value = result["hora_salida"];
      document.getElementById("fecha_entrada").value = result["fecha_entrada"];
      document.getElementById("fecha_salida").value = result["fecha_salida"];
    }
  });
}
function actualizarReserva() {
  var id_reserva = document.getElementById("id_reserva").value
  let formData = {
    "nombre_espacio": document.getElementById("nombre_espacio").value,
    "hora_entrada": document.getElementById("hora_entrada").value,
    "hora_salida": document.getElementById("hora_salida").value,
    "fecha_entrada": document.getElementById("fecha_entrada").value,
    "fecha_salida": document.getElementById("fecha_salida").value
  };
  if (validarCampos()) {
    $.ajax({
      url: url + id_reserva,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        Swal.fire({
          title: "¡Excelente!",
          text: "Se guardó correctamente",
          icon: "success"
        });
        historial();
      },
      error: function (error) {
        Swal.fire({
          title: "¡Error!",
          text: "No se guardó",
          icon: "error"
        });
      },
      error: function (error) {
        Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
      }
    });
  } else {
    Swal.fire({
      title: "¡Error!",
      text: "Llene todos los campos correctamente",
      icon: "error"
    });
  }
  function validarCampos() {
    // Obtener los valores de los campos
    var nombre_espacio = document.getElementById("nombre_espacio").value;
    var hora_entrada = document.getElementById("hora_entrada").value;
    var hora_salida = document.getElementById("hora_salida").value;
    var fecha_entrada = document.getElementById("fecha_entrada").value;
    var fecha_salida = document.getElementById("fecha_salida").value
    if (nombre_espacio === '' || hora_entrada === '' || hora_salida === '' || fecha_entrada === '' || fecha_salida === '') {
      return false; // Al menos un campo está vacío
    } else {
      return true; 
    }
  }

}
function eliminarReserva(idReserva) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas eliminar esta reserva?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: url + idReserva,
        type: "DELETE",
        success: function (response) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "La reserva ha sido eliminada correctamente.",
            icon: "success"
          });
          historial();
        },
        error: function (error) {
          Swal.fire("Error", "Error al eliminar la reserva. " + error.responseText, "error");
        }
      });
    }
  });
}
function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  // Imagen de diseño (Base64)
  const imgData = '../pdf/diseñopdf.jpg'; // Aquí va el Base64 de tu imagen
  // Tamaño de la página
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  // Agregar imagen de ondas en las esquinas
  doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
  // Título centrado
  const titulo = 'Historial de Reservaciones';
  const textWidth = doc.getTextWidth(titulo);
  const textX = (pageWidth - textWidth) / 2;
  doc.setFontSize(18);
  doc.setTextColor(26, 62, 104); // Color azul oscuro para el título
  doc.text(titulo, textX, 30);
  const head = [['Nombre Completo', 'Nombre Espacio', 'Hora Entrada', 'Hora Salida', 'Fecha Entrada', 'Fecha Salida']];
  const cuerpoTabla = document.getElementById('cuerpoTabla');
  const rows = [...cuerpoTabla.getElementsByTagName('tr')].map(row => {
      return [...row.getElementsByTagName('td')].map(cell => cell.innerText);
  });
  // Generar la tabla con nuevo diseño
  doc.autoTable({
      head: head,
      body: rows,
      startY: 50, // Ajustar según el espacio que necesites
      theme: 'grid', // Cambiar a un estilo de cuadrícula
      styles: {
          fillColor: [255, 255, 255], // Fondo blanco en las celdas
          textColor: [0, 0, 0],       // Texto negro
          lineColor: [44, 62, 80],    // Líneas de borde azul oscuro
          lineWidth: 0.1,
          fontSize: 10,
          fontStyle: 'normal',
          halign: 'center',           // Centrar el texto
          cellPadding: 5,             // Padding extra para mayor espacio
          overflow: 'linebreak',
      },
      headStyles: {
          fillColor: [26, 62, 104],   // Azul oscuro en el encabezado
          textColor: [255, 255, 255], // Texto blanco en el encabezado
          fontSize: 12,
          fontStyle: 'bold',
          lineWidth: 0.1,             // Bordes delgados
          halign: 'center',           // Centrar el texto en el encabezado
          cellPadding: 6,             // Más espacio en las celdas del encabezado
      },
      alternateRowStyles: {
          fillColor: [245, 245, 245]  // Alternar filas con un gris claro
      },
      tableLineColor: [26, 62, 104],  // Bordes de la tabla en azul oscuro
      tableLineWidth: 0.2,            // Grosor de las líneas de la tabla
  });
  // Guardar el PDF
  doc.save('HistorialReservaciones.pdf');
}