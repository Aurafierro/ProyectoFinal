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
            const response = await fetch('http://10.192.94.153:8080/api/v1/user/cambiar-contrasena', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Aquí se corrigió
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

            // Verificar el rol del usuario para redirigir
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
            const response = await fetch('http://10.192.94.153:8080/api/v1/user/rol', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Aquí se corrigió
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Error al obtener el rol del usuario: ' + (data.message || response.statusText));
            }

            const userRole = data.role; // Obtener el rol del usuario
            console.log('Rol del usuario:', userRole); // Para depuración

            // Redirigir según el rol del usuario
            if (userRole === "Administrador") {
                window.location.href = 'http://10.192.94.153:5500/HtmlYCss/indexHTML/M.informacionAdmin.html';
            } else if (userRole === "Usuario") {
                window.location.href = 'http://10.192.94.153:5500/HtmlYCss/indexHTML/ModuloInformacion.html';
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Rol no reconocido. Redirigiendo a la página principal.'
                });
                window.location.href = 'http://10.192.94.153:5500/HtmlYCss/indexHTML/InicioSesion.html'; // Ajusta la URL según sea necesario
            }

        } catch (error) {
            console.error('Error al verificar el rol del usuario:', error);
            Swal.fire("Error", "Error al verificar el rol del usuario: " + error.message, "error");
        }
    }

    // Evento de envío del formulario de cambio de contraseña
    document.getElementById("modifyForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const nuevaContrasena = document.getElementById("nuevaContrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;
        await changePassword(nuevaContrasena, confirmarContrasena);
    });

    // Evento para manejar el clic en el botón de volver
    document.querySelector(".btn.red").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar la acción predeterminada
       
    });
});
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
