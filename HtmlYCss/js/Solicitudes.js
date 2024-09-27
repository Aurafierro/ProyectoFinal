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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Texto del título
    const titulo = 'Solicitudes';
  
    // Obtener el ancho de la página
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Calcular la posición X para centrar el título
    const textWidth = doc.getTextWidth(titulo);
    const textX = (pageWidth - textWidth) / 2;
  
    // Añadir título al PDF centrado
    doc.setFontSize(18);
    doc.text(titulo, textX, 22); // Coloca el título en la posición Y = 22
  
    // Restablecer el tamaño de la fuente para el contenido
    doc.setFontSize(12);
  
    // Añadir un espacio después del título
    doc.text(" ", 14, 30);
  
    // Definir las columnas de la tabla
    const head = [['Usuario', 'Espacio', 'Hora Entrada', 'Hora Salida', 'Modificaciones']];
  
    // Obtener los datos de la tabla desde el DOM
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const rows = [...cuerpoTabla.getElementsByTagName('tr')].map(row => {
        return [...row.getElementsByTagName('td')].map(cell => cell.innerText);
    });
  
    // Generar la tabla en el PDF después del título
    doc.autoTable({
        head: head,
        body: rows,
        startY: 35, // Posición inicial de la tabla después del título
        theme: 'striped', // Cambiar el estilo de la tabla
        styles: { cellPadding: 3, fontSize: 10 },
        headStyles: { fillColor: [26, 62, 104] },
        bodyStyles: { fillColor: [255, 255, 255] }
    });
  
    // Guardar el archivo PDF con un nombre específico
    doc.save('Solicitudes.pdf');
  }

  