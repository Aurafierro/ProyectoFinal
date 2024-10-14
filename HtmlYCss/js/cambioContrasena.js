// Función para cambiar la contraseña
async function cambiarContrasena() {
    const currentPassword = document.getElementById('antiguaContrasena').value;
    const newPassword = document.getElementById('nuevaContrasena').value;
    const confirmPassword = document.getElementById('confirmarContrasena').value;

    // Verifica que la nueva contraseña y la confirmación coincidan
    if (newPassword !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.',
        });
        return;
    }

    // Datos que se enviarán al backend
    const requestData = {
        antiguaContrasena: currentPassword,
        nuevaContrasena: newPassword,
        confirmarContrasena: confirmPassword
    };

    const token = localStorage.getItem('authTokens'); // Obtener el token del almacenamiento local

    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el token de autenticación.',
        });
        return;
    }

    try {
        // Realiza la solicitud al backend para cambiar la contraseña
        const response = await fetch(urlCambiarContraseña, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            },
            body: JSON.stringify(requestData)
        });

        const message = await response.text(); // Obtiene la respuesta en texto

        if (!response.ok) {
            throw new Error(message); // Lanza un error si la respuesta no es 2xx
        }

        // Si el cambio de contraseña fue exitoso
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Contraseña cambiada exitosamente. La sesión se cerrará.',
        }).then(() => {
            cerrarSesion(); // Llama a la función para cerrar sesión
        });

    } catch (error) {
        // Manejo de errores si la solicitud falla
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    console.log('Cerrando sesión...');
    localStorage.removeItem('authTokens'); // Eliminar el token del almacenamiento local
    Swal.fire({
        icon: 'warning',
        title: 'Sesión cerrada',
        text: 'Tu sesión ha sido cerrada. Redirigiendo al inicio de sesión.',
    }).then(() => {
        window.location.href = urlRedireccionInicioSesion; // Redirigir al login
    });
}

// Event listener para el botón de cambiar contraseña
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena(); // Llama a la función de cambiar contraseña
});
