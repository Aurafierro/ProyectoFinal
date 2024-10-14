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

        // Cerrar sesión inmediatamente después de cambiar la contraseña exitosamente
        cerrarSesion();

    } catch (error) {
        // Manejo de errores si la solicitud falla
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message, 
        });
    }
}

// Event listener para el botón de cambiar contraseña
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    cambiarContrasena();
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('authTokens'); 
    window.location.href = urlRedireccionInicioSesion;  
}

// Función para alternar la visibilidad de la contraseña
function togglePasswordVisibility(inputId, icon) {
    const passwordField = document.getElementById(inputId);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    icon.classList.toggle('fa-eye-slash'); // Toggle the eye slash icon
}

// Añadir event listeners para los íconos de visibilidad de la contraseña
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const inputId = this.getAttribute('data-input');
        togglePasswordVisibility(inputId, this);
    });
}); 
