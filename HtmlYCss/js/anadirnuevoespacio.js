// URL base para la API
const url = "http://localhost:8080/api/v1/espacio/";

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
    var urlLocal = url;

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
                    cargarEspacios(); // Cargar espacios al abrir el modal
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
        url: url + id,
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

// Función para actualizar espacio
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
            url: url + id_espacio,
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

// Función para validar campos
function validarCampos() {
    var nombre_del_espacio = document.getElementById("nombre_del_espacio").value;
    var clasificacion = document.getElementById("clasificacion").value;
    var capacidad = document.getElementById("capacidad").value;
    var descripcion = document.getElementById("descripcion").value;

    return !(nombre_del_espacio === '' || clasificacion === '' || capacidad === '' || descripcion === '');
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
                url: url + idEspacio,
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
                    Swal.fire("Error", "Error al eliminar el espacio: " + error.responseText, "error");
                }
            });
        }
    });
}

// Función para cargar espacios en el select del modal
function cargarEspacios() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            const selectNombreEspacio = document.getElementById("nombre_del_espacio");
            selectNombreEspacio.innerHTML = ""; // Limpia las opciones existentes
            let seleccioneOpcion = document.createElement("option");
            seleccioneOpcion.value = "";
            seleccioneOpcion.innerText = "Seleccione un espacio";
            selectNombreEspacio.appendChild(seleccioneOpcion);

            result.forEach(item => {
                let opcionEspacio = document.createElement("option");
                opcionEspacio.value = item["id_espacio"]; // Asigna el ID
                opcionEspacio.innerText = item["nombre_del_espacio"]; // Asigna el nombre
                selectNombreEspacio.appendChild(opcionEspacio);
            });
        },
        error: function (error) {
            console.error("Error al cargar espacios:", error);
        }
    });
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Texto del título
    const titulo = 'Espacios Registrados';
  
    // Obtener el ancho de la página
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Calcular la posición X para centrar el título
    const textWidth = doc.getTextWidth(titulo);
    const textX = (pageWidth - textWidth) / 2;
  
    // Añadir título al PDF centrado
    doc.setFontSize(18);
    doc.text(titulo, textX, 22); // Coloca el título en la posición Y = 22
  
    // Restablecer el tamaño de la fuente para el contenido
    doc.setFontSize(12);
  
    // Añadir un espacio después del título
    doc.text(" ", 14, 30);
  
    // Definir las columnas de la tabla
    const head = [['Nombre Espacio', 'clasificacion', 'Capacidad', 'Descripcion', 'Opciones']];
  
    // Obtener los datos de la tabla desde el DOM
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const rows = [...cuerpoTabla.getElementsByTagName('tr')].map(row => {
        return [...row.getElementsByTagName('td')].map(cell => cell.innerText);
    });
  
    // Generar la tabla en el PDF después del título
    doc.autoTable({
        head: head,
        body: rows,
        startY: 35, // Posición inicial de la tabla después del título
        theme: 'striped', // Cambiar el estilo de la tabla
        styles: { cellPadding: 3, fontSize: 10 },
        headStyles: { fillColor: [26, 62, 104] },
        bodyStyles: { fillColor: [255, 255, 255] }
    });
  
    // Guardar el archivo PDF con un nombre específico
    doc.save('EspaciosRegistrados.pdf');
  }

  function buscarConFiltro() {
    const filtro = document.getElementById('inputSearch').value;
  
    // Realizar una petición GET al backend con el filtro ingresado
    fetch(`/reservas/busquedafiltro/${filtro}`)
        .then(response => response.json())
        .then(data => {
            // Llamar a una función para renderizar los datos en la tabla
            renderizarTabla(data);
        })
        .catch(error => console.error('Error al buscar con filtro:', error));
  }
