document.getElementById('agregarIcono').addEventListener('click', function() {
  document.getElementById('imagenEvento').click();
});

document.getElementById('imagenEvento').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('imagenSeleccionada').setAttribute('src', e.target.result);
    document.getElementById('imagenSeleccionada').style.display = 'block';
  }
  reader.readAsDataURL(file);
});

document.getElementById('nombreEvento').addEventListener('click', function() {
  this.placeholder = '';
});

document.getElementById('nombreEvento').addEventListener('blur', function() {
  if (this.value === '') {
    this.placeholder = 'Nombre del evento';
  }
});

document.getElementById('eventoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aquí puedes agregar la lógica para enviar los datos del formulario
  alert('Datos enviados correctamente');
});

var url = "http://localhost:localhost:8080/api/v1/espacio/";

document.getElementById("nombre_del_espacio").addEventListener("keypress", soloLetras);
document.getElementById("clasificacion").addEventListener("keypress", soloLetras);
document.getElementById("capacidad").addEventListener("keypress", soloNumeros);
document.getElementById("descripcion").addEventListener("keypress", soloLetras);


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

function crearEspacio() {
  let formData = {
    "nombre_del_espacio": document.getElementById("nombre_del_espacio").value,
    "clasificacion": document.getElementById("clasificacion").value,
    "capacidad": document.getElementById("capacidad").value,
    "descripcion": document.getElementById("descripcion").value
  };

  let camposValidos = true;
  let camposRequeridos = [
    "nombre_del_espacio",
    "clasificacion",
    "capacidad",
    "descripcion"

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
        espaciosRegistrados();
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

function espaciosRegistrados() {
  var capturarFiltro = document.getElementById("inputSearch").value;
  var urlLocal=url;
  if (capturarFiltro!=""){
  urlLocal+="busquedafiltro/"+capturarFiltro;
  }

  $.ajax({
    url: urlLocal,
    type: "GET",
    success: function (result) {
      console.log(result);

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = "";
      //se hace un ciclo que recorra l arreglo con los datos
      for (var i = 0; i < result.length; i++) {
        //UNA ETIQUETA tr por cada registro
        var trResgistro = document.createElement("tr");

        let celdaNombreEspacio = document.createElement("td")
        let celdaClasificacion = document.createElement("td")
        let celdaCapacidad = document.createElement("td")
        let celdaDescripcion = document.createElement("td")


        celdaNombreEspacio.innerText = result[i]["nombre_del_espacio"];
        celdaClasificacion.innerText = result[i]["clasificacion"];
        celdaCapacidad.innerText = result[i]["capacidad"];
        celdaDescripcion.innerText = result[i]["descripcion"];

        let celdaOpcionEditar = document.createElement("td");
        let botonEditarEspacio = document.createElement("button");
        botonEditarEspacio.value = result[i]["id_espacio"];
        botonEditarEspacio.innerHTML = "Editar";
        botonEditarEspacio.onclick = function (e) {
          $('#exampleModal').modal('show');
          consultarEspacioID(this.value);
        }
        botonEditarEspacio.className = "btnEditar";
        celdaOpcionEditar.appendChild(botonEditarEspacio);


        let celdaOpcionEliminar = document.createElement("td");
        let botonEliminarEspacio = document.createElement("button");
        botonEliminarEspacio.value = result[i]["id_espacio"];
        botonEliminarEspacio.innerHTML = "Eliminar";
        botonEliminarEspacio.onclick = function (e) {
          eliminarEspacio(this.value);
        }
        botonEliminarEspacio.className = "btnEliminar";
        celdaOpcionEditar.appendChild(botonEliminarEspacio);


        //trResgistro.appendChild(celdaId);
        trResgistro.appendChild(celdaNombreEspacio);
        trResgistro.appendChild(celdaClasificacion);
        trResgistro.appendChild(celdaCapacidad);
        trResgistro.appendChild(celdaDescripcion);
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

//funcion para que el formulario quede vacío de nuevo, después de realizar un registro
function limpiarFormulario() {
  document.getElementById("nombre_del_espacio").className="form-control";
  document.getElementById("clasificacion").className="form-control";
  document.getElementById("capacidad").className="form-control";
  document.getElementById("descripcion").className="form-control";


  document.getElementById("nombre_del_espacio").value = "";
  document.getElementById("clasificacion").value = "";
  document.getElementById("capacidad").value = "";
  document.getElementById("descripcion").value = "";
}

function consultarEspacioID(id){
  //alert(id);
  $.ajax({
      url:url+id,
      type:"GET",
      success: function(result){
          document.getElementById("id_espacio").value=result["id_espacio"];
          document.getElementById("nombre_del_espacio").value=result["nombre_del_espacio"];
          document.getElementById("clasificacion").value=result["clasificacion"];
          document.getElementById("capacidad").value=result["capacidad"];
          document.getElementById("descripcion").value=result["descripcion"];
      }
  });
}

function actualizarEspacio() { 
  var id_espacio=document.getElementById("id_espacio").value
  let formData={
      "nombre_del_espacio": document.getElementById("nombre_del_espacio").value,
      "clasificacion": document.getElementById("clasificacion").value,
      "capacidad": document.getElementById("capacidad").value,
      "descripcion": document.getElementById("descripcion").value
};

if (validarCampos()) {
  $.ajax({
      url:url+id_espacio,
      type: "PUT",
      contentType: "application/json",
            data: JSON.stringify(formData),
    
      
      success: function(result) {
        
          // Manejar la respuesta exitosa según necesites
          Swal.fire({
              title: "¡Excelente!",
              text: "Se guardó correctamente",
              icon: "success"
            });
          // Puedes hacer algo adicional como recargar la lista de libros
          espaciosRegistrados();
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
    var nombre_del_espacio = document.getElementById("nombre_del_espacio").value;
    var clasificacion = document.getElementById("clasificacion").value;
    var capacidad = document.getElementById("capacidad").value;
    var descripcion = document.getElementById("descripcion").value
  
    // Verificar si algún campo está vacío
    if (nombre_del_espacio === '' || clasificacion === '' || capacidad === '' || descripcion === '') {
      return false; // Al menos un campo está vacío
    } else {
      return true; // Todos los campos están llenos
    }
  }
  
}

function eliminarEspacio(idEspacio) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas eliminar este espacio?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: url + idEspacio,
        type: "DELETE",
        success: function(response) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El espacio ha sido eliminada correctamente.",
            icon: "success"
          });
          espaciosRegistrados();
        },
        error: function(error) {
          Swal.fire("Error", "Error al eliminar el espacio. " + error.responseText, "error");
        }
      });
    }
  });
}