
//document.getElementById("nombre_completo").addEventListener("keypress", soloLetras);
//document.getElementById("nombre_espacio").addEventListener("keypress", soloLetras);
//document.getElementById("hora_entrada").addEventListener("keypress", numerosYcaracteres);
//document.getElementById("hora_salida").addEventListener("keypress", numerosYcaracteres);


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

//cuando la página cargue 
// se debe cargar la información del formulario
//ejemplo nombre de la persona
function cargarFormulario() {
  // Obtener el token de autenticación del localStorage
  const authToken = localStorage.getItem('authTokens');
  $.ajax({
    url: 'http://localhost:8888/api/v1/user/profile', // URL de tu endpoint
    type: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}` // Agregar el token al encabezado
    },
    success: function (userData) {
      console.log(userData);
      document.getElementById("nombre_completo").value=userData["nombre_completo"];
    }
  }
  );
}

function crearReserva() {
  // Obtener el token de autenticación del localStorage
  const authToken = localStorage.getItem('authTokens');

  // Realizar una llamada al endpoint /profile para obtener los datos del usuario
  $.ajax({
    url: 'http://localhost:8888/api/v1/user/profile', // URL de tu endpoint
    type: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}` // Agregar el token al encabezado
    },
    success: function (userData) {
      let formData = {
        "userRegistro": userData.id_user, // Usar el ID del usuario obtenido
        "espacio": document.getElementById("id_espacio").value,
        "hora_entrada": document.getElementById("hora_entrada").value,
        "hora_salida": document.getElementById("hora_salida").value,
        "fecha_entrada": document.getElementById("fecha_entrada").value,
        "fecha_salida": document.getElementById("fecha_salida").value,
        "username": userData.nombre_completo // Suponiendo que 'nombre_completo' está en los datos del usuario
      };

      // Validar que las horas de entrada y salida no sean iguales
      if (!validarHoras(formData.hora_entrada, formData.hora_salida)) {
        return; // Si son iguales, no continuar
      }

      let camposValidos = true;
      let camposRequeridos = [
        "id_user",
        "id_espacio",
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
          url: urlReserva,
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
    },
    error: function (error) {
      Swal.fire("Error", "No se pudo obtener el perfil del usuario: " + error.responseText, "error");
    }
  });
}


function listaReservasCrearReserva() {
  $.ajax({
    url: urlReserva, // URL para obtener todas las reservas
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
          celdaNombreCompleto.innerText = reserva["userRegistro"]["nombre_completo"];
          celdaNombreEspacio.innerText = reserva["espacio"]["nombre_espacio"];
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
  var urlLocal = urlReserva;
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
document.addEventListener('DOMContentLoaded', function () {
  const authToken = localStorage.getItem('authTokens');

  // Si no hay un token, redirige al inicio de sesión
  if (!authToken) {
    window.location.href = urlRedireccionInicioSesion;
  }

  // Evitar que el usuario vuelva a la página anterior después de cerrar sesión
  window.history.replaceState(null, null, window.location.href); // Reemplaza el estado actual con la URL actual
  window.onpopstate = function () {
    window.location.href = urlRedireccionInicioSesion; // Siempre redirige al inicio de sesión al retroceder
  };
});

function cerrarSesion() {
  // Limpiar el token y redirigir
  localStorage.removeItem('authTokens');

  // Limpiar el historial del navegador para evitar regresar a la página anterior
  window.history.replaceState(null, null, urlRedireccionInicioSesion);

  // Redirigir al inicio de sesión
  window.location.href = urlRedireccionInicioSesion;
}


function sidebar() {
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

          celdaNombreCompleto.innerText = reserva["userRegistro"]["nombre_completo"];
          celdaNombreEspacio.innerText = reserva["espacio"]["nombre_espacio"];
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
  document.getElementById("id_user").className = "form-control";
  document.getElementById("id_espacio").className = "form-control";
  document.getElementById("hora_entrada").className = "form-control";
  document.getElementById("hora_salida").className = "form-control";
  document.getElementById("fecha_entrada").className = "form-control";
  document.getElementById("fecha_salida").className = "form-control";
  document.getElementById("username").className = "form-control";
  document.getElementById("id_user").value = "";
  document.getElementById("id_espacio").value = "";
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
    url: urlReserva + id,
    type: "GET",
    success: function (result) {
      document.getElementById("id_reserva").value = result["id_reserva"];
      document.getElementById("id_espacio").value = result["nombre_espacio"];
      document.getElementById("hora_entrada").value = result["hora_entrada"];
      document.getElementById("hora_salida").value = result["hora_salida"];
      document.getElementById("fecha_entrada").value = result["fecha_entrada"];
      document.getElementById("fecha_salida").value = result["fecha_salida"];
    }
  });
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
document.addEventListener('DOMContentLoaded', function () {
  // Obtener la fecha actual
  const today = new Date().toISOString().split('T')[0];

  // Establecer la fecha mínima en los campos de tipo date
  document.getElementById('fecha_entrada').setAttribute('min', today);
  document.getElementById('fecha_salida').setAttribute('min', today);
});
function cargarEspacios() {
  $.ajax({
    url: 'http://localhost:8888/api/v1/espacio/',
    type: 'GET',
    success: function (espacios) {
      const selectEspacios = document.getElementById('nombre_espacio');
      selectEspacios.innerHTML = '<option value="" selected disabled>Selecciona una opción</option>';

      espacios.forEach(function (espacio) {
        const option = document.createElement('option');
        option.value = espacio.id;
        option.text = espacio.nombre_del_espacio;
        selectEspacios.appendChild(option);
      });
    },
    error: function (error) {
      console.error("Error al cargar los espacios: ", error);
      Swal.fire('Error', 'No se pudieron cargar los espacios disponibles.', 'error');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  listaReservasCrearReserva();
  cargarEspacios();
});

function validarCampos() {
  // Obtener los valores de los campos
  var nombre_espacio = document.getElementById("nombre_espacio").value;
  var hora_entrada = document.getElementById("hora_entrada").value;
  var hora_salida = document.getElementById("hora_salida").value;
  var fecha_entrada = document.getElementById("fecha_entrada").value;
  var fecha_salida = document.getElementById("fecha_salida").value;

  // Comprobar si hay campos vacíos
  if (nombre_espacio === '' || hora_entrada === '' || hora_salida === '' || fecha_entrada === '' || fecha_salida === '') {
    return false; // Al menos un campo está vacío
  } else {
    return true;
  }
}

function validarHoras(horaEntrada, horaSalida) {
  if (horaEntrada === horaSalida) {
    Swal.fire({
      title: "¡Error!",
      text: "La hora de entrada no puede ser igual a la hora de salida",
      icon: "error"
    });
    return false;
  }
  return true;
}

function actualizarReserva() {
  var id_reserva = document.getElementById("id_reserva").value;
  let formData = {
    "nombre_espacio": document.getElementById("nombre_espacio").value,
    "hora_entrada": document.getElementById("hora_entrada").value,
    "hora_salida": document.getElementById("hora_salida").value,
    "fecha_entrada": document.getElementById("fecha_entrada").value,
    "fecha_salida": document.getElementById("fecha_salida").value
  };

  // Validar que las horas de entrada y salida no sean iguales
  if (!validarHoras(formData.hora_entrada, formData.hora_salida)) {
    return; // Si son iguales, no continuar
  }

  if (validarCampos()) {
    // Proceder a actualizar la reserva
    $.ajax({
      url: urlReserva + id_reserva,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        Swal.fire({
          title: "¡Excelente!",
          text: "Se guardó correctamente",
          icon: "success"
        });
        historial(); // Actualizar el historial de reservas
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
}


function cerrarModal() {
  // Suponiendo que estás utilizando el modal de Bootstrap
  const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
  if (modal) {
    modal.hide();
  }
}
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