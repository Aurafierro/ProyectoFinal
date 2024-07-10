// Función para cambiar el orden de los elementos dependiendo del tamaño de la pantalla
function rearrangeElements() {
    var container = document.querySelector('.container');
    var formContainer = document.getElementById('form-container');
    var imageContainer = document.getElementById('image-container');

    if (window.innerWidth > 768) {
        container.style.flexDirection = 'row'; // Cambia a disposición horizontal
        formContainer.style.order = '2';
        imageContainer.style.order = '1';
    } else {
        container.style.flexDirection = 'column'; // Cambia a disposición vertical
        formContainer.style.order = '';
        imageContainer.style.order = '';
    }
}

// Llama a la función después de 1 segundo de que la página haya cargado
window.onload = function() {
    setTimeout(rearrangeElements, 1000); // Espera 1000 milisegundos (1 segundo)
};

// Llama a la función al redimensionar la ventana
window.onresize = rearrangeElements;
