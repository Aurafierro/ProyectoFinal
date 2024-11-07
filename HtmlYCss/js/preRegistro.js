// Funciones de validación de caracteres
const letrasPermitidas = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
const letrasNumerosCaracteresPermitidos = /^[\wñÑáéíóúÁÉÍÓÚ@_.\-\s]+$/;
const numerosPermitidos = /^[0-9]+$/;

document.getElementById("numero_documento").addEventListener("keypress", (event) => {
    if (!numerosPermitidos.test(event.key)) {
        event.preventDefault();
    }
});

document.getElementById("nombre_completo").addEventListener("keypress", (event) => {
    if (!letrasPermitidas.test(event.key)) {
        event.preventDefault();
    }
});

document.getElementById("username").addEventListener("keypress", (event) => {
    if (!letrasNumerosCaracteresPermitidos.test(event.key)) {
        event.preventDefault();
    }
});

// Función para crear el pre_registro
function Registro() {
    // Primero, valida los campos antes de proceder
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "nombre_completo": document.getElementById("nombre_completo").value,
        "username": document.getElementById("username").value,
        "rol": document.getElementById("rol").value
    };

    let camposValidos = validarCampos(formData);

    // Si los campos no son válidos, detengo el flujo y oculto el loader si estaba visible
    if (!camposValidos) {
        mostrarLoader(false);  // Oculto el loader si la validación falla
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
        return; // Detener el flujo si los campos no son válidos
    }

    // Si los campos son válidos, muestra el loader
    mostrarLoader(true);

    // Realizar la solicitud AJAX solo si los campos son válidos
    $.ajax({
        url: urlPreRegistros, // Usar la URL global de registro
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Su pre-registro se ha guardado correctamente y está pendiente de aprobación.",
                icon: "success"
            }).then(() => {
                // Redirige al usuario al inicio de sesión después de que se cierre la alerta
                window.location.href = urlRedireccionInicioSesion;
            });

            limpiarFormulario();
        },
        error: function (error) {
            Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
        },
        complete: function () {
            // Ocultar el loader después de completar la solicitud (si fue exitosa o no)
            mostrarLoader(false);
        }
    });
}

// Función para mostrar u ocultar el loader
function mostrarLoader(activar) {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
    const loadIcon = document.querySelector('.load');

    if (activar) {
        loader.style.display = 'flex';  // Mostrar loader
        loaderText.style.display = 'inline';  // Mostrar texto "loading"
        loadIcon.classList.add('spin');  // Añadir clase para animar el ícono (asegúrate de tener la animación CSS)
        loader.style.zIndex = 9999;  // Aseguramos que el loader esté al frente
    } else {
        loader.style.display = 'none';  // Ocultar loader
        loaderText.style.display = 'none';  // Ocultar texto "loading"
        loadIcon.classList.remove('spin');  // Quitar la animación
        loader.style.zIndex = -1;  // Restauramos el z-index cuando el loader está oculto
    }
}

// Validación de campos
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
            errorElemento.textContent = `Este campo es obligatorio.`;
            errorElemento.classList.add('error-message');
            camposValidos = false;
        } else {
            errorElemento.textContent = "";
            errorElemento.classList.remove('error-message');
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

// Mostrar loader al hacer clic en el botón "Volver" o "Registrarse"
document.querySelectorAll('.volver-btn, .crear-cuenta-btn').forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Si el formulario es válido, se muestra el loader
        let formData = {
            "tipo_documento": document.getElementById("tipo_documento").value,
            "numero_documento": document.getElementById("numero_documento").value,
            "nombre_completo": document.getElementById("nombre_completo").value,
            "username": document.getElementById("username").value,
            "rol": document.getElementById("rol").value
        };
        let camposValidos = validarCampos(formData);
        if (camposValidos) {
            mostrarLoader(true);
        }
    });
});
