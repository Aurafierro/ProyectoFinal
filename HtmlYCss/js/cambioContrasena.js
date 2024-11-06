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

        // Mostrar el mensaje recibido como texto
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message, // Muestra el mensaje de éxito
        });
        cerrarSesion();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message, 
        });
    }
}
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena();
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
  

// Add event listeners for the eye icons
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const inputId = this.getAttribute('data-input');
        togglePasswordVisibility(inputId, this);
    });
});