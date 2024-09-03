var url = "http://192.168.20.181:8080/api/v1/reserva/";

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