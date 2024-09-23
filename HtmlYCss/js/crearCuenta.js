var url = "http://localhost:8080/api/v1/user/register/";

document.getElementById("numero_documento").addEventListener("keypress", soloNumeros);
document.getElementById("nombre_completo").addEventListener("keypress", soloLetras);
document.getElementById("telefono").addEventListener("keypress", soloNumeros);
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

function crearCuenta() {
    let formData = {
        "tipo_documento": document.getElementById("tipo_documento").value,
        "numero_documento": document.getElementById("numero_documento").value,
        "nombre_completo": document.getElementById("nombre_completo").value,
        "telefono": document.getElementById("telefono").value,
        "username": document.getElementById("username").value,
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
                  window.location.href = "http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html"; // Ruta correcta
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

    let telefono = document.getElementById("telefono").value.trim();
    if (telefono.length !== 10) {
        document.getElementById("error-telefono").textContent = "El número de teléfono debe tener exactamente 10 dígitos.";
        document.getElementById("error-telefono").classList.add('error-message');
        camposValidos = false;
    } else {
        document.getElementById("error-telefono").textContent = "";
        document.getElementById("error-telefono").classList.remove('error-message');
    }

    let username = document.getElementById("username").value.trim();
    if (!username.includes('@') || !username.includes('.')) {
        document.getElementById('error-username').textContent = 'El username electrónico no es válido.';
        camposValidos = false;
    } else {
        document.getElementById('error-username').textContent = '';
    }

    return camposValidos;
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
            "username": document.getElementById("username").value,
            "rol": document.getElementById("rol").value
        });
    });
});
