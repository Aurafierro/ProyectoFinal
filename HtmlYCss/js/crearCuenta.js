var url = "http://localhost:8080/api/v1/user/";




function crearCuenta() {


    let formData = {
      "tipo_documento": document.getElementById("tipo_documento").value,
      "numero_documento": document.getElementById("numero_documento").value,
      "nombre_completo": document.getElementById("nombre_completo").value,
      "telefono": document.getElementById("telefono").value,
      "correo": document.getElementById("correo").value,
      "rol": document.getElementById("rol").value

  
    };
  
    let camposValidos = true;
    let camposRequeridos = [
        "tipo_documento",
        "numero_documento",
        "nombre_completo",
        "telefono",
        "correo",
        "rol"

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
                limpiarFormulario();
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
  
 // Función para validar el número de documento
function validarNumero_documento(elemento) {
  var valor = elemento.value;
  if (valor.length < 5) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El número de documento debe tener al menos 5 caracteres.'
      }).then((result) => {
          if (result.isConfirmed) {
              elemento.focus();
          }
      });
  }
}

// Función para validar el nombre completo
function validarNombre_completo(elemento) {
  var valor = elemento.value.trim();
  if (valor === "") {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, ingresa tu nombre completo.'
      }).then((result) => {
          if (result.isConfirmed) {
              elemento.focus();
          }
      });
  }
}




// Función para validar el número de teléfono
function validarTelefono(elemento) {
  var valor = elemento.value.trim();
  if (valor.length !== 10) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El número de teléfono debe tener 10 dígitos.'
      }).then((result) => {
          if (result.isConfirmed) {
              elemento.focus();
          }
      });
  }
}

  
  function limpiarFormulario() {
    document.getElementById("tipo_documento").className="form-control";
    document.getElementById("numero_documento").className="form-control";
    document.getElementById("nombre_completo").className="form-control";
    document.getElementById("telefono").className="form-control";
    document.getElementById("correo").className="form-control";
    document.getElementById("rol").className="form-control";
  
  
    document.getElementById("tipo_documento").value = "";
    document.getElementById("rol").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("numero_documento").value = "";
    document.getElementById("nombre_completo").value = "";
    document.getElementById("correo").value = "";
  }