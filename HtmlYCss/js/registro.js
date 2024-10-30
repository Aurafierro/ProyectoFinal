  // Realiza la solicitud al backend con fetch
  fetch(urlLocal)
      .then(response => {
          if (!response.ok) {
              throw new Error("Error en la solicitud: " + response.status);
          }
          return response.json();
      })
      .then(data => {
          console.log("Datos recibidos:", data);
          // Llama a una función para manejar los datos recibidos
      })
      .catch(error => {
          console.error("Error:", error);
      });

  // Realiza la solicitud también con jQuery por compatibilidad
  $.ajax({
    url: urlRegistro,
    type: "GET",
    success: function (result) {
      console.log(result); // Log the entire result to inspect the data

      var cuerpoTabla = document.getElementById("cuerpoTabla");
      cuerpoTabla.innerHTML = ""; // Clear the table body

      result.forEach(function (registro) {
        console.log("registro:", registro); // Log each reservation to inspect the structure
       
          var trResgistro = document.createElement("tr");
          let trRegistro = document.createElement("tr");

                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaRol = document.createElement("td");
                let celdaNombreCompleto = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaEstado = document.createElement("td");

         celdaTipoDocumento.innerText = registro["tipo_documento"];
                celdaNumeroDocumento.innerText = registro["numero_documento"];
                celdaRol.innerText = registro["rol"];
                celdaNombreCompleto.innerText = registro["nombre_completo"];
                celdaCorreo.innerText = registro["username"];

          let celdaOpcionEditar = document.createElement("td");
          let botonEditarRegistro = document.createElement("button");
          botonEditarRegistro .value = reserva["id_user"];
          botonEditarRegistro .onclick = function (e) {
            aceptarRegistro(this.value);
          };
          botonEditarRegistro .className = "btnRegistro";
          celdaOpcionAceptar.appendChild(botonEditarRegistro );


          let celdaOpcionRechazar = document.createElement("td");
          let botonRecgazarRegistro = document.createElement("button");
          botonRecgazarRegistro .value = reserva["id_user"];
          botonRecgazarRegistro .innerHTML = "Cancelar";
          botonRecgazarRegistro .onclick = function (e) {
            cancelarRegistro(this.value);
          };
          botonRecgazarRegistro .className = "btnRechazar";
          celdaOpcionEliminar.appendChild(botonRecgazarRegistro );

             trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaRol);
                trRegistro.appendChild(celdaNombreCompleto);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaEstado);
          trResgistro.appendChild(celdaOpcionAceptar);
          trResgistro.appendChild(celdaOpcionEliminar);
          cuerpoTabla.appendChild(trResgistro);
        }
      });
     
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}