const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarj');

// Function to toggle the visibility of the sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

// Wait for the content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    cargarPerfil(); // Cargar la foto de perfil al cargar la página
    const urlFoto = 'http://localhost:8080/api/v1/fotoperfil/'; // URL for profile image API
    const tamañoMaximoArchivo = 2 * 1024 * 1024; // 2 MB limit
    const vistaPrevia = document.getElementById('image-preview'); // Element for image preview
    const iconoAgregar = document.getElementById('add-icon'); // Icon to add photo

    // Event for file input change
    document.getElementById('photoInput').addEventListener('change', async (evento) => {
        const entrada = evento.target;
        const archivo = entrada.files[0];

        if (archivo) {
            // Check file size
            if (archivo.size > tamañoMaximoArchivo) {
                Swal.fire('Error', 'La imagen es demasiado pesada. El límite es de 2MB.', 'error');
                entrada.value = ''; 
                vistaPrevia.style.display = 'none'; 
                return;
            }

            const formData = new FormData();
            formData.append('fotoPerfil', archivo); // Add the image file

            // Fetch user ID and prepare the data
            const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
            const fotoPerfilData = { id_user: userId }; // Include only the necessary field

            formData.append('fotoPerfilJson', JSON.stringify(fotoPerfilData)); // Add the JSON object

            const lector = new FileReader();
            lector.onload = (e) => {
                vistaPrevia.setAttribute('src', e.target.result); // Set the preview image source
                vistaPrevia.style.display = 'block'; // Show the preview
            };
            lector.readAsDataURL(archivo);

            try {
                const respuesta = await fetch(urlFoto, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authTokens'), // Include auth token
                    }
                });

                if (respuesta.ok) {
                    Swal.fire('Éxito', 'La imagen de perfil se ha actualizado correctamente', 'success');
                    
                    // Almacenar la nueva foto de perfil en localStorage
                    localStorage.setItem('fotoPerfil', vistaPrevia.src);
                } else {
                    const mensajeError = await respuesta.text(); // Get the response as text
                    throw new Error(`Error al subir la imagen: ${mensajeError}`);
                }
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
                Swal.fire('Error', error.message, 'error');
            }
        }
    });

    // Event for the add photo icon
    iconoAgregar.addEventListener('click', () => {
        const entradaFoto = document.getElementById('photoInput');
        entradaFoto.value = ''; 
        entradaFoto.click(); // Trigger click on the file input
    });

    // Fetch user data when the document is loaded
    obtenerDatosUsuario();
});

// Function to fetch user data
async function obtenerDatosUsuario() {
    const urlDatosUsuario = 'http://5.183.11.147:8888/api/v1/user/profile'; // URL for user profile API
    const token = localStorage.getItem('authTokens');

    if (!token) {
        console.error('Token no encontrado');
        return;
    }

    try {
        const respuesta = await fetch(urlDatosUsuario, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token, // Include auth token
                'Content-Type': 'application/json',
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al obtener los datos del usuario: ' + respuesta.statusText);
        }

        const datosUsuario = await respuesta.json();
        localStorage.setItem('userId', datosUsuario.id_user); // Save user ID in localStorage

        // Display the user data directly in the HTML elements
        document.getElementById('nombre_completo').textContent = datosUsuario.nombre_completo || 'No disponible';
        document.getElementById('correo').textContent = datosUsuario.username || 'No disponible';
        document.getElementById('tipo_documento').textContent = datosUsuario.tipo_documento || 'No disponible'; // Agregado
        document.getElementById('numero_documento').textContent = datosUsuario.numero_documento || 'No disponible'; // Agregado
        document.getElementById('rol').textContent = datosUsuario.rol || 'No disponible'; // Agregado


        document.getElementById('username').textContent = datosUsuario.nombre_completo || 'No disponible';
        // Check if there's an existing profile image and set it
        const existingImageUrl = datosUsuario.fotoPerfil; // Assuming the user data has this field
        if (existingImageUrl) {
            document.getElementById('image-preview').setAttribute('src', existingImageUrl);
            document.getElementById('image-preview').style.display = 'block'; // Show the image preview
            
            // Store the profile image URL in localStorage
            localStorage.setItem('fotoPerfil', existingImageUrl);
        }
        
    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', error.message, 'error');
    }
}

// Function to load profile image from localStorage
function cargarPerfil() {
    const fotoPerfil = localStorage.getItem('fotoPerfil'); // Get profile image URL from localStorage

    if (fotoPerfil) {
        document.getElementById('image-preview').setAttribute('src', fotoPerfil);
        document.getElementById('image-preview').style.display = 'block';
    } else {
        console.warn('No se encontró la foto de perfil.');
    }
}

function cerrarSesion() {
    // Eliminar el token de autenticación
    localStorage.removeItem('authTokens'); 
    
    // Limpiar el historial de navegación
    history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
    
    // Desactivar retroceso
    window.addEventListener('popstate', function (event) {
      history.pushState(null, null, urlRedireccionInicioSesion);
    });
    
    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
  }
  