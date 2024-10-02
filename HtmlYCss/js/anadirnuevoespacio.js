
// Manejo del evento del icono para subir imágenes
document.getElementById("add-icon").addEventListener("click", () => {
    document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const preview = document.getElementById("image-preview");
    const addIcon = document.getElementById("add-icon");

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.setAttribute("src", e.target.result);
            preview.style.display = "block";
            addIcon.style.display = "none";
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = "none";
        addIcon.style.display = "block";
    }
});

// Validar solo letras en los inputs especificados
document.getElementById("nombre_del_espacio").addEventListener("keypress", soloLetras);
document.getElementById("clasificacion").addEventListener("keypress", soloLetras);
document.getElementById("capacidad").addEventListener("keypress", soloNumeros);
document.getElementById("descripcion").addEventListener("keypress", soloLetras);

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

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById("miFormulario").reset();
    const preview = document.getElementById('image-preview');
    preview.style.display = 'none';
    preview.setAttribute('src', '');
    document.getElementById('add-icon').style.display = 'block';
}

// Toggle del menú lateral
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarj');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
});

// Guardar espacio
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
        url: urlAnadirEspacio, // Se debe usar la URL correcta
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
        },
        error: (error) => {
            console.error("Error al guardar:", error);
            Swal.fire("Error", `Error al guardar: ${error.responseText}`, "error");
        }
    });
}

// Función para obtener espacios registrados
function espaciosRegistrados() {
    var capturarFiltro = document.getElementById("inputSearch").value.trim();
    var urlLocal = urlAnadirEspacio;

    if (capturarFiltro !== "") {
        urlLocal += "busquedafiltro/" + encodeURIComponent(capturarFiltro);
    }

    $.ajax({
        url: urlLocal,
        type: "GET",
        success: function (result) {
            console.log(result);
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";
            result.forEach(item => {
                var trRegistro = document.createElement("tr");

                let celdaNombre_del_espacio = document.createElement("td");
                let celdaClasificacion = document.createElement("td");
                let celdaCapacidad = document.createElement("td");
                let celdaDescripcion = document.createElement("td");

                celdaNombre_del_espacio.innerText = item["nombre_del_espacio"];
                celdaClasificacion.innerText = item["clasificacion"];
                celdaCapacidad.innerText = item["capacidad"];
                celdaDescripcion.innerText = item["descripcion"];

                let celdaOpcionEditar = document.createElement("td");
                let botonEditarEspacio = document.createElement("button");
                botonEditarEspacio.value = item["id_espacio"];
                botonEditarEspacio.innerHTML = "Editar";
                botonEditarEspacio.onclick = function () {
                    $('#exampleModal').modal('show');
                    consultarEspacioID(this.value);
                };
                botonEditarEspacio.className = "btnEditar";
                celdaOpcionEditar.appendChild(botonEditarEspacio);

                let celdaOpcionEliminar = document.createElement("td");
                let botonEliminarEspacio = document.createElement("button");
                botonEliminarEspacio.value = item["id_espacio"];
                botonEliminarEspacio.innerHTML = "Eliminar";
                botonEliminarEspacio.onclick = function () {
                    eliminarEspacio(this.value);
                };
                botonEliminarEspacio.className = "btnEliminar";
                celdaOpcionEliminar.appendChild(botonEliminarEspacio);

                trRegistro.appendChild(celdaNombre_del_espacio);
                trRegistro.appendChild(celdaClasificacion);
                trRegistro.appendChild(celdaCapacidad);
                trRegistro.appendChild(celdaDescripcion);
                trRegistro.appendChild(celdaOpcionEditar);
                trRegistro.appendChild(celdaOpcionEliminar);
                cuerpoTabla.appendChild(trRegistro);
            });
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}

// Función para consultar un espacio por ID
function consultarEspacioID(id) {
    $.ajax({
        url: urlAnadirEspacio + id, // Usar URL correcta
        type: "GET",
        success: function (result) {
            document.getElementById("id_espacio").value = result["id_espacio"];
            document.getElementById("nombre_del_espacio").value = result["nombre_del_espacio"];
            document.getElementById("clasificacion").value = result["clasificacion"];
            document.getElementById("capacidad").value = result["capacidad"];
            document.getElementById("descripcion").value = result["descripcion"];
        }
    });
}

// Actualizar espacio
function actualizarEspacio() {
    var id_espacio = document.getElementById("id_espacio").value;
    let formData = {
        "nombre_del_espacio": document.getElementById("nombre_del_espacio").value,
        "clasificacion": document.getElementById("clasificacion").value,
        "capacidad": document.getElementById("capacidad").value,
        "descripcion": document.getElementById("descripcion").value
    };
    if (validarCampos()) {
        $.ajax({
            url: urlAnadirEspacio + id_espacio, // Usar URL correcta
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se editó el espacio correctamente",
                    icon: "success"
                });
                espaciosRegistrados();
            },
            error: function (error) {
                Swal.fire("Error", "Error al guardar: " + error.responseText, "error");
            }
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}

// Función para eliminar espacio
function eliminarEspacio(idEspacio) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas eliminar este espacio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: urlAnadirEspacio + idEspacio, // Usar URL correcta
                type: "DELETE",
                success: function (response) {
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El espacio ha sido eliminado correctamente.",
                        icon: "success"
                    });
                    espaciosRegistrados();
                },
                error: function (error) {
                    Swal.fire("Error", "Error al eliminar: " + error.responseText, "error");
                }
            });
        }
    });
}
