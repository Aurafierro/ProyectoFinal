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

            const fotoPerfil = {
               
            };
            formData.append('fotoPerfil', JSON.stringify(fotoPerfil));

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

    iconoAgregar.addEventListener('click', () => {
        const entradaFoto = document.getElementById('photoInput');
        entradaFoto.value = ''; 
        entradaFoto.click(); 
    });
});

function cerrarSesion() {
    localStorage.removeItem('authTokens'); 
    window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html';
}

