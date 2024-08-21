
    document.getElementById("modifyForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var newPassword = document.getElementById("new-password").value;
        var confirmPassword = document.getElementById("confirm-password").value;

        if (newPassword !== confirmPassword) {
            document.getElementById("message").textContent = "Las contraseñas no coinciden.";
        } else {
            // Simulamos una alerta para indicar que la contraseña se ha modificado
            alert("¡Contraseña modificada exitosamente!");
            // Limpia los campos del formulario
            document.getElementById("modifyForm").reset();
            // Restablece el mensaje de error, si lo hubiera
            document.getElementById("message").textContent = "";
        }
    });

    // Elimina el evento del botón rojo para que no haga nada
    document.querySelector(".logout a").addEventListener("click", function(event) {
        event.preventDefault();
    });

    // JavaScript para abrir el input de archivo al hacer clic en el ícono o el círculo
document.addEventListener('DOMContentLoaded', function() {
  const profilePic = document.querySelector('.profile-pic');
  const cameraIcon = document.querySelector('.profile-pic i');
  const profileImageInput = document.getElementById('profileImage');
  const profileImageDisplay = document.getElementById('profileImageDisplay');

  // Mostrar icono de la cámara con transición al pasar el cursor sobre la imagen de perfil
  profilePic.addEventListener('mouseenter', function() {
      cameraIcon.style.opacity = '1';
  });

  // Ocultar icono de la cámara con transición al quitar el cursor de la imagen de perfil
  profilePic.addEventListener('mouseleave', function() {
      if (!profileImageInput.files[0]) {
          cameraIcon.style.opacity = '0';
      }
  });

  // Abrir el input de archivo al hacer clic en el ícono o la imagen de perfil
  profilePic.addEventListener('click', function() {
      profileImageInput.click();
  });

  // Manejar la carga del archivo y mostrar la imagen
  profileImageInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              profileImageDisplay.src = e.target.result;
              cameraIcon.style.opacity = '0';
          }
          reader.readAsDataURL(file);
      }
  });

  // Restablecer la imagen de perfil al hacer clic en la cámara i cioo  ie  in eod ijv kl9e k0oe 
  cameraIcon.addEventListener('click', function() {
      profileImageInput.value = null; // Limpiar el input para poder volver a seleccionar la misma imagen
      profileImageDisplay.src = ''; // Limpiar la imagen actual
      cameraIcon.style.opacity = '1'; // Mostrar el ícono de la cámara
  });
});

  
      
