document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    // Sample data for occupied and pending days
    const occupiedDays = [5, 12, 19];
    const pendingDays = [10, 20, 25];

    function renderCalendar() {
        calendarBody.innerHTML = '';
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.innerHTML = date;
                    cell.classList.add('selectable-day');
                    if (
                        date === new Date().getDate() &&
                        currentYear === new Date().getFullYear() &&
                        currentMonth === new Date().getMonth()
                    ) {
                        cell.classList.add('current-day');
                    }
                    if (occupiedDays.includes(date)) {
                        cell.classList.add('occupied');
                    } else if (pendingDays.includes(date)) {
                        cell.classList.add('pending');
                    }
                    date++;
                }
                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }

    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    calendarBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('selectable-day')) {
            alert(`Día seleccionado: ${event.target.innerHTML}`);
        }
    });

    renderCalendar();
});

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