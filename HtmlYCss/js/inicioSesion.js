var url = "http://localhost:8080/api/v1/public/user/login/"; // Actualiza con tu endpoint de inicio de sesión

function login() {
    // Recoger la entrada del usuario
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
                let tokens = JSON.parse(localStorage.getItem('authTokens')) || [];
                tokens.push(token);
                localStorage.setItem('authTokens', JSON.stringify(tokens)); // Almacenar todos los tokens

                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Inicio de sesión exitoso.",
                    icon: "success"
                }).then(() => {
                    checkUserRole(token); // Verificar el rol del usuario después del inicio de sesión exitoso
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
      const response = await fetch('http://localhost:8080/api/v1/user/admin/findAll/', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      const data = await response.json(); // Obtener respuesta como JSON

      if (!response.ok) {
          console.error('Error en la respuesta del servidor:', data);
          Swal.fire("Error", "Error al verificar el rol del usuario: " + data.message, "error");
          return;
      }

      const userRole = data.role; // Obtener el rol del usuario

      if (userRole === "Admin") {
          window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/M.informacionAdmin.html';
      } else if (userRole === "Usuario") {
          window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/ContrasenaCambiar.html'; // URL para usuarios
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
