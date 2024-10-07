// Evento para el botón de enviar el correo de recuperación de contraseña
document.querySelector('.btn.green').addEventListener('click', function(event) {
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
            text: 'Correo inválido o error al enviar la solicitud.'
        });
    });
});

// Evento para cambiar la contraseña
document.addEventListener('DOMContentLoaded', function () {
    async function changePassword(nuevaContrasena, confirmarContrasena) {
        if (nuevaContrasena !== confirmarContrasena) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.'
            });
            return;
        }
        const token = localStorage.getItem('authTokens');
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
            const response = await fetch(urlCambioContrasena, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Error al cambiar la contraseña: ' + (responseData.message || response.statusText));
            }
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: responseData.message
            });
            await redirectAfterPasswordChange(token);
            document.getElementById("modifyForm").reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        }
    }

    // Redirigir al módulo adecuado según el rol
    async function redirectAfterPasswordChange(token) {
        try {
            const response = await fetch(urlRol, { 
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Error al obtener el rol del usuario: ' + (data.message || response.statusText));
            }
            const userRole = data.role; 
            console.log('Rol del usuario:', userRole); 
            // Redirigir según el rol del usuario
            if (userRole === "Administrador") {
                window.location.href = urlRedireccionModuloAdmin;  
            } else if (userRole === "Usuario") {
                window.location.href = urlRedireccionModuloUsuario;  
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Rol no reconocido. Redirigiendo a la página principal.'
                });
                window.location.href = urlRedireccionInicioSesion;  
            }
        } catch (error) {
            console.error('Error al verificar el rol del usuario:', error);
            Swal.fire("Error", "Error al verificar el rol del usuario: " + error.message, "error");
        }
    }

    document.getElementById("modifyForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const nuevaContrasena = document.getElementById("nuevaContrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;
        await changePassword(nuevaContrasena, confirmarContrasena);
    });

    document.querySelector(".btn.red").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar la acción predeterminada
    });
});

// Mostrar/ocultar contraseña
document.getElementById('togglePassword1').addEventListener('click', function () {
    const passwordField = document.getElementById('nuevaContrasena');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('togglePassword2').addEventListener('click', function () {
    const passwordField = document.getElementById('confirmarContrasena');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
