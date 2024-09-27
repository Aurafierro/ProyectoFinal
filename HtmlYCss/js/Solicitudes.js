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

  