function rearrangeElements() {
  var formContainer = document.getElementById('form-container');
  var imageContainer = document.getElementById('image-container');

  // Verificar si la pantalla es grande (mayor que 768px)
  if (window.innerWidth > 768) {
      formContainer.style.transform = 'translateX(80%)';
      imageContainer.style.transform = 'translateX(-125%)';

      setTimeout(() => {
          formContainer.style.transform = 'translateX(0)';
          imageContainer.style.transform = 'translateX(0)';
      }, 800);
  } else {
      formContainer.style.transform = 'translateX(0)';
      imageContainer.style.transform = 'translateX(0)';
  }
}
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedTokens = JSON.parse(localStorage.getItem('authTokens')) || [];
    const token = storedTokens[0];

    if (token) {
        console.log('Token encontrado, verificando token:', token);
        const isValid = await verificarToken(token); // Solo verificar el token
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El token no es válido para este usuario. Inicia sesión nuevamente.'
            });
            return;
        }
        // Si el token es válido, redirigir a la nueva URL
        window.location.href = "http://127.0.0.1:5502/HtmlYCss/indexHTML/ContrasenaCambiar.html"; 
        return;
    }

    const requestData = { username, password };

    try {
        const response = await fetch('http://localhost:8080/api/v1/public/user/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Inicio de sesión exitoso:', data);
            localStorage.setItem('authTokens', JSON.stringify([`Bearer ${data.token}`]));

            // Verificar el token después de iniciar sesión
            const isValid = await verificarToken(`Bearer ${data.token}`); 
            if (isValid) {
                // Redirigir a la nueva URL después de verificar
                window.location.href = "http://127.0.0.1:5502/HtmlYCss/indexHTML/ContrasenaCambiar.html"; 
            }
        } else {
            const errorData = await response.json();
            // Verifica si el error es de contraseña incorrecta
            if (errorData.message === 'Incorrect password') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'La contraseña es incorrecta. Por favor, intenta de nuevo.'
                });
            } else {
                console.error('Error en el inicio de sesión:', errorData);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Credenciales incorrectas. Por favor, intenta de nuevo.'
                });
            }
        }
    } catch (error) {
        console.error('Error al conectarse a la API:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar iniciar sesión. Intenta de nuevo más tarde.'
        });
    }
}
// Función de verificación del token
async function verificarToken(token) {
    try {
        const response = await fetch('http://localhost:8080/api/v1/user/verifyToken', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        if (response.ok) {
            console.log('Token es válido');
            return true; // Retorna verdadero si es válido
        } else {
            console.log('Token no válido o ha expirado');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tu sesión ha expirado o el token no es válido. Por favor, inicia sesión nuevamente.'
            });
            localStorage.removeItem('authTokens'); // Eliminar el token no válido
            return false; // Retorna falso si no es válido
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al verificar el token. Intenta de nuevo más tarde.'
        });
        return false; // Retorna falso en caso de error
    }
}
