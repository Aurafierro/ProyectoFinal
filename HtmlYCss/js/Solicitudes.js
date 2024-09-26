function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('visible');
        mainContent.classList.add('shifted'); // Ajuste del margen
    } else {
        sidebar.classList.remove('visible');
        sidebar.classList.add('hidden');
        mainContent.classList.remove('shifted'); // Ajuste del margen
    }
    function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("hidden");
    }
}
function descargarPDF() {
    // Crear una instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Añadir título al PDF
    doc.setFontSize(18);
    doc.text('Reservaciones realizadas', 14, 22);
    doc.setFontSize(12); // Restablecer tamaño de fuente para el contenido

    // Añadir un espacio después del título
    doc.addPage();

    // Definir las columnas de la tabla
    const head = [['Usuario', 'Espacio', 'Hora Entrada', 'Hora salida', 'modificaciones']];

    // Obtener los datos de la tabla desde el DOM
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const rows = [...cuerpoTabla.getElementsByTagName('tr')].map(row => {
        return [...row.getElementsByTagName('td')].map(cell => cell.innerText);
    });

    // Generar la tabla en el PDF
    doc.autoTable({
        head: head,
        body: rows,
        startY: 40, // Posición inicial de la tabla
        theme: 'striped', // Puedes cambiar el estilo de la tabla
        styles: { cellPadding: 3, fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] }, // Color de fondo para los encabezados
        bodyStyles: { fillColor: [255, 255, 255] } // Color de fondo para las filas
    });

    // Guardar el archivo PDF con un nombre específico
    doc.save('reservas.pdf');
}

// Añadir evento de clic al botón de descargar
document.getElementById('botonDescargarPDF').addEventListener('click', descargarPDF);
function cerrarSesion() {
    // Elimina el token del almacenamiento local (localStorage o sessionStorage, según lo que estés usando)
    localStorage.removeItem('token'); // Asegúrate de que 'token' es el nombre correcto que usas para almacenar el token
  
    // Redirige a la página de inicio de sesión
    window.location.href = 'http://127.0.0.1:5502/HtmlYCss/indexHTML/InicioSesion.html'; // Cambia esta ruta a la de tu página de inicio de sesión
  }