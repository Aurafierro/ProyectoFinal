var url = "http://localhost:8080/api/v1/reserva/";

function crearReserva() {
    let formData = {
      "nombre_completo": document.getElementById("nombre_completo").value,
      "nombre_espacio": document.getElementById("nombre_espacio").value,
      "hora_entrada": document.getElementById("hora_entrada").value,
      "hora_salida": document.getElementById("hora_salida").value,
      "fecha_entrada": document.getElementById("hora_salida").value,
      "fecha_salida": document.getElementById("hora_salida").value
      
  
    };
  
    let camposValidos = true;
    let camposRequeridos = [
        "nombre_completo",
        "nombre_espacio",
        "hora_entrada",
        "hora_salida",
        "fecha_entrada",
        "fecha_salida"
        
    ];
  
    camposRequeridos.forEach(function(campo) {
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
                //limpiarFormulario();
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
  
  //se ejecuta la peticion
  //Validar nombre completo
  
  function validarCampos() {
    var nombre_completo = document.getElementById("nombre_completo");
    return validarNombre_completo(nombre_completo);
  }
  function validarNombre_completo(cuadroNumero) {
  
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 3 || valor.length > 36) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  
  //Valida la hora de entrada
  function validarCampos() {
    var hora_entrada = document.getElementById("hora_entrada");
    return validarHora_entrada(hora_entrada);
  }
  function validarHora_entrada(cuadroNumero) {
    
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 36) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  //Valida la hora de salida
  function validarCampos() {
    var hora_salida = document.getElementById("hora_salida");
    return validarHora_salida(hora_salida);
  }
  function validarHora_salida(cuadroNumero) {
    
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 1 || valor.length > 36) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }

  //función de la tabla, la lista de todas las reservas realizadas

  function tablaReservas() {
    //METODO PARA LISTAR LOS CLIENTES
    //SE CREA LA PETICION AJAX
    //var capturarFiltro = document.getElementById("inputSearch").value;
    //var urlLocal=url;
    //if (capturarFiltro!=""){
    //  urlLocal+="busquedafiltro/"+capturarFiltro;
    //}
    
    $.ajax({
      url: url,
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
  
          //trResgistro.appendChild(celdaId);
          trResgistro.appendChild(celdaNombreCompleto);
          trResgistro.appendChild(celdaNombreEspacio);
          trResgistro.appendChild(celdaHoraEntrada);
          trResgistro.appendChild(celdaHoraSalida);
          trResgistro.appendChild(celdaFechaEntrada);
          trResgistro.appendChild(celdaFechaSalida);
  
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
