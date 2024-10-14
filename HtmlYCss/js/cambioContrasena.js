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

        const message = await response.text(); 

        if (!response.ok) {
            throw new Error(message); // Lanza un error si la respuesta no es 2xx
        }

        // Mostrar mensaje de éxito y cerrar sesión
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Contraseña cambiada exitosamente. La sesión se cerrará.',
        }).then(() => {
            cerrarSesion(); // Llama a la función para cerrar sesión
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
    console.log('Cerrando sesión...');
    localStorage.removeItem('authTokens'); // Eliminar el token
    alert('Tu cuenta ha sido desactivada, redirigiendo al inicio de sesión.'); // Mostrar alerta opcional
    window.location.href = urlRedireccionInicioSesion; // Redirigir al login
}


// Event listener para el botón de cambiar contraseña
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena();
});
