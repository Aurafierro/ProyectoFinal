document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.getElementById("sidebarj");
  
    // Toggle del menú lateral
    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("visible");
    });
  
    // Cierra el menú al hacer clic en un enlace
    sidebar.addEventListener("click", function() {
        sidebar.classList.remove("visible");
    });
  });



  function tablaRegistro() {
    var capturarFiltro = document.getElementById("inputSearch").value;
    var urlLocal = urlReserva;

    if (capturarFiltro !== "") {
        // Construye la URL con el filtro tanto para 'nombreCompleto' como para 'nombreEspacio'
        urlLocal += "busquedafiltro?nombreCompleto=" + encodeURIComponent(capturarFiltro) + 
                    "&nombreEspacio=" + encodeURIComponent(capturarFiltro);
    }

    $.ajax({
        url: urlLocal,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = ""; // Limpiar tabla antes de cargar los datos
            result.forEach(function (preRegistro) {
            
                var trResgistro = document.createElement("tr");
                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaRol = document.createElement("td");
                let celdaNombreCompleto = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaEstado = document.createElement("td");

                celdaTipoDocumento.innerText = preRegistro["userRegistro"]["nombre_completo"];
                celdaNumeroDocumento.innerText = preRegistro["espacio"]["nombre_del_espacio"];
                celdaRol.innerText = preRegistro["hora_entrada"];
                celdaNombreCompleto.innerText = preRegistro["hora_salida"];
                celdaCorreo.innerText = preRegistro["fecha_entrada"];
                // Mostrar estado como "cuenta_activa" o "cuenta_inactiva"
                celdaEstado.innerText = preRegistro.estadopreRegistro === "ACTIVO" ? "Activo" : "Cancelado";

                // Agregar celdas a la fila
                trResgistro.appendChild(celdaTipoDocumento);
                trResgistro.appendChild(celdaNumeroDocumento);
                trResgistro.appendChild(celdaRol);
                trResgistro.appendChild(celdaNombreCompleto);
                trResgistro.appendChild(celdaCorreo);
              
                trResgistro.appendChild(celdaEstado);

                // Agregar la fila al cuerpo de la tabla
                cuerpoTabla.appendChild(trResgistro);
            });

            // Llamar a cargarFormulario después de cargar la tabla
            cargarFormulario();
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}
/*
  
  document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem('authTokens');
  
    // Si no hay un token, redirige al inicio de sesión
    if (!authToken) {
      window.location.href = urlRedireccionInicioSesion;
    }
  
    // Evitar que el usuario vuelva a la página anterior después de cerrar sesión
    window.history.replaceState(null, null, window.location.href); // Reemplaza el estado actual con la URL actual
    window.onpopstate = function () {
      window.location.href = urlRedireccionInicioSesion; // Siempre redirige al inicio de sesión al retroceder
    };
  });
  */
  function cerrarSesion() {
    // Limpiar el token y redirigir
    localStorage.removeItem('authTokens');
  
    // Limpiar el historial del navegador para evitar regresar a la página anterior
    window.history.replaceState(null, null, urlRedireccionInicioSesion);
  
    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
  }
  