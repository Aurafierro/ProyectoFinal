function rearrangeElements() {
  var container = document.querySelector('.container');
  var formContainer = document.getElementById('form-container');
  var imageContainer = document.getElementById('image-container');

  // Verificar si la pantalla es grande (mayor que 768px)
  if (window.innerWidth > 768) {
    formContainer.style.transform = 'translateX(80%)';
    imageContainer.style.transform = 'translateX(-125%)';

    setTimeout(() => {
        formContainer.style.transform = 'translateX(0)'; // Cambiado de 1 a 0 para que vuelva a su posición original
        imageContainer.style.transform = 'translateX(0)'; // Cambiado de 1 a 0 para que vuelva a su posición original
    }, 800);
  } else {
    // En pantallas pequeñas, asegúrate de que la transformación esté estática
    formContainer.style.transform = 'translateX(0)';
    imageContainer.style.transform = 'translateX(0)';
  }
}

// Llama a la función después de 1 segundo de que la página haya cargado
window.onload = function() {
  setTimeout(rearrangeElements, 1100);
};

// Llama a la función al redimensionar la ventana
window.onresize = rearrangeElements;

