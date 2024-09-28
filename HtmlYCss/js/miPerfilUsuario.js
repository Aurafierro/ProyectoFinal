const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarj');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

document.addEventListener("DOMContentLoaded", () => {
    const urlFoto = 'http://localhost:8080/api/v1/fotoperfil/';
    const tamañoMaximoArchivo = 2 * 1024 * 1024; // 2MB

    const urlImagenExistente = localStorage.getItem('profileImageUrl');
    const vistaPrevia = document.getElementById('image-preview');
    const iconoAgregar = document.getElementById('add-icon');

    if (urlImagenExistente) {
        vistaPrevia.setAttribute('src', urlImagenExistente);
        vistaPrevia.style.display = 'block';
    }

    document.getElementById('photoInput').addEventListener('change', async function(evento) {
        const entrada = evento.target;
        const archivo = entrada.files[0];

        if (archivo) {
            if (archivo.size > tamañoMaximoArchivo) {
                Swal.fire('Error', 'La imagen es demasiado pesada. El límite es de 2MB.', 'error');
                entrada.value = ''; 
                vistaPrevia.style.display = 'none'; 
                return;
            }

            const formData = new FormData();
            formData.append('file', archivo);

            const lector = new FileReader();
            lector.onload = (e) => {
                vistaPrevia.setAttribute('src', e.target.result);
                vistaPrevia.style.display = 'block'; // Mostrar la vista previa
                localStorage.setItem('profileImageUrl', e.target.result); // Almacenar la URL de la imagen
            };
            lector.readAsDataURL(archivo);

            try {
                const respuesta = await fetch(urlFoto, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authTokens')
                    }
                });

                if (respuesta.ok) {
                    Swal.fire('Éxito', 'La imagen de perfil se ha actualizado correctamente', 'success');
                } else {
                    const mensajeError = await respuesta.text();
                    throw new Error(`Error al subir la imagen: ${mensajeError}`);
                }
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
                Swal.fire('Error', error.message, 'error');
            }
        }
    });

    iconoAgregar.addEventListener('click', () => {
        const entradaFoto = document.getElementById('photoInput');
        entradaFoto.value = ''; 
        entradaFoto.click(); 
    });
});



document.addEventListener("DOMContentLoaded", async () => {
    await obtenerDatosUsuario();
});

async function obtenerDatosUsuario() {
    const urlDatosUsuario = 'http://localhost:8080/api/v1/user/profile'; // URL actualizada
    const token = localStorage.getItem('authTokens');

    if (!token) {
        console.error('Token no encontrado');
        return;
    }

    try {
        const respuesta = await fetch(urlDatosUsuario, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error al obtener los datos del usuario: ' + respuesta.statusText);
        }

        const datosUsuario = await respuesta.json();

        // Mostrar los datos directamente en los elementos HTML
        document.getElementById('tipo_documento').textContent = datosUsuario.tipo_documento || 'No disponible';
        document.getElementById('numero_documento').textContent = datosUsuario.numero_documento || 'No disponible';
        document.getElementById('nombre_completo').textContent = datosUsuario.nombre_completo || 'No disponible';
        document.getElementById('rol').textContent = datosUsuario.rol || 'No disponible';
        document.getElementById('correo').textContent = datosUsuario.username || 'No disponible';
        
        document.getElementById('username').textContent = datosUsuario.nombre_completo || 'No disponible';
        
    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', error.message, 'error');
    }
}
function cerrarSesion() {
    localStorage.removeItem('authTokens'); 
    window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html';
}