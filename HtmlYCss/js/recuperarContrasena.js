// Asegurarse de que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener('DOMContentLoaded', function () {
    
    // Botón para enviar el correo de recuperación de contraseña
    const greenButton = document.querySelector('.btn.green');
    if (greenButton) {
        greenButton.addEventListener('click', function (event) {
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
    }

    // Botón para cancelar la operación de modificación de contraseña
    const redButton = document.querySelector(".btn.red");
    if (redButton) {
        redButton.addEventListener("click", function (event) {
            event.preventDefault(); // Evitar la acción predeterminada
        });
    }

    // Función para cambiar la contraseña
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

    // Evento para el formulario de modificación de contraseña
    const modifyForm = document.getElementById("modifyForm");
    if (modifyForm) {
        modifyForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const nuevaContrasena = document.getElementById("nuevaContrasena").value;
            const confirmarContrasena = document.getElementById("confirmarContrasena").value;
            await changePassword(nuevaContrasena, confirmarContrasena);
        });
    }

    // Mostrar/ocultar contraseña nueva
    const togglePassword1 = document.getElementById('togglePassword1');
    if (togglePassword1) {
        togglePassword1.addEventListener('click', function () {
            const passwordField = document.getElementById('nuevaContrasena');
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Mostrar/ocultar confirmación de contraseña
    const togglePassword2 = document.getElementById('togglePassword2');
    if (togglePassword2) {
        togglePassword2.addEventListener('click', function () {
            const passwordField = document.getElementById('confirmarContrasena');
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
});
