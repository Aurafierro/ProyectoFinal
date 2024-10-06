
// Función de inicio de sesión
function login() {
    let formData = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
    let camposValidos = validarCampos(formData);
    if (camposValidos) {
        $.ajax({
            url: urlInicioSesion, // URL del login
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                const token = result.token; // Ajusta según tu respuesta de API
                // Eliminar el token anterior si existe
                localStorage.removeItem('authTokens');
                // Almacenar el nuevo token directamente
                localStorage.setItem('authTokens', token);
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
async function checkUserRole(token) {
    try {
        // Verificar el estado de la contraseña
        const verificarResponse = await fetch(urlBase + 'user/verificar-contrasena', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!verificarResponse.ok) {
            const errorData = await verificarResponse.json();
            Swal.fire("Error", errorData.message, "error");
            return;
        }

        const verificarData = await verificarResponse.json();
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
        if (verificarContrasena) {
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
  