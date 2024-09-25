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

        const token = localStorage.getItem('authTokens'); // Asegúrate de que solo almacenes un token en el login
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
            const response = await fetch('http://localhost:8080/api/v1/user/cambiar-contrasena', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Usando el token del login
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Error al cambiar la contraseña: ' + (errorData.message || response.statusText));
            }

            const successData = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: successData // Asegúrate de que el servidor devuelva un mensaje claro
            });
            document.getElementById("modifyForm").reset(); // Reiniciar el formulario
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        }
    }

    // Evento de envío del formulario de cambio de contraseña
    document.getElementById("modifyForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const nuevaContrasena = document.getElementById("nuevaContrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;
        await changePassword(nuevaContrasena, confirmarContrasena);
    });

    // Evento para manejar el clic en un botón específico (ejemplo)
    document.querySelector(".btn.red").addEventListener("click", function (event) {
        event.preventDefault();
    });
});

