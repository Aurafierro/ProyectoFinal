var url = "http://192.168.20.181:8080/api/v1/user/";

document.getElementById("nombre_completo").addEventListener("keypress", soloLetras);
document.getElementById("nombre_espacio").addEventListener("keypress", soloLetras);
document.getElementById("hora_entrada").addEventListener("keypress", numerosYcaracteres);
document.getElementById("hora_salida").addEventListener("keypress", numerosYcaracteres);


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


//función para que el titulo del libro permita solamente numeros y letras
function letrasYnumeros(event) {
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
    //letras en minúsculas
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
    //LETRAS EN MAYÚSCULAS
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
    //letras con tildes, mayusculas y minusculas
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


function crearCuenta() {
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "nombre_completo": document.getElementById("nombre_completo").value,
        "telefono": document.getElementById("telefono").value,
        "correo": document.getElementById("correo").value,
        "rol": document.getElementById("rol").value
    };

    let camposValidos = validarCampos(formData);

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

function validarCampos(formData) {
    let camposRequeridos = [
        "tipo_documento",
        "numero_documento",
        "nombre_completo",
        "telefono",
        "correo",
        "rol"
    ];

    let camposValidos = true;

    // Validación de cada campo
    camposRequeridos.forEach(function(campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`);
        if (elemento.value.trim() === "") {
            errorElemento.textContent = `Este campo es obligatorio.`;
            errorElemento.classList.add('error-message');
            camposValidos = false;
        } else {
            errorElemento.textContent = "";
            errorElemento.classList.remove('error-message');
        }
    });

    // Validación adicional para número de documento
let numeroDocumento = document.getElementById("numero_documento").value.trim();
let numeroDocumentoValue = parseInt(numeroDocumento);

if (numeroDocumento === '') {
    // Mensaje si el campo está vacío
    document.getElementById("error-numero_documento").textContent = "El número de documento es obligatorio.";
    document.getElementById("error-numero_documento").classList.add('error-message');
    camposValidos = false;
} else if (numeroDocumentoValue < 100000) {
    // Mensaje si el número de documento es menor a 100000
    document.getElementById("error-numero_documento").textContent = "El número de documento debe tener al menos 5 dígitos.";
    document.getElementById("error-numero_documento").classList.add('error-message');
    camposValidos = false;
} else {
    // Limpia el mensaje de error si el número de documento es válido
    document.getElementById("error-numero_documento").textContent = "";
    document.getElementById("error-numero_documento").classList.remove('error-message');
}


    // Validación adicional para número de teléfono
    let telefono = document.getElementById("telefono").value.trim();
    if (telefono.length !== 10) {//3000000000    3999999999
        document.getElementById("error-telefono").textContent = "El número de teléfono debe tener exactamente 10 dígitos.";
        document.getElementById("error-telefono").classList.add('error-message');
        camposValidos = false;
    } else {
        document.getElementById("error-telefono").textContent = "";
        document.getElementById("error-telefono").classList.remove('error-message');
    }

    return camposValidos;
}
   // Validación de correo
   if (!correo.includes('@') || !correo.includes('.')) {
    document.getElementById('error-correo').textContent = 'El correo electrónico no es válido.';
    camposValidos = false;
}

function limpiarFormulario() {
    document.getElementById("crearCuentaForm").reset();
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
        el.classList.remove('error-message');
    });
}

// Validación en tiempo real
document.querySelectorAll('.form-control, .form-select').forEach(function(el) {
    el.addEventListener('input', function() {
        validarCampos({
            "tipo_documento": document.getElementById("tipo_documento").value,
            "numero_documento": document.getElementById("numero_documento").value,
            "nombre_completo": document.getElementById("nombre_completo").value,
            "telefono": document.getElementById("telefono").value,
            "correo": document.getElementById("correo").value,
            "rol": document.getElementById("rol").value
        });
    });
});
