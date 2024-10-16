
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
  
  // Función para cargar los datos del usuario en el formulario
  window.onload = function () {
    cargarFormulario(); // Cargar los datos del usuario cuando se carga la página
  };
  
  // Función para cargar la información del usuario en el formulario
  function cargarFormulario() {
    const authToken = localStorage.getItem('authTokens');
  
    $.ajax({
      url: urlProfile, // URL del endpoint para obtener los datos del perfil del usuario
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}` // Agregar el token al encabezado
      },
      success: function (userData) {
        console.log(userData);
  
        // Verificar que los elementos existen antes de asignarles valores
        var nombreCompletoField = document.getElementById("nombre_completo");
        var usernameField = document.getElementById("username");
        var idUserField = document.getElementById("id_user");
  
        if (nombreCompletoField && usernameField && idUserField) {
          nombreCompletoField.value = userData["nombre_completo"];
          usernameField.value = userData["username"];
          idUserField.value = userData["id_user"];  // Asegúrate de que `id_user` sea el ID de `userRegistro`
        } else {
          console.log("Error: Uno o más campos no existen en el DOM.");
        }
      },
      error: function (error) {
        console.log("Error al cargar los datos del usuario:", error);
      }
    });
    tablaReservas();
    
  }
  
  // Definir las funciones de validación de horas
  function validarHora_entrada(input) {
    console.log("Validando hora de entrada:", input.value);
  }
  
  function validarHora_salida(input) {
    console.log("Validando hora de salida:", input.value);
  }
  
  // Función para crear la reserva
  function crearReserva() {
    // Obtener los valores de los campos del formulario
    var nombreCompleto = document.getElementById("nombre_completo").value;
    var username = document.getElementById("username").value;
    var idUser = document.getElementById("id_user").value;  // ID de la tabla `userRegistro`
    var idEspacio = document.getElementById("nombre_espacio").value;  // ID de la tabla `espacio`
    var horaEntrada = document.getElementById("hora_entrada").value;
    var horaSalida = document.getElementById("hora_salida").value;
    var fechaEntrada = document.getElementById("fecha_entrada").value;
    var fechaSalida = document.getElementById("fecha_salida").value;
  
    // Validar que no haya campos vacíos
    if (!validarCampos()) {
        Swal.fire({
            title: "¡Error!",
            text: "Todos los campos son obligatorios",
            icon: "error"
        });
        return;
    }
  
    // Validar que las horas no sean iguales
    if (!validarHoras(horaEntrada, horaSalida)) {
        Swal.fire({
            title: "¡Error!",
            text: "La hora de entrada y salida no pueden ser iguales",
            icon: "error"
        });
        return;
    }
  
    // Crear un objeto con los datos a enviar (en formato JSON)
    var reservaData = {
        userRegistro: {
            id_user: idUser,
            nombre_completo: nombreCompleto,
            username: username
        },
        espacio: {
            id_espacio: idEspacio  // Asegúrate de que el nombre coincide con lo que espera el backend
        },
        hora_entrada: horaEntrada,
        hora_salida: horaSalida,
        fecha_entrada: fechaEntrada,
        fecha_salida: fechaSalida
    };
  
    console.log("Datos enviados:", JSON.stringify(reservaData));
  
    // Realizar la petición POST con el Content-Type adecuado
    $.ajax({
        url: urlReserva, // URL de tu endpoint de reserva
        type: 'POST',
        contentType: "application/json", // Definir el tipo de contenido como JSON
        data: JSON.stringify(reservaData), // Convertir el objeto a JSON antes de enviarlo
        success: function (response) {
            Swal.fire({
                title: "¡Reserva creada!",
                text: "La reserva se ha creado correctamente",
                icon: "success"
            });
            listaReservasCrearReserva(); // Recargar la lista de reservas
        },
        error: function (error) {
            Swal.fire({
                title: "¡Error!",
                text: "Ocurrió un error al crear la reserva",
                icon: "error"
            });
            console.log("Error al crear la reserva:", error.responseJSON || error.responseText || error);
        }
    });
  }
  
  // Validar que todos los campos estén llenos
  function validarCampos() {
    var idEspacio = document.getElementById("nombre_espacio").value;
    var horaEntrada = document.getElementById("hora_entrada").value;
    var horaSalida = document.getElementById("hora_salida").value;
    var fechaEntrada = document.getElementById("fecha_entrada").value;
    var fechaSalida = document.getElementById("fecha_salida").value;
  
    return idEspacio !== '' && horaEntrada !== '' && horaSalida !== '' && fechaEntrada !== '' && fechaSalida !== '';
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
            celdaNombreEspacio.innerText = reserva["espacio"]["nombre_del_espacio"];
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
  
        // Llamar a cargarFormulario después de cargar la tabla
        cargarFormulario();
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
            celdaNombreEspacio.innerText = reserva["espacio"]["nombre_del_espacio"];
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
        document.getElementById("nombre_espacio").value = result["espacio"]["id_espacio"];
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
  // Función para llenar el select con los espacios desde el servidor
  function cargarEspacios() {
    fetch(urlAnadirEspacio)  // Asegúrate de que esta URL sea correcta
      .then(response => response.json())
      .then(data => {
        var select = document.getElementById("nombre_espacio");
        // Limpiar cualquier opción previa en el select
        select.innerHTML = '<option value="" selected disabled>Selecciona una opción</option>';
  
        // Iterar sobre los espacios recibidos desde el servidor
        data.forEach(function(espacio) {
          var option = document.createElement("option");
          option.value = espacio.id_espacio;  // ID del espacio
          option.text = espacio.nombre_del_espacio;  // Nombre del espacio
          select.add(option);
        });
      })
      .catch(error => {
        console.error("Error al cargar los espacios:", error);
      });
  }
  
  // Llamar a la función para cargar los espacios cuando la página esté lista
  document.addEventListener('DOMContentLoaded', function() {
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
    // Obtener los valores de los campos del formulario
    var idUser = document.getElementById("id_user").value;  // ID de la tabla `userRegistro`
    var idEspacio = document.getElementById("nombre_espacio").value;  // ID de la tabla `espacio`
    var horaEntrada = document.getElementById("hora_entrada").value;
    var horaSalida = document.getElementById("hora_salida").value;
    var fechaEntrada = document.getElementById("fecha_entrada").value;
    var fechaSalida = document.getElementById("fecha_salida").value;
    var idReserva = document.getElementById("id_reserva").value; // ID de la reserva
  
    // Validar que no haya campos vacíos
    if (!validarCampos()) {
      Swal.fire({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error"
      });
      return;
    }
  
    // Validar que las horas no sean iguales
    if (!validarHoras(horaEntrada, horaSalida)) {
      Swal.fire({
        title: "¡Error!",
        text: "La hora de entrada y salida no pueden ser iguales",
        icon: "error"
      });
      return;
    }
  
    // Crear un objeto con los datos a enviar (en formato JSON)
    var reservaData = {
      espacio: {
        id_espacio: idEspacio  // Asegúrate de que el nombre coincide con lo que espera el backend
      },
      hora_entrada: horaEntrada,
      hora_salida: horaSalida,
      fecha_entrada: fechaEntrada,
      fecha_salida: fechaSalida
    };
  
    console.log("Datos enviados:", JSON.stringify(reservaData));
  
    // Realizar la petición PUT con el Content-Type adecuado
    $.ajax({
      url: urlReserva + idReserva, // URL de tu endpoint de actualización
      type: 'PUT',
      contentType: "application/json", // Definir el tipo de contenido como JSON
      data: JSON.stringify(reservaData), // Convertir el objeto a JSON antes de enviarlo
      success: function (response) {
        Swal.fire({
          title: "¡Reserva actualizada!",
          text: "La reserva se ha actualizado correctamente",
          icon: "success"
        });
        historial(); // Actualizar el historial de reservas
      },
      error: function (error) {
        Swal.fire({
          title: "¡Error!",
          text: "Ocurrió un error al actualizar la reserva",
          icon: "error"
        });
        console.log("Error al actualizar la reserva:", error.responseJSON || error.responseText || error);
      }
    });
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