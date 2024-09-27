var url = "http://localhost:8080/api/v1/reserva/";

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('token');
  window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html';
}

// Validar que solo se ingresen letras
function soloLetras(event) {
  const letrasPermitidas = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
  ];
  if (!letrasPermitidas.includes(event.key)) {
    event.preventDefault();
  }
}

// Validar letras y números
function letrasYnumeros(event) {
  const letrasPermitidas = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
  ];
  if (!letrasPermitidas.includes(event.key)) {
    event.preventDefault();
  }
}

// Validar solo números
function soloNumeros(event) {
  const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  if (!numeroPermitidos.includes(event.key)) {
    event.preventDefault();
  }
}

// Validar letras, números y caracteres especiales
function letrasNumerosCaracteres(event) {
  const letrasPermitidas = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '@', '_', '-', '.'
  ];
  if (!letrasPermitidas.includes(event.key)) {
    event.preventDefault();
  }
}

// Validar números y caracteres de hora
function numerosYcaracteres(event) {
  const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const caracteresPermitidos = [':'];
  if (!(numeroPermitidos.includes(event.key) || caracteresPermitidos.includes(event.key))) {
    event.preventDefault();
  }
}

// Función para crear una nueva reserva
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
    "nombre_completo", "nombre_espacio", "hora_entrada", "hora_salida", "fecha_entrada", "fecha_salida", "username"
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

// Función para mostrar la tabla de reservas
function tablaReservas() {
  $.ajax({
    url: url,
    type: "GET",
    success: function (result) {
      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = ""; // Limpiar el cuerpo de la tabla
      for (var i = 0; i < result.length; i++) {
        var trResgistro = document.createElement("tr");

        let celdaNombreCompleto = document.createElement("td");
        let celdaNombreEspacio = document.createElement("td");
        let celdaHoraEntrada = document.createElement("td");
        let celdaHoraSalida = document.createElement("td");
        let celdaFechaEntrada = document.createElement("td");
        let celdaFechaSalida = document.createElement("td");

        celdaNombreCompleto.innerText = result[i]["nombre_completo"];
        celdaNombreEspacio.innerText = result[i]["nombre_espacio"];
        celdaHoraEntrada.innerText = result[i]["hora_entrada"];
        celdaHoraSalida.innerText = result[i]["hora_salida"];
        celdaFechaEntrada.innerText = result[i]["fecha_entrada"];
        celdaFechaSalida.innerText = result[i]["fecha_salida"];

        trResgistro.appendChild(celdaNombreCompleto);
        trResgistro.appendChild(celdaNombreEspacio);
        trResgistro.appendChild(celdaHoraEntrada);
        trResgistro.appendChild(celdaHoraSalida);
        trResgistro.appendChild(celdaFechaEntrada);
        trResgistro.appendChild(celdaFechaSalida);

        cuerpoTabla.appendChild(trResgistro);
      }
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}

// Función para buscar en el historial de reservas
function historial() {
  var capturarFiltro = document.getElementById("inputSearch").value.trim();
  var urlLocal = url;

  if (capturarFiltro !== "") {
    urlLocal += "busquedafiltro/" + encodeURIComponent(capturarFiltro);
  }

  $.ajax({
    url: urlLocal,
    type: "GET",
    success: function (result) {
      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = "";
      for (var i = 0; i < result.length; i++) {
        var trResgistro = document.createElement("tr");

        let celdaNombreCompleto = document.createElement("td");
        let celdaNombreEspacio = document.createElement("td");
        let celdaHoraEntrada = document.createElement("td");
        let celdaHoraSalida = document.createElement("td");
        let celdaFechaEntrada = document.createElement("td");
        let celdaFechaSalida = document.createElement("td");

        celdaNombreCompleto.innerText = result[i]["nombre_completo"];
        celdaNombreEspacio.innerText = result[i]["nombre_espacio"];
        celdaHoraEntrada.innerText = result[i]["hora_entrada"];
        celdaHoraSalida.innerText = result[i]["hora_salida"];
        celdaFechaEntrada.innerText = result[i]["fecha_entrada"];
        celdaFechaSalida.innerText = result[i]["fecha_salida"];

        trResgistro.appendChild(celdaNombreCompleto);
        trResgistro.appendChild(celdaNombreEspacio);
        trResgistro.appendChild(celdaHoraEntrada);
        trResgistro.appendChild(celdaHoraSalida);
        trResgistro.appendChild(celdaFechaEntrada);
        trResgistro.appendChild(celdaFechaSalida);

        cuerpoTabla.appendChild(trResgistro);
      }
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}

// Limpiar formulario después de crear reserva
function limpiarFormulario() {
  document.getElementById("nombre_completo").value = "";
  document.getElementById("nombre_espacio").value = "";
  document.getElementById("hora_entrada").value = "";
  document.getElementById("hora_salida").value = "";
  document.getElementById("fecha_entrada").value = "";
  document.getElementById("fecha_salida").value = "";
  document.getElementById("username").value = "";
}

