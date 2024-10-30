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
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
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

// Mostrar tabla de registros
document.addEventListener("DOMContentLoaded", function() {
    tablaRegistro();
});

