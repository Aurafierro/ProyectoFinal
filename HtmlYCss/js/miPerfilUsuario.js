const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarj');

// Función para alternar la visibilidad de la barra lateral
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

// Esperar a que el contenido esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtener los datos del usuario cuando el documento esté cargado
    obtenerDatosUsuario();
});

// Función para obtener los datos del usuario
async function obtenerDatosUsuario() {
    const urlDatosUsuario = urlProfile; // URL de la API de perfil del usuario
    const token = localStorage.getItem('authTokens');

    if (!token) {
        console.error('Token no encontrado');
        return;
    }

    try {
        const respuesta = await fetch(urlDatosUsuario, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token, // Incluir el token de autenticación
                'Content-Type': 'application/json',
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al obtener los datos del usuario: ' + respuesta.statusText);
        }

        const datosUsuario = await respuesta.json();
        localStorage.setItem('userId', datosUsuario.id_user); // Guardar el ID del usuario en localStorage

        // Mostrar los datos del usuario directamente en los elementos HTML
        document.getElementById('nombre_completo').textContent = datosUsuario.nombre_completo || 'No disponible';
        document.getElementById('correo').textContent = datosUsuario.username || 'No disponible';
        document.getElementById('tipo_documento').textContent = datosUsuario.tipo_documento || 'No disponible';
        document.getElementById('numero_documento').textContent = datosUsuario.numero_documento || 'No disponible';
        document.getElementById('rol').textContent = datosUsuario.rol || 'No disponible';

    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', error.message, 'error');
    }
}

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
  
