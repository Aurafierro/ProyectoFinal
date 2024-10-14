document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authTokens');
    console.log("Token de autenticación:", token);

    // Event listener para el botón de cambiar contraseña
    document.querySelector('.button-contrasena').addEventListener('click', (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        cambiarContrasena();
    });

    // Función para cambiar la contraseña
    async function cambiarContrasena() {
        const currentPassword = document.getElementById('antiguaContrasena').value;
        const newPassword = document.getElementById('nuevaContrasena').value;
        const confirmPassword = document.getElementById('confirmarContrasena').value;

        // Estructura de datos a enviar al servidor
        const requestData = {
            antiguaContrasena: currentPassword,
            nuevaContrasena: newPassword,
            confirmarContrasena: confirmPassword
        };

        // Verifica si el token está disponible
        if (!token) {
            console.error('Error: No se encontró un token de autenticación.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se ha encontrado un token de autenticación. Inicia sesión de nuevo.'
            });
            return;
        }

        try {
            // Realiza la solicitud PUT para cambiar la contraseña
            console.log('Enviando solicitud para cambiar la contraseña...');
            const response = await fetch(urlCambiarContraseña, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            // Obtén la respuesta como texto
            const message = await response.text();

            if (!response.ok) {
                throw new Error(message);
            }

            // Mostrar mensaje de éxito por unos segundos y luego cerrar sesión
            console.log('Contraseña cambiada exitosamente. Cerrando sesión...');
            Swal.fire({
                icon: 'success',
                title: 'Contraseña cambiada',
                text: message,
                timer: 2000, // Mostrar el mensaje durante 2 segundos
                showConfirmButton: false
            }).then(() => {
                cerrarSesion();
            });

        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        }
    }

    // Función para cerrar sesión y redirigir al inicio de sesión
    function cerrarSesion() {
        console.log('Cerrando sesión y eliminando token...');
        localStorage.removeItem('authTokens'); 

        // Verificar si el token fue eliminado correctamente
        if (!localStorage.getItem('authTokens')) {
            console.log('Token eliminado exitosamente. Redirigiendo...');
            window.location.href = urlRedireccionInicioSesion;
        } else {
            console.error('Error: El token no pudo ser eliminado.');
        }
    }

    // Función para alternar la visibilidad de la contraseña
    function togglePasswordVisibility(inputId, icon) {
        const passwordField = document.getElementById(inputId);
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        icon.classList.toggle('fa-eye-slash'); // Toggle the eye slash icon
    }

    // Añadir event listeners para los íconos de visibilidad de la contraseña
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function () {
            const inputId = this.getAttribute('data-input');
            togglePasswordVisibility(inputId, this);
        });
    });
});
