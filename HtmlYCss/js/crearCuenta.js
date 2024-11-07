// Funciones de validación de caracteres
document.getElementById("numero_documento").addEventListener("keypress", soloNumeros);
document.getElementById("nombre_completo").addEventListener("keypress", soloLetras);
document.getElementById("username").addEventListener("keypress", letrasNumerosCaracteres);

// Función para solo permitir letras
function soloLetras(event) {
    const letrasPermitidas = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
        "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
    ];

    if (!letrasPermitidas.includes(event.key)) {
        event.preventDefault();
    }
}

// Función para permitir letras, números y caracteres especiales (como @, _, -, .)
function letrasNumerosCaracteres(event) {
    const letrasPermitidas = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
        "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
    ];
    const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const caracteresPermitidos = ['@', '_', '-', '.'];

    if (!(letrasPermitidas.includes(event.key)) && !(numeroPermitidos.includes(event.key)) && !(caracteresPermitidos.includes(event.key))) {
        event.preventDefault();
    }
}

// Función para solo permitir números
function soloNumeros(event) {
    const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    if (!numeroPermitidos.includes(event.key)) {
        event.preventDefault();
    }
}

// Función para mostrar u ocultar el loader
function mostrarLoader(activar) {
    const loader = document.querySelector('.loader');
    if (activar) {
        loader.style.display = 'flex';  // Muestra el loader
    } else {
        loader.style.display = 'none';  // Oculta el loader
    }
}

// Función para crear cuenta
function crearCuenta() {
    // Muestra el loader al iniciar la creación de la cuenta
    mostrarLoader(true);

    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "nombre_completo": document.getElementById("nombre_completo").value,
        "username": document.getElementById("username").value,
        "rol": document.getElementById("rol").value
    };

    let camposValidos = validarCampos(formData);

    if (camposValidos) {
        $.ajax({
            url: urlRegister, // Usar la URL global de registro
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                const token = result.token; // Ajusta según la respuesta de tu API
                let tokens = JSON.parse(localStorage.getItem('authTokens')) || [];
                tokens.push(token);
                localStorage.setItem('authTokens', JSON.stringify(tokens)); // Almacena todos los tokens

                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                }).then(() => {
                    // Redirige al usuario al inicio de sesión después de que se cierre la alerta
                    window.location.href = urlRedireccionInicioSesion;
                });

                limpiarFormulario();
                // Ocultamos el loader después de la respuesta exitosa
                mostrarLoader(false);
            },
            error: function (error) {
                Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
                // Ocultamos el loader en caso de error
                mostrarLoader(false);
            },
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
        // Ocultamos el loader si hay error en la validación de campos
        mostrarLoader(false);
    }
}

// Función para validar los campos
function validarCampos(formData) {
    let camposRequeridos = [
        "tipo_documento",
        "numero_documento",
        "nombre_completo",
        "username",
        "rol"
    ];

    let camposValidos = true;

    camposRequeridos.forEach(function(campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`);

        if (elemento.value.trim() === "") {
            errorElemento.textContent = "Este campo es obligatorio.";
            errorElemento.classList.add('error-message');
            camposValidos = false;
        }
    });

    let numeroDocumento = document.getElementById("numero_documento").value.trim();
    let numeroDocumentoValue = parseInt(numeroDocumento);

    if (numeroDocumento === '') {
        document.getElementById("error-numero_documento").textContent = "El número de documento es obligatorio.";
        document.getElementById("error-numero_documento").classList.add('error-message');
        camposValidos = false;
    } else if (numeroDocumentoValue < 100000) {
        document.getElementById("error-numero_documento").textContent = "El número de documento debe tener al menos 5 dígitos.";
        document.getElementById("error-numero_documento").classList.add('error-message');
        camposValidos = false;
    } else {
        document.getElementById("error-numero_documento").textContent = "";
        document.getElementById("error-numero_documento").classList.remove('error-message');
    }

    let username = document.getElementById("username").value.trim();
    if (!username.includes('@') || !username.includes('.')) {
        document.getElementById('error-username').textContent = 'El username no es válido.';
        camposValidos = false;
    } else {
        document.getElementById('error-username').textContent = '';
    }

    return camposValidos;
}

// Función para limpiar el formulario
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
            "username": document.getElementById("username").value,
            "rol": document.getElementById("rol").value
        });
    });
});

// Función para cerrar sesión
function cerrarSesion() {
    Swal.fire({
        title: "Cerrar sesión",
        text: "¿Estás seguro de que deseas cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
          // Eliminar el token de autenticación
          localStorage.removeItem('authTokens');
          
          // Manejar el retroceso del navegador
          history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
  
          // Desactivar retroceso en el navegador
          window.addEventListener('popstate', function (event) {
              history.pushState(null, null, urlRedireccionInicioSesion); // Desactiva el retroceso
          });
  
          // Redirigir al inicio de sesión
          window.location.href = urlRedireccionInicioSesion;
        }
    });
}
