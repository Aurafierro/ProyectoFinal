document.addEventListener("DOMContentLoaded", () => {
    const urlFoto = 'http://localhost:8080/api/v1/fotoperfil/';
    const tamañoMaximoArchivo = 2 * 1024 * 1024; // 2MB en bytes

    const urlImagenExistente = localStorage.getItem('profileImageUrl');
    const vistaPrevia = document.getElementById('image-preview');
    const iconoAgregar = document.getElementById('add-icon');

    if (urlImagenExistente) {
        // Establecer la URL de la imagen existente como src de la vista previa
        vistaPrevia.setAttribute('src', urlImagenExistente);
        vistaPrevia.style.display = 'block';
    }

    document.getElementById('photoInput').addEventListener('change', async function(evento) {
        const entrada = evento.target;
        const archivo = entrada.files[0];

        if (archivo) {
            console.log(`Tamaño del archivo: ${archivo.size} bytes`);
            if (archivo.size > tamañoMaximoArchivo) {
                Swal.fire('Error', 'La imagen es demasiado pesada. El límite es de 2MB.', 'error');
                entrada.value = ''; // Reiniciar la entrada
                vistaPrevia.style.display = 'none'; // Ocultar la vista previa si el archivo es demasiado grande
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
                    const resultado = await respuesta.json();
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

    // Evento para abrir el selector de archivos al hacer clic en el icono
    iconoAgregar.addEventListener('click', () => {
        const entradaFoto = document.getElementById('photoInput');
        entradaFoto.value = ''; // Reiniciar el valor de la entrada para permitir volver a subir
        entradaFoto.click(); // Disparar el clic en la entrada de archivo
    });
});

function cerrarSesion() {
    localStorage.removeItem('authTokens'); 
 
    window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html';
}
