function rearrangeElements() {
  var container = document.querySelector('.container');
  var formContainer = document.getElementById('form-container');
  var imageContainer = document.getElementById('image-container');

  formContainer.style.transform = 'translateX(80%)';
  imageContainer.style.transform = 'translateX(-125%)';

  setTimeout(() => {
      formContainer.style.transform = 'translateX(1)';
      imageContainer.style.transform = 'translateX(1)';
  }, 800);
}

// Llama a la función después de 1 segundo de que la página haya cargado
window.onload = function() {
  setTimeout(rearrangeElements, 1100);
};

// Llama a la función al redimensionar la ventana
window.onresize = rearrangeElements;

