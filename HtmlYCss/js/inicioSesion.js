var url = "http://localhost:8080/api/v1/public/user/login/"; // Actualiza con tu endpoint de inicio de sesión

function login() {
    let formData = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };

    let camposValidos = validarCampos(formData);

    if (camposValidos) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                const token = result.token; // Ajusta según tu respuesta de API
                
                // Eliminar el token anterior si existe
                localStorage.removeItem('authTokens');
                
                // Almacenar el nuevo token directamente
                localStorage.setItem('authTokens', token);

                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Inicio de sesión exitoso.",
                    icon: "success"
                }).then(() => {
                    checkUserRole(token);
                });
            },
            error: function (error) {
                Swal.fire("Error", "Credenciales incorrectas. Inténtalo de nuevo.", "error");
            },
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, complete todos los campos correctamente.",
            icon: "error"
        });
    }
}

async function checkUserRole(token) {
    try {
        const response = await fetch('http://localhost:8080/api/v1/user/rol', { // Cambia a tu endpoint de rol
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error en la respuesta del servidor:', data);
            Swal.fire("Error", "Error al verificar el rol del usuario: " + data.message, "error");
            return;
        }

        const userRole = data.role; // Obtener el rol del usuario
        const verificarContrasena = data.verificar_contrasena; // Obtener el estado de verificar_contrasena

        const isVerificarContrasena = (verificarContrasena === true || verificarContrasena === 1);

        // Redirigir al usuario a la página de cambio de contraseña si es necesario
        if (isVerificarContrasena) {
            window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/ContrasenaCambiar.html';
        } else {
            // Redirigir según el rol del usuario
            if (userRole === "Administrador") {
                window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/ContrasenaCambiar.html';
            } else if (userRole === "Usuario") {
                window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/ModuloInformacion.html';
            }
        }

    } catch (error) {
        console.error('Error al verificar el rol del usuario:', error);
        Swal.fire("Error", "Error al verificar el rol del usuario: " + error.message, "error");
    }
}


function validarCampos(formData) {
    let camposRequeridos = [
        "username",
        "password"
    ];

    let camposValidos = true;

    camposRequeridos.forEach(function(campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`); // Ajusta el ID del elemento de error
        if (elemento.value.trim() === "") {
            errorElemento.textContent = "Este campo es obligatorio.";
            errorElemento.classList.add('error-message');
            camposValidos = false;
        } else {
            errorElemento.textContent = "";
            errorElemento.classList.remove('error-message');
        }
    });

    return camposValidos;
}

// Alternar visibilidad de la contraseña
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
