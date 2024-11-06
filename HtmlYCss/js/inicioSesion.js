// Función de inicio de sesión
async function login() {
    // Obtener los valores del formulario
    let formData = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };

    // Validar los campos del formulario
    let camposValidos = validarCampos(formData);

    // Referencias al botón y al contenedor del loader
    const loginButton = document.getElementById("loginButton");
    const loaderContainer = document.getElementById("loaderContainer");

    if (camposValidos) {
        // Mostrar el loader y desactivar el botón
        loaderContainer.style.display = "inline-block";  // Mostrar el loader
        loginButton.disabled = true;  // Desactivar el botón para evitar clics múltiples

        try {
            // Hacer la solicitud AJAX para el inicio de sesión
            const response = await fetch(urlInicioSesion, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                // Ocultar el loader
                loaderContainer.style.display = "none";  // Ocultar el loader
                loginButton.disabled = false;  // Reactivar el botón

                // Si la respuesta no es OK, mostrar el error
                Swal.fire("Error", result.message || "Error al iniciar sesión", "error");
                return;
            }

            // Obtener el token de la respuesta
            const token = result.token;

            // Almacenar el token en el localStorage
            localStorage.setItem('authTokens', token);

            // Verificar el estado del usuario
            const estado = await checkUserStatus(token);

            // Si la cuenta está inactiva, mostrar mensaje y eliminar el token
            if (estado === 0) {
                loaderContainer.style.display = "none";  // Ocultar el loader
                loginButton.disabled = false;  // Reactivar el botón
                Swal.fire("Error", "Su cuenta está inactiva. No puede iniciar sesión.", "error");
                localStorage.removeItem('authTokens');
                return;
            }

            // Si todo está bien, mostrar mensaje de bienvenida
            Swal.fire({
                title: "¡Bienvenido!",
                text: "Inicio de sesión exitoso.",
                icon: "success"
            }).then(() => {
                checkUserRole(token); // Verificar el rol después del login
            });
        } catch (error) {
            // En caso de error en la solicitud
            loaderContainer.style.display = "none";  // Ocultar el loader
            loginButton.disabled = false;  // Reactivar el botón
            Swal.fire("Error", "Hubo un problema al procesar tu solicitud.", "error");
        }
    } else {
        // Si los campos no son válidos, mostrar error
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, complete todos los campos correctamente.",
            icon: "error"
        });
    }
}

// Función para verificar el estado del usuario
async function checkUserStatus(token) {
    try {
        const response = await fetch(urlBase + 'user/verificar-estado', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            Swal.fire("Error", errorData.message, "error");
            return null; // Retornar null si hay un error
        }

        const data = await response.json();
        const estado = data.estado; // Obtener el estado

        return estado === "cuenta_activa" ? 1 : 0; // Retornar 1 para "cuenta_activa" y 0 para "cuenta_inactiva"
    } catch (error) {
        console.error('Error al verificar el estado del usuario:', error);
        Swal.fire("Error", "Error al verificar el estado del usuario: " + error.message, "error");
        return null; // Retornar null en caso de error
    }
}

// Función para verificar el rol del usuario y redirigir
async function checkUserRole(token) {
    try {
        const rolResponse = await fetch(urlBase + 'user/rol', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!rolResponse.ok) {
            const errorData = await rolResponse.json();
            Swal.fire("Error", "Error al verificar el rol del usuario: " + errorData.message, "error");
            return;
        }

        const rolData = await rolResponse.json();
        const userRole = rolData.role; // Obtener el rol del usuario

        if (userRole === "Administrador") {
            window.location.href = urlRedireccionModuloAdmin; // Cambia a la página del administrador
        } else if (userRole === "Usuario") {
            window.location.href = urlRedireccionModuloUsuario; // Cambia a la página del usuario
        }
    } catch (error) {
        console.error('Error al verificar el rol del usuario:', error);
        Swal.fire("Error", "Error al verificar el rol del usuario: " + error.message, "error");
    }
}

// Función para validar campos del formulario de login
function validarCampos(formData) {
    let camposRequeridos = ["username", "password"];
    let camposValidos = true;

    camposRequeridos.forEach(function (campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`); // Ajusta el ID del elemento de error
        if (elemento.value.trim() === "") {
            errorElemento.textContent = "Este campo es obligatorio.";
            errorElemento.classList.add("error-message");
            camposValidos = false;
        } else {
            errorElemento.textContent = "";
            errorElemento.classList.remove("error-message");
        }
    });

    return camposValidos;
}

// Alternar visibilidad de la contraseña
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});


