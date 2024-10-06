async function checkUserStatus(token) {
    try {
        const response = await fetch(urlBase + 'user/verificar-estado', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            Swal.fire("Error", errorData.message, "error");
            return null; // Retornar null si hay un error
        }

        const data = await response.json();
        const estado = data.estado; // Obtener el estado

        return estado === "Activo" ? 1 : 0; // Retornar 1 para "Activo" y 0 para "Inactivo"

    } catch (error) {
        console.error('Error al verificar el estado del usuario:', error);
        Swal.fire("Error", "Error al verificar el estado del usuario: " + error.message, "error");
        return null; // Retornar null en caso de error
    }
}
// Función para iniciar sesión
async function login() {
    let formData = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
    let camposValidos = validarCampos(formData);
    if (camposValidos) {
        // Iniciar proceso de inicio de sesión
        $.ajax({
            url: urlBase + 'public/user/login/', // URL del login
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: async function (result) {
                const token = result.token; // Ajusta según tu respuesta de API
                // Eliminar el token anterior si existe
                localStorage.removeItem('authTokens');
                // Almacenar el nuevo token directamente
                localStorage.setItem('authTokens', token);

                // Verificar el estado del usuario
                const estado = await checkUserStatus(token);
                if (estado === null) return; // Salir si hay un error

                if (estado === 0) {
                    Swal.fire("Acceso Denegado", "Tu cuenta está inactiva.", "error");
                    return; // Detener si el usuario está inactivo
                }

                // Continuar con el inicio de sesión exitoso
                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Inicio de sesión exitoso.",
                    icon: "success"
                }).then(() => {
                    checkUserRole(token); // Verificar el rol después del login
                });
            },
            error: function (error) {
                Swal.fire("Error", "Credenciales incorrectas. Inténtalo de nuevo.", "error");
            },
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, complete todos los campos correctamente.",
            icon: "error"
        });
    }
}

// Función para verificar el estado del usuario
async function checkUserStatus(token) {
    try {
        const response = await fetch(urlBase + 'user/verificar-estado', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            Swal.fire("Error", errorData.message, "error");
            return null; // Retornar null si hay un error
        }

        const data = await response.json();
        const estado = data.estado; // Obtener el estado

        return estado === "Activo" ? 1 : 0; // Retornar 1 para "Activo" y 0 para "Inactivo"

    } catch (error) {
        console.error('Error al verificar el estado del usuario:', error);
        Swal.fire("Error", "Error al verificar el estado del usuario: " + error.message, "error");
        return null; // Retornar null en caso de error
    }
}

// Función para cambiar la contraseña
async function changePassword(nuevaContrasena, confirmarContrasena) {
    if (nuevaContrasena !== confirmarContrasena) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.'
        });
        return;
    }
    const token = localStorage.getItem('authTokens');
    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró un token de sesión.'
        });
        return;
    }
    const body = { nuevaContrasena, confirmarContrasena };
    try {
        const response = await fetch(urlCambioContrasena, { // Cambiado a urlCambioContrasena
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña: ' + (responseData.message || response.statusText));
        }
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: responseData.message
        });
        await redirectAfterPasswordChange(token);
        document.getElementById("modifyForm").reset();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    }
}

// Función para redirigir según el rol del usuario
async function redirectAfterPasswordChange(token) {
    try {
        const response = await fetch(urlRol, { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error al obtener el rol del usuario: ' + (data.message || response.statusText));
        }
        const userRole = data.role; // Obtener el rol del usuario
        const verificarContrasena = data.verificar_contrasena; // Asegúrate de que el backend envíe este campo

        // Redirigir según el rol del usuario y si necesita cambiar la contraseña
        if (verificarContrasena) {
            window.location.href = urlPaginaCambioContrasena;
        } else if (userRole === "Administrador") {
            window.location.href = urlRedireccionModuloAdmin;
        } else if (userRole === "Usuario") {
            window.location.href = urlRedireccionModuloUsuario;
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Rol no reconocido. Redirigiendo a la página principal.'
            });
            window.location.href = urlRedireccionInicioSesion;
        }
    } catch (error) {
        console.error('Error al verificar el rol del usuario:', error);
        Swal.fire("Error", "Error al verificar el rol del usuario: " + error.message, "error");
    }
}

// Función para validar campos del formulario de login
function validarCampos(formData) {
    let camposRequeridos = ["username", "password"];
    let camposValidos = true;

    camposRequeridos.forEach(function (campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`);
        if (elemento.value.trim() === "") {
            errorElemento.textContent = "Este campo es obligatorio.";
            errorElemento.classList.add('error-message');
            camposValidos = false;
        } else {
            errorElemento.textContent = "";
            errorElemento.classList.remove('error-message');
        }
    });
    return camposValidos;
}

// Alternar visibilidad de la contraseña
document.getElementById('togglePassword1').addEventListener('click', function () {
    const passwordField = document.getElementById('nuevaContrasena');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('togglePassword2').addEventListener('click', function () {
    const passwordField = document.getElementById('confirmarContrasena');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('authTokens');
    history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login

    // Desactivar retroceso
    window.addEventListener('popstate', function (event) {
        history.pushState(null, null, urlRedireccionInicioSesion);
    });

    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
}

// Evento al enviar el formulario de cambio de contraseña
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("modifyForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const nuevaContrasena = document.getElementById("nuevaContrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;
        await changePassword(nuevaContrasena, confirmarContrasena);
    });

    // Evitar la acción predeterminada en el botón
    document.querySelector(".btn.red").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar la acción predeterminada
    });
});