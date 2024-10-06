document.getElementById('btnEnviar').addEventListener('click', function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de forma predeterminada

    const email = document.getElementById('emailInput').value;  // Capturar el valor del input de email

    // Validar que el campo de correo no esté vacío
    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, introduce tu correo electrónico.'
        });
        return;
    }

    // URL del endpoint de recuperar contraseña
    var urlRecuperarContrasena = urlBase + "user/recuperar-contrasena";

    // Realizar la solicitud POST al backend
    fetch(urlRecuperarContrasena, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email  // Enviar el email capturado como 'username'
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();  // Convertir la respuesta a JSON si la solicitud fue exitosa
        } else {
            throw new Error('Error al enviar la solicitud');
        }
    })
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: data.message || 'Se ha enviado un enlace para recuperar la contraseña'
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo inválido.'
        });
    });
});

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
  