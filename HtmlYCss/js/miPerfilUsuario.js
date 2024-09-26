document.addEventListener("DOMContentLoaded", () => {
    const urlFoto = 'http://localhost:8080/api/v1/fotoperfil/';
    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes

    // Cargar la imagen seleccionada y subirla a la base de datos
    document.getElementById('photoInput').addEventListener('change', async function(event) {
        const input = event.target;
        const file = input.files[0];

        if (file) {
            // Validar el tamaño del archivo
            console.log(`File size: ${file.size} bytes`); // Debugging: verificar tamaño del archivo
            if (file.size > maxFileSize) {
                Swal.fire('Error', 'La imagen es demasiado pesada. El límite es de 2MB.', 'error');
                input.value = ''; // Limpiar el input
                const preview = document.getElementById('image-preview');
                preview.style.display = 'none'; // Ocultar la imagen previa
                document.getElementById('add-icon').style.display = 'block'; // Mostrar el ícono nuevamente
                return; // Salir de la función
            }

            const formData = new FormData();
            formData.append('file', file); // Cambiar 'file' según lo esperado por tu API

            // Mostrar el archivo seleccionado como vista previa inmediatamente
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('image-preview');
                preview.setAttribute('src', e.target.result);
                preview.style.display = 'block'; // Mostrar la imagen
            };
            reader.readAsDataURL(file);

            // Enviar el archivo al servidor
            try {
                const response = await fetch(urlFoto, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    const imageUrl = result.foto_perfil_url || result.message; // Ajustar según la respuesta de tu API
                    Swal.fire('Éxito', 'La imagen de perfil se ha actualizado correctamente', 'success');
                } else {
                    const errorMessage = await response.text(); 
                    throw new Error(`Error al subir la imagen: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
                Swal.fire('Error', error.message, 'error');
            }
        }
    });

    // Evento para abrir el selector de archivos al hacer clic en el ícono
    document.getElementById('add-icon').addEventListener('click', () => {
        document.getElementById('photoInput').click();
    });
});
function cerrarSesion() {
    // Elimina el token del almacenamiento local (localStorage o sessionStorage, según lo que estés usando)
    localStorage.removeItem('token'); // Asegúrate de que 'token' es el nombre correcto que usas para almacenar el token
  
    // Redirige a la página de inicio de sesión
    window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html'; // Cambia esta ruta a la de tu página de inicio de sesión
  }