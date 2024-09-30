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
        const response = await fetch('http://10.192.92.90:8080/api/v1/user/cambio-contrasena', {
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
    localStorage.removeItem('authTokens'); 
    window.location.href = 'http://10.192.92.90:5500/HtmlYCss/indexHTML/InicioSesion.html';
}
function togglePasswordVisibility(inputId, icon) {
    const passwordField = document.getElementById(inputId);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    icon.classList.toggle('fa-eye-slash'); // Toggle the eye slash icon
}

// Add event listeners for the eye icons
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const inputId = this.getAttribute('data-input');
        togglePasswordVisibility(inputId, this);
    });
});