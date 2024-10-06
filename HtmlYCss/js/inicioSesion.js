// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
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

    // Evento al enviar el formulario de cambio de contraseña
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