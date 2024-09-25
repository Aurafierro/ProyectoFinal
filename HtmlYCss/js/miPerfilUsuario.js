document.addEventListener("DOMContentLoaded", () => {
    const urlFoto = 'http://localhost:8080/api/v1/fotoperfil/';

    // Cargar la imagen seleccionada y subirla a la base de datos
    document.getElementById('photoInput').addEventListener('change', async function(event) {
        const input = event.target;
        const file = input.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Cambiar 'file' según lo esperado por tu API

            try {
                // Mostrar el archivo seleccionado como vista previa inmediatamente
                const reader = new FileReader();
                reader.onload = (e) => {
                    const preview = document.getElementById('image-preview');
                    preview.setAttribute('src', e.target.result);
                    preview.style.display = 'block'; // Mostrar la imagen
                };
                reader.readAsDataURL(file);

                // Enviar el archivo al servidor
                const response = await fetch(urlFoto, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    const imageUrl = result.foto_perfil_url || result.message; // Ajustar según la respuesta de tu API

                    // Aquí puedes actualizar la vista previa si es necesario
                    // preview.src = imageUrl; // Esto es opcional si ya estás mostrando el archivo local
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
