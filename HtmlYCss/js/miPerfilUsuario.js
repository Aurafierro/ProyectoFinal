const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarj');

// Function to toggle the visibility of the sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

// Wait for the content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch user data when the document is loaded
    obtenerDatosUsuario();
});

// Function to fetch user data
async function obtenerDatosUsuario() {
    const urlDatosUsuario = urlProfile; // URL for user profile API
    const token = localStorage.getItem('authTokens');

    if (!token) {
        console.error('Token no encontrado');
        return;
    }

    try {
        const respuesta = await fetch(urlDatosUsuario, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token, // Include auth token
                'Content-Type': 'application/json',
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al obtener los datos del usuario: ' + respuesta.statusText);
        }

        const datosUsuario = await respuesta.json();
        localStorage.setItem('userId', datosUsuario.id_user); // Save user ID in localStorage

        // Display the user data directly in the HTML elements
        document.getElementById('nombre_completo').textContent = datosUsuario.nombre_completo || 'No disponible';
        document.getElementById('correo').textContent = datosUsuario.username || 'No disponible';
        document.getElementById('tipo_documento').textContent = datosUsuario.tipo_documento || 'No disponible'; // Agregado
        document.getElementById('numero_documento').textContent = datosUsuario.numero_documento || 'No disponible'; // Agregado
        document.getElementById('rol').textContent = datosUsuario.rol || 'No disponible'; // Agregado
        document.getElementById('username').textContent = datosUsuario.nombre_completo || 'No disponible';

    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', error.message, 'error');
    }
}

function cerrarSesion() {
    // Eliminar el token de autenticación
    localStorage.removeItem('authTokens'); 
    
    // Limpiar el historial de navegación
    history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
    
    // Desactivar retroceso
    window.addEventListener('popstate', function (event) {
      history.pushState(null, null, urlRedireccionInicioSesion);
    });
    
    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
}
