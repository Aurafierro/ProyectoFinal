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
        const response = await fetch('http://localhost:8080/api/v1/user/cambio-contrasena', {
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

        // Mostrar el mensaje recibido como texto
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message, // Muestra el mensaje de éxito
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message, // Muestra el mensaje de error
        });
    }
}

// Añade un evento al botón de enviar
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena();
});
