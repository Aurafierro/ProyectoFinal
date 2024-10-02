document.getElementById("nombre-completo").addEventListener("keypress", soloLetras);
document.getElementById("numero-documento").addEventListener("keypress", soloNumeros);

document.getElementById("correo").addEventListener("keypress", letrasNumerosCaracteres);

function soloLetras(event) {
    const letrasPermitidas = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
        "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
    ];

    if (!letrasPermitidas.includes(event.key)) {
        event.preventDefault();
    }
}

function letrasNumerosCaracteres(event) {
    const letrasPermitidas = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "o", "z", "ñ", "Ñ",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ",
        "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"
    ];
    const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const caracteresPermitidos = ['@', '_', '-', '.'];

    if (!(letrasPermitidas.includes(event.key)) && !(numeroPermitidos.includes(event.key)) && !(caracteresPermitidos.includes(event.key))) {
        event.preventDefault();
    }
}

function soloNumeros(event) {
    const numeroPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    if (!numeroPermitidos.includes(event.key)) {
        event.preventDefault();
    }
}

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarj');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('authTokens');

    // Función para obtener datos del usuario
    async function obtenerDatosUsuario(token) {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron obtener los datos del usuario.'
            });
        }
    }

    // Función para modificar los datos del usuario
    async function modificarDatosUsuario(datosUsuario) {
        const token = localStorage.getItem('authTokens');

        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Sin sesión',
                text: 'No hay sesión activa. Por favor, inicia sesión.'
            });
            return;
        }

        try {
            // Utiliza el id_user en la URL para modificar
            const response = await fetch(`http://localhost:8080/api/v1/user/${datosUsuario.id_user}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al modificar los datos');
            }

            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Datos modificados exitosamente.'
            });
            return data;
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron modificar los datos: ' + error.message
            });
        }
    }

    // Obtener y llenar los datos del usuario al cargar la página
    const datosUsuario = await obtenerDatosUsuario(token);

    if (datosUsuario) {
        document.getElementById('id_user').value = datosUsuario.id_user; // Asegúrate de que esto esté correcto
        document.getElementById('numero-documento').value = datosUsuario.numero_documento || '';
        document.getElementById('nombre-completo').value = datosUsuario.nombre_completo || '';
        document.getElementById('correo').value = datosUsuario.username || ''; // Asumimos que el campo username es el correo
        document.getElementById('tipo_documento').value = datosUsuario.tipo_documento || ''; // Agregar tipo_documento
    }

    // Manejo del envío del formulario
    document.querySelector('.modificarDatos').addEventListener('click', async () => {
        const nuevosDatos = {
            id_user: document.getElementById('id_user').value, // Obtener el id_user oculto
            numero_documento: document.getElementById('numero-documento').value,
            nombre_completo: document.getElementById('nombre-completo').value,
            username: document.getElementById('correo').value,
            tipo_documento: document.getElementById('tipo_documento').value // Agregar tipo_documento
        };

        await modificarDatosUsuario(nuevosDatos);
    });
});
function cerrarSesion() {
    localStorage.removeItem('authTokens'); 
    window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html';
}