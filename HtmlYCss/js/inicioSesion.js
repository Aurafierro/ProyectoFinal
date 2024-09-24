var url = "http://localhost:8080/api/v1/public/user/login/"; // Update with your actual login endpoint

function login() {
    // Collect user input
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
                const token = result.token; // Adjust according to your API response
                let tokens = JSON.parse(localStorage.getItem('authTokens')) || [];
                tokens.push(token);
                localStorage.setItem('authTokens', JSON.stringify(tokens)); // Store all tokens

                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Inicio de sesión exitoso.",
                    icon: "success"
                }).then(() => {
                    window.location.href = "http://127.0.0.1:5502/HtmlYCss/indexHTML/ModuloInformacion.html"; // Redirect to the main page
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

function validarCampos(formData) {
    let camposRequeridos = [
        "username",
        "password"
    ];

    let camposValidos = true;

    camposRequeridos.forEach(function(campo) {
        let elemento = document.getElementById(campo);
        let errorElemento = document.getElementById(`error-${campo}`); // If you want to show error messages
        if (elemento.value.trim() === "") {
            errorElemento.textContent = `Este campo es obligatorio.`;
            errorElemento.classList.add('error-message');
            camposValidos = false;
        } else {
            errorElemento.textContent = "";
            errorElemento.classList.remove('error-message');
        }
    });

    return camposValidos;
}
