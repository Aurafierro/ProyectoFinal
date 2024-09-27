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

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const result = await response.json();
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: result,
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    }
}

// Añade un evento al botón de enviar
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena();
});
