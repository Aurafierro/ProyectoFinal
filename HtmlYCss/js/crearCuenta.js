

// Funciones de validación de caracteres
document.getElementById("numero_documento").addEventListener("keypress", soloNumeros);
document.getElementById("nombre_completo").addEventListener("keypress", soloLetras);
document.getElementById("username").addEventListener("keypress", letrasNumerosCaracteres);

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

function soloNumeros(event) {
    const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    if (!numeroPermitidos.includes(event.key)) {
        event.preventDefault();
    }
}
// Función para crear cuenta (registro)
function crearCuenta() {
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
                // El resultado debe contener un token, ya que la cuenta está activa
                const token = result.token; 
                if (token) {
                    // Guardar el token de autenticación en localStorage
                    localStorage.setItem('authToken', token);

                    Swal.fire({
                        title: "¡Registro exitoso!",
                        text: "Su cuenta se ha registrado correctamente.",
                        icon: "success"
                    }).then(() => {
                        // Redirigir al usuario según su rol
                        verificarRolUsuario(token);
                    });
                } else {
                    Swal.fire("Error", "Error al registrar, no se recibió un token de autenticación.", "error");
                }
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

// Función para verificar el rol del usuario y redirigir a la página correspondiente
function verificarRolUsuario(token) {
    $.ajax({
        url: urlRol, // URL para verificar el rol del usuario
        type: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function (rolResponse) {
            const userRole = rolResponse.role; // Asumiendo que la respuesta tiene un campo "role"
            if (userRole === "Administrador") {
                window.location.href = urlRedireccionModuloAdmin; // Redirige al módulo del administrador
            } else if (userRole === "Usuario") {
                window.location.href = urlRedireccionModuloUsuario; // Redirige al módulo del usuario
            } else {
                Swal.fire("Error", "No se pudo determinar el rol del usuario.", "error");
            }
        },
        error: function (error) {
            Swal.fire("Error", "Error al verificar el rol del usuario: " + error.responseText, "error");
        }
    });
}

// Función para limpiar el formulario después del registro exitoso
function limpiarFormulario() {
    document.getElementById("crearCuentaForm").reset();
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.textContent = '';
        el.classList.remove('error-message');
    });
}

// Alternar visibilidad de la contraseña
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Función de cerrar sesión
function cerrarSesion() {
    // Eliminar el token de autenticación
    localStorage.removeItem('authToken'); 

    // Limpiar el historial de navegación
    history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login

    // Desactivar retroceso
    window.addEventListener('popstate', function (event) {
      history.pushState(null, null, urlRedireccionInicioSesion);
    });

    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
}
