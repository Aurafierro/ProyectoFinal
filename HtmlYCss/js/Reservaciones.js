

//funcionalidad del calendario:
// Variables globales para el calendario
var currentDate = new Date(); // Fecha actual
var currentMonth = currentDate.getMonth(); // Mes actual (0-indexed)
var currentYear = currentDate.getFullYear(); // Año actual
var monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Función para actualizar el título del mes y año
function updateMonthTitle() {
    document.getElementById('month-year').textContent = monthNames[currentMonth] + ' ' + currentYear;
}

// Función para actualizar los días del calendario según el mes y año actuales
function updateCalendar() {
    var daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = '';

    // Obtener el número de días en el mes actual
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Crear los días del mes
    for (var i = 1; i <= daysInMonth; i++) {
        var dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');
        daysContainer.appendChild(dayElement);
    }
}

// Función para cambiar al mes anterior
document.getElementById('prev-month').addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateMonthTitle();
    updateCalendar();
});

// Función para cambiar al mes siguiente
document.getElementById('next-month').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateMonthTitle();
    updateCalendar();
});

// Inicialización del calendario
updateMonthTitle();
updateCalendar();

var url = "http://localhost:8080/api/v1/reserva/";
function crearReserva() {


    let formData = {
      "nombre_completo": document.getElementById("nombre_completo").value,
      "nombre_espacio": document.getElementById("nombre_espacio").value,
      "hora_entrada": document.getElementById("hora_entrada").value,
      "hora_salida": document.getElementById("hora_salida").value,
      
  
    };
  
    let camposValidos = true;
    let camposRequeridos = [
        "nombre_completo",
        "nombre_espacio",
        "hora_entrada",
        "hora_salida",
        
    ];
  
    camposRequeridos.forEach(function(campo) {
        let valorCampo = document.getElementById(campo).value.trim();
        if (valorCampo === "") {
            camposValidos = false;
            return false; // Terminar la iteración si se encuentra un campo vacío
        }
    });
  
    if (camposValidos) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                //limpiarLibro();
            },
            error: function (error) {
                Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
            },
        });
  
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
  
  }
  
  //se ejecuta la peticion
  //Validar nombre completo
  
  function validarCampos() {
    var nombre_completo = document.getElementById("nombre_completo");
    return validarNombre_completo(nombre_completo);
  }
  function validarNombre_completo(cuadroNumero) {
  
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 3 || valor.length > 36) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  
  //Valida la hora de entrada
  function validarCampos() {
    var hora_entrada = document.getElementById("hora_entrada");
    return validarHora_entrada(hora_entrada);
  }
  function validarHora_entrada(cuadroNumero) {
    
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 36) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  //Valida la hora de salida
  function validarCampos() {
    var hora_salida = document.getElementById("hora_salida");
    return validarHora_salida(hora_salida);
  }
  function validarHora_salida(cuadroNumero) {
    
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 1 || valor.length > 36) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
