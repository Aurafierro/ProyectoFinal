var url = "http://localhost:8080/api/v1/reserva/";

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


function eliminarLibro(idLibro) {
  // Confirmar con el usuario antes de eliminar
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas eliminar este libro?",
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
        url: url + idLibro,
        type: "DELETE",
        success: function(response) {
          // Mostrar mensaje de confirmación
          Swal.fire({
            title: "¡Eliminado!",
            text: "El libro ha sido eliminado correctamente.",
            icon: "success"
          });
          // Volver a cargar la lista de libros después de eliminar
          listarLibro();
        },
        error: function(error) {
          // Mostrar mensaje de error si la petición falla
          Swal.fire("Error", "Error al eliminar el libro. " + error.responseText, "error");
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
function consultarLibroID(id){
  //alert(id);
  $.ajax({
      url:url+id,
      type:"GET",
      success: function(result){
          document.getElementById("id_libro").value=result["id_libro"];
          document.getElementById("titulo_libro").value=result["titulo_libro"];
          document.getElementById("autor_libro").value=result["autor_libro"];
          document.getElementById("isbn_libro").value=result["isbn_libro"];
          document.getElementById("genero_libro").value=result["genero_libro"];
          document.getElementById("numero_ejemplares_disponibles").value=result["numero_ejemplares_disponibles"];
          document.getElementById("numero_ejemplares_ocupados").value=result["numero_ejemplares_ocupados"];
      }
  });
}
//2.Crear petición que actualice la información del libro


function actualizarLibro() { 
  var id_libro=document.getElementById("id_libro").value
  let formData={
      "titulo_libro": document.getElementById("titulo_libro").value,
      "autor_libro": document.getElementById("autor_libro").value,
      "isbn_libro": document.getElementById("isbn_libro").value,
      "genero_libro": document.getElementById("genero_libro").value,
      "numero_ejemplares_disponibles": document.getElementById("numero_ejemplares_disponibles").value,
      "numero_ejemplares_ocupados": document.getElementById("numero_ejemplares_ocupados").value
};

if (validarCampos()) {
  $.ajax({
      url:url+id_libro,
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
    "titulo_libro": document.getElementById("titulo_libro").value,
    "autor_libro": document.getElementById("autor_libro").value,
    "isbn_libro": document.getElementById("isbn_libro").value,
    "genero_libro": document.getElementById("genero_libro").value,
    "numero_ejemplares_disponibles": document.getElementById("numero_ejemplares_disponibles").value,
    "numero_ejemplares_ocupados": document.getElementById("numero_ejemplares_ocupados").value

  };

  let camposValidos = true;
  let camposRequeridos = [
      "titulo_libro",
      "autor_libro",
      "isbn_libro",
      "genero_libro",
      "numero_ejemplares_disponibles",
      "numero_ejemplares_ocupados"
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
              limpiarLibro();
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


function validarCampos() {
  var isbn_libro = document.getElementById("isbn_libro");
  return validarIsbn_libro(isbn_libro);
}
function validarIsbn_libro(cuadroNumero) {
  /*
  isbn del libro
  min=5
  max=40
  numero entero

  si cumple, se cambia color a verde
  si no, se cambia a rojo
  */
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 5 || valor.length > 13) {
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

//ValidadAutor

function validarCampos() {
  var autor_libro = document.getElementById("autor_libro");
  return validarAutor_libro(autor_libro);
}
function validarAutor_libro(cuadroNumero) {

  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 3 || valor.length > 40) {
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

//Valida el titulo del libro
function validarCampos() {
  var titulo_libro = document.getElementById("titulo_libro");
  return validarTitulo_libro(titulo_libro);
}
function validarTitulo_libro(cuadroNumero) {
  
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 2 || valor.length > 40) {
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

//Valida el genero
function validarCampos() {
  var genero_libro = document.getElementById("genero_libro");
  return validarGenero_libro(genero_libro);
}
function validarGenero_libro(cuadroNumero) {
  
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 5 || valor.length > 40) {
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

//Valida los numeros de ejemplares que estan disponibles
function validarCampos() {
  var numero_ejemplares_disponibles = document.getElementById("numero_ejemplares_disponibles");
  return validarNumero_ejemplares_disponibles(numero_ejemplares_disponibles);
}
function validarNumero_ejemplares_disponibles(cuadroNumero) {
  
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1 || valor.length > 40) {
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
//Valida los numeros de ejemplares que ya estan ocupados


function validarCampos() {
  var numero_ejemplares_ocupados = document.getElementById("numero_ejemplares_ocupados");
  return validarNumero_ejemplares_ocupados(numero_ejemplares_ocupados);
}
function validarNumero_ejemplares_ocupados(cuadroNumero) {
  
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 1  || valor.length > 40) {
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




function limpiarLibro() {
  document.getElementById("titulo_libro").className="form-control";
  document.getElementById("autor_libro").className="form-control";
  document.getElementById("isbn_libro").className="form-control";
  document.getElementById("genero_libro").className="form-control";
  document.getElementById("numero_ejemplares_disponibles").className="form-control";
  document.getElementById("numero_ejemplares_ocupados").className="form-control";


  document.getElementById("titulo_libro").value = "";
  document.getElementById("autor_libro").value = "";
  document.getElementById("isbn_libro").value = "";
  document.getElementById("genero_libro").value = "";
  document.getElementById("numero_ejemplares_disponibles").value = "";
  document.getElementById("numero_ejemplares_ocupados").value = "";
}