var url = "http://5.183.11.147:8888/api/v1/reserva/";

document.getElementById("nombre_completo").addEventListener("keypress",soloLetras);
document.getElementById("nombre_espacio").addEventListener("keypress",soloLetras);
document.getElementById("hora_entrada").addEventListener("keypress",numerosYcaracteres);
document.getElementById("hora_salida").addEventListener("keypress",numerosYcaracteres);




function soloLetras(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  
  const letrasPermitidas=[
    //letras en minúsculas
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
    //LETRAS EN MAYÚSCULAS
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
    //letras con tildes, mayusculas y minusculas
    "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"
  ];

  if (!(letrasPermitidas.includes(event.key))){
    event.preventDefault();
    return;
  }
}


//función para que el titulo del libro permita solamente numeros y letras
function letrasYnumeros(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  
  const letrasPermitidas=[
    //letras en minúsculas
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
    //LETRAS EN MAYÚSCULAS
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
    //letras con tildes, mayusculas y minusculas
    "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"

  ];
  const numeroPermitidos=[
    '1', '2', '3','4','5','6','7','8','9','0'
  ];


  if (
    !(letrasPermitidas.includes(event.key)) &&
    !(numeroPermitidos.includes(event.key))
  ){
    event.preventDefault();
    return;
  }


}

function soloNumeros(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  
  const numeroPermitidos=[
    '1', '2', '3','4','5','6','7','8','9','0'
  ];

  if (!(numeroPermitidos.includes(event.key))){
    event.preventDefault();
    return;
  }
}

function letrasNumerosCaracteres(event){
    console.log("Llave presionada: "+event.key);
    console.log("Código tecla: "+event.keyCode);
    
    const letrasPermitidas=[
      //letras en minúsculas
      "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
      //LETRAS EN MAYÚSCULAS
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
      //letras con tildes, mayusculas y minusculas
      "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"
  
    ];
    const numeroPermitidos=[
      '1', '2', '3','4','5','6','7','8','9','0'
    ];
    const caracteresPermitidos=[
      '@','_','-','.'
    ];
  
  
    if (!(numeroPermitidos.includes(event.key)) && (letrasPermitidas.includes(event.key)) && (caracteresPermitidos.includes(event.key))){
      event.preventDefault();
      return;
    }
  
  
  }

  function numerosYcaracteres(event){
    console.log("Llave presionada: "+event.key);
    console.log("Código tecla: "+event.keyCode);
    
    const numeroPermitidos=[
      '1', '2', '3','4','5','6','7','8','9','0'
    ];
    const caracteresPermitidos=[
      ':'
    ];
  
  
    if (!(numeroPermitidos.includes(event.key)) && (caracteresPermitidos.includes(event.key))){
      event.preventDefault();
      return;
    }
  
  
  }
function listaReserva() {
  var capturarFiltro = document.getElementById("inputSearch").value;
  var urlLocal = url;
  if (capturarFiltro != "") {
    urlLocal += "busquedafiltro/" + capturarFiltro;
  }

  $.ajax({
    url: urlLocal,
    type: "GET",
    success: function(result) {
      console.log(result);

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = "";

      for (var i = 0; i < result.length; i++) {
        var trResgistro = document.createElement("tr");

        var celdaId = document.createElement("td");
        let celdaNombre_completo = document.createElement("td");
        let celdaNombre_espacio = document.createElement("td");
        let celdaHora_entrada = document.createElement("td");
        let celdaHora_salida = document.createElement("td");

        let celdaOpcionEditar = document.createElement("td");
        let botonEditarReserva = document.createElement("button");
        botonEditarReserva.value = result[i]["id_reserva"];
        botonEditarReserva.innerHTML = "Editar";
        botonEditarReserva.onclick = function(e) {
          $('#exampleModal').modal('show');
          consultarReservaID(this.value);
        }
        botonEditarReserva.className = "btn btn-warning editar-libro";
        celdaOpcionEditar.appendChild(botonEditarReserva);

        let celdaOpcionEliminar = document.createElement("td");
        let botonEliminarReserva = document.createElement("button");
        botonEliminarReserva.value = result[i]["id_reserva"];
        botonEliminarReserva.innerHTML = "Eliminar";
        botonEliminarReserva.onclick = function(e) {
          eliminarLibro(this.value);
        }
        botonEliminarReserva.className = "btn btn-danger eliminar-reserva";
        celdaOpcionEliminar.appendChild(botonEliminarReserva);

        celdaId.innerText = result[i]["id_reserva"];
        celdaNombre_completo.innerText = result[i]["nombre_completo"];
        celdaNombre_espacio.innerText = result[i]["nombre_espacio"];
        celdaHora_entrada.innerText = result[i]["hora_entrada"];
        celdaHora_salida.innerText = result[i]["hora_salida"];

        trResgistro.appendChild(celdaId);
        trResgistro.appendChild(celdaNombre_completo);
        trResgistro.appendChild(celdaNombre_espacio);
        trResgistro.appendChild(celdaHora_entrada);
        trResgistro.appendChild(celdaHora_salida);
        trResgistro.appendChild(celdaOpcionEditar);
        trResgistro.appendChild(celdaOpcionEliminar);

        cuerpoTabla.appendChild(trResgistro);
      }
    },
    error: function(error) {
      alert("Error en la petición " + error);
    }
  });
}


function eliminarReserva(idReserva) {
  // Confirmar con el usuario antes de eliminar
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
      // Realizar la petición AJAX para eliminar el libro
      $.ajax({
        url: url + idReserva,
        type: "DELETE",
        success: function(response) {
          // Mostrar mensaje de confirmación
          Swal.fire({
            title: "¡Eliminado!",
            text: "La reserva ha sido eliminado correctamente.",
            icon: "success"
          });
          // Volver a cargar la lista de libros después de eliminar
          listaReserva();
        },
        error: function(error) {
          // Mostrar mensaje de error si la petición falla
          Swal.fire("Error", "Error al eliminar la reserva. " + error.responseText, "error");
        }
      });
    }
  });
}

function actualizarReserva() {
    document.getElementById('exampleModal').style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('exampleModal').style.display = 'none';
}


//
function consultarReservaID(id){
  //alert(id);
  $.ajax({
      url:url+id,
      type:"GET",
      success: function(result){
          document.getElementById("id_reserva").value=result["id_reserva"];
          document.getElementById("nombre_completo").value=result["nombre_completo"];
          document.getElementById("nombre_espacio").value=result["nombre_espacio"];
          document.getElementById("hora_entrada").value=result["hora_entrada"];
          document.getElementById("hora_salida").value=result["hora_salida"];
      }
  });
}


function actualizarReserva() { 
  var id_reserva=document.getElementById("id_reserva").value
  let formData={
      "nombre_completo": document.getElementById("nombre_completo").value,
      "nombre_espacio": document.getElementById("nombre_espacio").value,
      "hora_entrada": document.getElementById("hora_entrada").value,
      "hora_salida": document.getElementById("hora_salida").value,
      "numero_ejemplares_disponibles": document.getElementById("numero_ejemplares_disponibles").value,
      "numero_ejemplares_ocupados": document.getElementById("numero_ejemplares_ocupados").value
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
    var titulo_libro = document.getElementById("titulo_libro").value;
    var autor_libro = document.getElementById("autor_libro").value;
    var isbn_libro = document.getElementById("isbn_libro").value;
    var genero_libro = document.getElementById("genero_libro").value;
    var numero_ejemplares_disponibles = document.getElementById("numero_ejemplares_disponibles").value;
    var numero_ejemplares_ocupados = document.getElementById("numero_ejemplares_ocupados").value
  
    // Verificar si algún campo está vacío
    if (titulo_libro === '' || autor_libro === '' || isbn_libro === '' || genero_libro === '' || numero_ejemplares_disponibles === '' || numero_ejemplares_ocupados === '') {
      return false; // Al menos un campo está vacío
    } else {
      return true; // Todos los campos están llenos
    }
  }
  
}

  

function registrarLibro() {


  let formData = {
    "nombre_completo": document.getElementById("nombre_completo").value,
    "nombre_espacio": document.getElementById("nombre_espacio").value,
    "hora_entrada": document.getElementById("hora_entrada").value,
    "hora_salida": document.getElementById("hora_salida").value,
    

  };

  let camposValidos = true;
  let camposRequeridos = [
      "nombre_completo",
      "nombre_espacio",
      "hora_entrada",
      "hora_salida",
      
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
              //limpiarLibro();
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