document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authTokens');

    // Función para obtener datos del usuario
    async function obtenerDatosUsuario(token) {
        try {
            const response = await fetch(urlProfile, {
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

        // Obtener el ID del usuario y su estado
        const datosUsuario = await obtenerDatosUsuario(token);
        const id_user = datosUsuario.id_user;

        // Verificar estado del usuario
        const estado = datosUsuario.estado; // Asegúrate de que el estado se obtiene correctamente

        if (estado === 'Inactivo' || estado === false || estado === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Cuenta inactiva',
                text: 'No se puede desactivar una cuenta que ya está inactiva.'
            });
            return;
        }

        // URL del endpoint para desactivar el usuario
        const url = `${urlDesactivarCuenta}${id_user}`;

        // Realizar la solicitud fetch con el token
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta desactivada',
                    text: `Estado: ${data.estado}`
                }).then(() => {
                    // Después de desactivar la cuenta, eliminar el token y redirigir al inicio de sesión
                    cerrarSesion();
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `No se pudo desactivar la cuenta: ${errorData.error}`
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

    document.querySelector('.desactivarCuenta').addEventListener('click', desactivarUsuario);
});
function cerrarSesion() {
    Swal.fire({
        title: "Cerrar sesión",
        text: "¿Estás seguro de que deseas cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
          // Eliminar el token de autenticación
          localStorage.removeItem('authTokens');
          
          // Manejar el retroceso del navegador
          history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
  
          // Desactivar retroceso en el navegador
          window.addEventListener('popstate', function (event) {
              history.pushState(null, null, urlRedireccionInicioSesion); // Desactiva el retroceso
          });
  
          // Redirigir al inicio de sesión
          window.location.href = urlRedireccionInicioSesion;
        }
    });
  }
  