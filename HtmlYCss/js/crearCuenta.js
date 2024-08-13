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
    if (numeroDocumento.length < 5) {
        document.getElementById("error-numero_documento").textContent = "El número de documento debe tener al menos 5 dígitos.";
        document.getElementById("error-numero_documento").classList.add('error-message');
        camposValidos = false;
    } else {
        document.getElementById("error-numero_documento").textContent = "";
        document.getElementById("error-numero_documento").classList.remove('error-message');
    }

    // Validación adicional para número de teléfono
    let telefono = document.getElementById("telefono").value.trim();
    if (telefono.length !== 10) {
        document.getElementById("error-telefono").textContent = "El número de teléfono debe tener exactamente 10 dígitos.";
        document.getElementById("error-telefono").classList.add('error-message');
        camposValidos = false;
    } else {
        document.getElementById("error-telefono").textContent = "";
        document.getElementById("error-telefono").classList.remove('error-message');
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
            "correo": document.getElementById("correo").value,
            "rol": document.getElementById("rol").value
        });
    });
});
