// Archivo: ../js/Solicitudes.js
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        // Asegurarse de que el contenido principal se ajuste correctamente
        document.querySelector('.main-content').classList.toggle('active');
    });

    // Para cerrar el menú cuando se hace clic fuera de él (opcional)
    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.querySelector('.main-content').classList.remove('active');
        }
    });
});
