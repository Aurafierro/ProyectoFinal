// Base URL para la API
var urlBase = "http://localhost:8888/api/v1/";

// Definición de URLs para la funcionalidad
var urlPreRegistros = urlBase + "pre-registros"; // URL para obtener los pre-registros
var urlAceptarRegistro = urlBase + "aprobar/"; // URL para aprobar el usuario

/* Redirecciones */
var urlRedireccion = "http://127.0.0.1:5502/";
var urlRedireccionInicioSesion = urlRedireccion + "HtmlYCss/indexHTML/inicioSesion.html";

// Función para mostrar la tabla de pre-registros
function tablaRegistro() {
    $.ajax({
        url: urlPreRegistros, // URL para obtener pre-registros
        type: "GET",
        success: function (result) {
            let cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = ""; // Limpiar la tabla antes de llenarla
            result.forEach(function (preRegistro) {
                let trRegistro = document.createElement("tr");

                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaRol = document.createElement("td");
                let celdaNombreCompleto = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaEstado = document.createElement("td");

                celdaTipoDocumento.innerText = preRegistro["tipo_documento"];
                celdaNumeroDocumento.innerText = preRegistro["numero_documento"];
                celdaRol.innerText = preRegistro["rol"];
                celdaNombreCompleto.innerText = preRegistro["nombre_completo"];
                celdaCorreo.innerText = preRegistro["username"];

                // Crear botones de acción para aceptar o rechazar
                let botonAceptar = document.createElement("button");
                botonAceptar.innerText = "Aceptar";
                botonAceptar.classList.add("btn", "btn-success", "mr-2");
                botonAceptar.onclick = function () {
                    actualizarEstado(preRegistro["id_user"], "cuenta_activa");
                };

                let botonRechazar = document.createElement("button");
                botonRechazar.innerText = "Rechazar";
                botonRechazar.classList.add("btn", "btn-danger");
                botonRechazar.onclick = function () {
                    actualizarEstado(preRegistro["id_user"], "cuenta_inactiva");
                };

                // Agregar botones a la celda de estado
                celdaEstado.appendChild(botonAceptar);
                celdaEstado.appendChild(botonRechazar);

                // Agregar celdas a la fila
                trRegistro.appendChild(celdaTipoDocumento);
                trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaRol);
                trRegistro.appendChild(celdaNombreCompleto);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaEstado);

                // Agregar la fila al cuerpo de la tabla
                cuerpoTabla.appendChild(trRegistro);
            });
        },
        error: function (error) {
            alert("Error en la petición: " + error.responseText);
        }
    });
}

// Función para actualizar el estado de los usuarios pre-registrados
function actualizarEstado(id_user, nuevoEstado) {
    $.ajax({
        url: `${urlAceptarRegistro}${id_user}`, // URL para actualizar el estado del usuario
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ estado_user: nuevoEstado }),
        success: function () {
            Swal.fire("¡Éxito!", "El estado se ha actualizado correctamente.", "success").then(() => {
                tablaRegistro(); // Actualizar la tabla después de aceptar o rechazar
            });
        },
        error: function (error) {
            Swal.fire("Error", "No se pudo actualizar el estado: " + error.responseText, "error");
        }
    });
}

// Función para cerrar sesión
function cerrarSesion() {
    // Limpiar el token y redirigir
    localStorage.removeItem('authTokens');

    // Limpiar el historial del navegador para evitar regresar a la página anterior
    window.history.replaceState(null, null, urlRedireccionInicioSesion);

    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
}

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem('authTokens');

    // Si no hay un token, redirige al inicio de sesión
    if (!authToken) {
        window.location.href = urlRedireccionInicioSesion;
    }

    // Evitar que el usuario vuelva a la página anterior después de cerrar sesión
    window.history.replaceState(null, null, window.location.href); // Reemplaza el estado actual con la URL actual
    window.onpopstate = function () {
        window.location.href = urlRedireccionInicioSesion; // Siempre redirige al inicio de sesión al retroceder
    };

    // Cargar los registros en la tabla
    tablaRegistro();
});
