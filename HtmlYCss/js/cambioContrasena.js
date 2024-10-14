async function cambiarContrasena() {
    const currentPassword = document.getElementById('antiguaContrasena').value;
    const newPassword = document.getElementById('nuevaContrasena').value;
    const confirmPassword = document.getElementById('confirmarContrasena').value;

    const requestData = {
        antiguaContrasena: currentPassword,
        nuevaContrasena: newPassword,
        confirmarContrasena: confirmPassword
    };

    const token = localStorage.getItem('authTokens'); // Asegúrate de que el token se guarda en el almacenamiento local

    try {
        const response = await fetch(urlCambiarContraseña, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
            },
            body: JSON.stringify(requestData)
        });

        // Obtener la respuesta como texto
        const message = await response.text(); 

        if (!response.ok) {
            throw new Error(message); // Lanza un error si la respuesta no es 2xx
        }

        // Mostrar el mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message, // Muestra el mensaje de éxito
        }).then(() => {
            cerrarSesion(); // Cerrar sesión automáticamente después de cambiar la contraseña
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message, 
        });
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('authTokens'); // Eliminar el token de autenticación
    window.location.href = urlRedireccionInicioSesion; // Redirigir a la página de inicio de sesión
}

// Agregar el event listener para el botón de cambiar contraseña
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena();
});
