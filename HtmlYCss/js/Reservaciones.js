var url = "http://10.192.94.153:8080/api/v1/reserva/";

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
      //success: funcion que se ejecuta
      //cuando la peticion tiene exito
      console.log(result);

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      //Se limpia el cuepro de la tabla
      cuerpoTabla.innerHTML = "";
      //se hace un ciclo que recorra l arreglo con los datos
      for (var i = 0; i < result.length; i++) {
        //UNA ETIQUETA tr por cada registro
        var trResgistro = document.createElement("tr");

        let celdaNombreCompleto = document.createElement("td")
        let celdaNombreEspacio = document.createElement("td")
        let celdaHoraEntrada = document.createElement("td")
        let celdaHoraSalida = document.createElement("td")
        let celdaFechaEntrada = document.createElement("td")
        let celdaFechaSalida = document.createElement("td")

        //celdaId.innerText = result[i]["id_reserva"];
        celdaNombreCompleto.innerText = result[i]["nombre_completo"];
        celdaNombreEspacio.innerText = result[i]["nombre_espacio"];
        celdaHoraEntrada.innerText = result[i]["hora_entrada"];
        celdaHoraSalida.innerText = result[i]["hora_salida"];
        celdaFechaEntrada.innerText = result[i]["fecha_entrada"];
        celdaFechaSalida.innerText = result[i]["fecha_salida"];
        //trResgistro.appendChild(celdaId);
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
  })

}
function cerrarSesion() {
  localStorage.removeItem('authTokens'); 
  window.location.href = 'http://10.192.94.153:5500/HtmlYCss/indexHTML/InicioSesion.html';
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
  var urlLocal = url;
  if (capturarFiltro != "") {
    urlLocal += "busquedafiltro/" + capturarFiltro;
  }
  $.ajax({
    url: urlLocal,
    type: "GET",
    success: function (result) {
      //success: funcion que se ejecuta
      //cuando la peticion tiene exito
      console.log(result);

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      //Se limpia el cuepro de la tabla
      cuerpoTabla.innerHTML = "";
      //se hace un ciclo que recorra l arreglo con los datos
      for (var i = 0; i < result.length; i++) {
        var trResgistro = document.createElement("tr");
        //var celdaId = document.createElement("td");
        let celdaNombreCompleto = document.createElement("td")
        let celdaNombreEspacio = document.createElement("td")
        let celdaHoraEntrada = document.createElement("td")
        let celdaHoraSalida = document.createElement("td")
        let celdaFechaEntrada = document.createElement("td")
        let celdaFechaSalida = document.createElement("td")
        //celdaId.innerText = result[i]["id_reserva"];
        celdaNombreCompleto.innerText = result[i]["nombre_completo"];
        celdaNombreEspacio.innerText = result[i]["nombre_espacio"];
        celdaHoraEntrada.innerText = result[i]["hora_entrada"];
        celdaHoraSalida.innerText = result[i]["hora_salida"];
        celdaFechaEntrada.innerText = result[i]["fecha_entrada"];
        celdaFechaSalida.innerText = result[i]["fecha_salida"];

        let celdaOpcionEditar = document.createElement("td");
        let botonEditarReserva = document.createElement("button");
        botonEditarReserva.value = result[i]["id_reserva"];
        botonEditarReserva.innerHTML = "Editar";
        botonEditarReserva.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarReservaID(this.value);
        }
        botonEditarReserva.className = "btnEditar";
        celdaOpcionEditar.appendChild(botonEditarReserva);

        let celdaOpcionEliminar = document.createElement("td");
        let botonEliminarReserva = document.createElement("button");
        botonEliminarReserva.value = result[i]["id_reserva"];
        botonEliminarReserva.innerHTML = "Eliminar";
        botonEliminarReserva.onclick = function (e) {
          eliminarReserva(this.value);
        }
        botonEliminarReserva.className = "btnEliminar";
        celdaOpcionEditar.appendChild(botonEliminarReserva);

        //trResgistro.appendChild(celdaId);
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
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  })

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

    // Verificar si algún campo está vacío
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
  const titulo = 'Reservaciones Asigna Web';
  // Obtener el ancho de la página
  const pageWidth = doc.internal.pageSize.getWidth();
  // Calcular la posición X para centrar el título
  const textWidth = doc.getTextWidth(titulo);
  const textX = (pageWidth - textWidth) / 2;
  // Añadir título al PDF centrado
  doc.setFontSize(18);
  doc.text(titulo, textX, 22); // Coloca el título en la posición Y = 22
  // Restablecer el tamaño de la fuente para el contenido
  doc.setFontSize(12);
  doc.text(" ", 14, 30);
  // Definir las columnas de la tabla
  const head = [['Nombre Completo', 'Nombre Espacio', 'Hora Entrada', 'Hora Salida', 'fecha Entrada', 'fecha Salida']];
  // Obtener los datos de la tabla desde el DOM
  const cuerpoTabla = document.getElementById('cuerpoTabla');
  const rows = [...cuerpoTabla.getElementsByTagName('tr')].map(row => {
    return [...row.getElementsByTagName('td')].map(cell => cell.innerText);
  });
  // Generar la tabla en el PDF después del título
  doc.autoTable({
    head: head,
    body: rows,
    startY: 35, // Posición inicial de la tabla después del título
    theme: 'striped', // Cambiar el estilo de la tabla
    styles: { cellPadding: 3, fontSize: 10 },
    headStyles: { fillColor: [26, 62, 104] },
    bodyStyles: { fillColor: [255, 255, 255] }
  });
  doc.save('ReservacionesAsignaWeb.pdf');
}
const reservasExistentes = [
  { nombre: "Juan", espacio: "Sala A", fecha: "2024-09-27", horaEntrada: "10:00", horaSalida: "12:00" },
  { nombre: "María", espacio: "Sala B", fecha: "2024-09-27", horaEntrada: "11:00", horaSalida: "13:00" }
];
// Función para validar si una reserva ya existe con la misma fecha y hora
function validarReserva() {
  const nombreCompleto = document.getElementById('nombre_completo').value;
  const nombreEspacio = document.getElementById('nombre_espacio').value;
  const fechaReserva = document.getElementById('fecha_reserva').value;
  const horaEntrada = document.getElementById('hora_entrada').value;
  const horaSalida = document.getElementById('hora_salida').value;
  const conflicto = reservasExistentes.some(reserva => {
    return reserva.fecha === fechaReserva && reserva.horaEntrada === horaEntrada;
  });

  if (conflicto) {
    alert("Ya existe una reserva con la misma fecha y hora. Por favor elige otro horario.");
  } else {
    reservasExistentes.push({
      nombre: nombreCompleto,
      espacio: nombreEspacio,
      fecha: fechaReserva,
      horaEntrada: horaEntrada,
      horaSalida: horaSalida
    });
    alert("Reserva realizada exitosamente.");
  }
}
document.getElementById('formReserva').addEventListener('submit', function (event) {
  event.preventDefault(); 
  validarReserva();
});