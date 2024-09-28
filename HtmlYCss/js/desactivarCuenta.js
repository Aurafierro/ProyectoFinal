document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('authTokens');

    // Función para obtener datos del usuario
    async function obtenerDatosUsuario(token) {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron obtener los datos del usuario.'
            });
        }
    }

    // Función para desactivar el usuario
    async function desactivarUsuario() {
        const token = localStorage.getItem('authTokens');

        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Sin sesión',
                text: 'No hay sesión activa. Por favor, inicia sesión.'
            });
            return;
        }

        // Obtener el ID del usuario
        const datosUsuario = await obtenerDatosUsuario(token);
        const id_user = datosUsuario.id_user; // Asegúrate de que el id_user esté correctamente definido

        // URL del endpoint para desactivar el usuario
        const url = `http://localhost:8080/api/v1/user/desactivar/${id_user}`;

        // Realizar la solicitud fetch con el token
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta desactivada',
                    text: `Estado: ${data.estado}` // Asegúrate de que "estado" está en la respuesta
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `No se pudo desactivar la cuenta: ${errorData.error}` // Asegúrate de que "error" está en la respuesta
                });
            }
        } catch (error) {
            console.error('Error al desactivar el usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al procesar la solicitud'
            });
        }
    }

    // Evento que llama la función al hacer clic en el botón
    document.querySelector('.desactivarCuenta').addEventListener('click', desactivarUsuario);
});
