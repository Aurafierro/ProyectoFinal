var url = "http://localhost:8080/api/v1/reserva/";


function cerrarSesion() {
  // Eliminar el token de autenticación
  localStorage.removeItem('authTokens'); 
  
  // Limpiar el historial de navegación
  history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
  
  // Desactivar retroceso
  window.addEventListener('popstate', function (event) {
    history.pushState(null, null, urlRedireccionInicioSesion);
  });
  
  // Redirigir al inicio de sesión
  window.location.href = urlRedireccionInicioSesion;
}

function historial() {
  
    //METODO PARA LISTAR LOS CLIENTES
    //SE CREA LA PETICION AJAX
    var capturarFiltro = document.getElementById("inputSearch").value;
    var urlLocal=url;
    if (capturarFiltro!=""){
    urlLocal+="busquedafiltro/"+capturarFiltro;
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
            $('#myModal').modal('show');
            consultarReservaID(this.value);
          }
          botonEditarReserva.className = "btnEditar";
          celdaOpcionEditar.appendChild(botonEditarReserva);
  
  
          let celdaOpcionEliminar = document.createElement("td");
          let botonEliminarReserva = document.createElement("button");
          botonEliminarReserva.value = result[i]["id_reserva"];
          botonEliminarReserva.innerHTML = "Eliminar";
          botonEliminarReserva.onclick = function (e) {
            // Aquí deberías escribir la lógica para eliminar el libro con el id correspondiente
            // Puedes usar una función separada para realizar la eliminación
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
  
  
          //creamos un td por cada campo de resgistro
  
        }
      },
      error: function (error) {
        /*
        ERROR: funcion que se ejecuta cuando la peticion tiene un error
        */
        alert("Error en la petición " + error);
      }
    })
  
  }


  function actualizarReserva() { 
    var id_reserva=document.getElementById("id_reserva").value
    let formData={
        "nombre_completo": document.getElementById("nombre_completo").value,
        "nombre_espacio": document.getElementById("nombre_espacio").value,
        "hora_entrada": document.getElementById("hora_entrada").value,
        "hora_salida": document.getElementById("hora_salida").value,
        "fecha_entrada": document.getElementById("fecha_entrada").value,
        "fecha_salida": document.getElementById("fecha_salida").value
  };
  
  if (validarCampos()) {
    $.ajax({
        url:url+id_reserva,
        type: "PUT",
        data: formData,
      
        
        success: function(result) {
          
            // Manejar la respuesta exitosa según necesites
            Swal.fire({
                title: "¡Excelente!",
                text: "Se guardó correctamente",
                icon: "success"
              });
            // Puedes hacer algo adicional como recargar la lista de libros
            listarLibro();
        },
        error: function(error) {
            // Manejar el error de la petición
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
      var nombre_completo = document.getElementById("nombre_completo").value;
      var nombre_espacio = document.getElementById("nombre_espacio").value;
      var hora_entrada = document.getElementById("hora_entrada").value;
      var hora_salida = document.getElementById("hora_salida").value;
      var fecha_entrada = document.getElementById("fecha_entrada").value;
      var fecha_salida = document.getElementById("fecha_salida").value
    
      // Verificar si algún campo está vacío
      if (nombre_completo === '' || nombre_espacio === '' || hora_entrada === '' || hora_salida === '' || fecha_entrada === '' || fecha_salida === '') {
        return false; // Al menos un campo está vacío
      } else {
        return true; // Todos los campos están llenos
      }
    }
    
  }
  