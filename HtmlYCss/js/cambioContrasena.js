async function cambiarContrasena() {
    const currentPassword = document.getElementById('antiguaContrasena').value;
    const newPassword = document.getElementById('nuevaContrasena').value;
    const confirmPassword = document.getElementById('confirmarContrasena').value;

    const requestData = {
        antiguaContrasena: currentPassword,
        nuevaContrasena: newPassword,
        confirmarContrasena: confirmPassword
    };

    const token = localStorage.getItem('authTokens'); 

    try {
        const response = await fetch(urlCambiarContraseña, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        // Si la respuesta es correcta, mostrar el mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada',
            text: 'Tu contraseña ha sido cambiada exitosamente.'
        }).then(() => {
            // Después de mostrar el mensaje de éxito, cerrar sesión y redirigir
            cerrarSesion();
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    }
}

// Event listener para el botón de cambiar contraseña
document.querySelector('.button-contrasena').addEventListener('click', (event) => {
    event.preventDefault();
    cambiarContrasena();
});

// Función para cerrar sesión y redirigir al inicio de sesión
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
