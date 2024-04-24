document.getElementById("passwordForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  
  if (newPassword !== confirmPassword) {
    document.getElementById("message").textContent = "Las contraseñas no coinciden.";
  } else {
    // Simulamos una alerta para indicar que la contraseña se ha modificado
    alert("¡Contraseña modificada exitosamente!");
    // Limpia los campos del formulario
    document.getElementById("passwordForm").reset();
    // Restablece el mensaje de error, si lo hubiera
    document.getElementById("message").textContent = "";
  }
});

// Elimina el evento del botón rojo para que no haga nada
document.querySelector(".volver").addEventListener("click", function(event) {
  event.preventDefault();
});
