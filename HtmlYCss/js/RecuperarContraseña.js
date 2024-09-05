
// Llama a la función después de 1 segundo de que la página haya cargado
window.onload = function() {
    setTimeout(rearrangeElements, 1100);
};

// Llama a la función al redimensionar la ventana
window.onresize = rearrangeElements;
