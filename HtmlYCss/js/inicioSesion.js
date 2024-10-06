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

async function login() {
    let formData = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
    let camposValidos = validarCampos(formData);
    if (camposValidos) {
        // Iniciar proceso de inicio de sesión
        $.ajax({
            url: urlInicioSesion, // URL del login
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

// Función para verificar el rol del usuario y si necesita cambiar la contraseña
// Función para verificar el rol del usuario y si necesita cambiar la contraseña
async function checkUserRole(token, nuevaContrasena = null, confirmarContrasena = null) {
    if (nuevaContrasena && confirmarContrasena && nuevaContrasena !== confirmarContrasena) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.'
        });
        return;
    }

    try {
        let response;
        if (nuevaContrasena && confirmarContrasena) {
            // Verificar el estado de la contraseña y enviarlo en la solicitud PUT
            response = await fetch(urlCambioContrasena, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nuevaContrasena, confirmarContrasena }) // Enviar las contraseñas en el cuerpo
            });
        } else {
            // Si no hay contraseñas, solo verificar el rol
            response = await fetch(urlBase + 'user/rol', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            Swal.fire("Error", errorData.message, "error");
            return;
        }

        const verificarData = await response.json();
        const verificarContrasena = verificarData.verificar_contrasena; // Obtener el estado de la contraseña

        // Obtener el rol del usuario
        const rolResponse = await fetch(urlBase + 'user/rol', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!rolResponse.ok) {
            const errorData = await rolResponse.json();
            Swal.fire("Error", "Error al verificar el rol del usuario: " + errorData.message, "error");
            return;
        }
        const rolData = await rolResponse.json();
        const userRole = rolData.role; // Obtener el rol del usuario
        // Redirigir al usuario según el estado de verificar_contrasena y su rol
        if (verificarContrasena === "0x01") {
            window.location.href = urlPaginaCambioContrasena;
        } else {
            if (userRole === "Administrador") {
                window.location.href = urlRedireccionModuloAdmin; // Cambia a la página del administrador
            } else if (userRole === "Usuario") {
                window.location.href = urlRedireccionModuloUsuario;
            }
        }

    } catch (error) {
        console.error('Error al verificar el rol o el estado de la contraseña:', error);
        Swal.fire("Error", "Error al verificar la información del usuario: " + error.message, "error");
    }
}
// Función para validar campos del formulario de login
function validarCampos(formData) {
    let camposRequeridos = [
        "username",
        "password"
    ];
    let camposValidos = true;
    camposRequeridos.forEach(function(campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`); // Ajusta el ID del elemento de error
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
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
function cerrarSesion() {
    // Eliminar el token de autenticación
    localStorage.removeItem('authTokens'); 
    
    // Limpiar el historial de navegación
    history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
    
    // Desactivar retroceso
    window.addEventListener('popstate', function (event) {
      history.pushState(null, null, urlRedireccionInicioSesion);
    });
    
    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
  }
  