// URL base para la API
const url = "http://localhost:8080/api/v1/espacio/";

// Evento para abrir el selector de archivos al hacer clic en el ícono
document.getElementById('add-icon').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

// Evento para mostrar la imagen seleccionada
document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('image-preview');
        preview.setAttribute('src', e.target.result);
        preview.style.display = 'block';

        // Ocultar el ícono después de cargar la imagen
        document.getElementById('add-icon').style.display = 'none';
    };
    reader.readAsDataURL(file);
});

// Validar campos al ingresar
document.getElementById("nombre_del_espacio").addEventListener("keypress", soloLetras);
document.getElementById("clasificacion").addEventListener("keypress", soloLetras);
document.getElementById("capacidad").addEventListener("keypress", soloNumeros);
document.getElementById("descripcion").addEventListener("keypress", soloLetras);

// Funciones para validar entradas
function soloLetras(event) {
    const letrasPermitidas = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]$/;
    if (!letrasPermitidas.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
}

function soloNumeros(event) {
    const numeroPermitidos = /^[0-9]$/;
    if (!numeroPermitidos.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("miFormulario").reset();
    const preview = document.getElementById('image-preview');
    preview.style.display = 'none';
    preview.setAttribute('src', '');

    // Mostrar el ícono nuevamente al limpiar el formulario
    document.getElementById('add-icon').style.display = 'block';
}

// Función para guardar espacio
function guardarEspacio() {
    const formData = new FormData();
    formData.append("nombre_del_espacio", document.getElementById("nombre_del_espacio").value);
    formData.append("clasificacion", document.getElementById("clasificacion").value);
    formData.append("capacidad", document.getElementById("capacidad").value);
    formData.append("descripcion", document.getElementById("descripcion").value);

    const fileInput = document.getElementById("file-input");
    if (fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    }

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: (result) => {
            console.log("Datos guardados:", result);
            Swal.fire({
                title: "¡Guardado!",
                text: "Se guardó correctamente.",
                icon: "success"
            });
            limpiarFormulario();
            // Aquí puedes llamar a una función para actualizar la lista de espacios si es necesario
            // espaciosRegistrados();
        },
        error: (error) => {
            console.error("Error al guardar:", error);
            Swal.fire("Error", `Error al guardar: ${error.responseText}`, "error");
        }
    });
}
