document.addEventListener("DOMContentLoaded", function() {
    // Lógica del menú lateral
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.getElementById("sidebarj");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function() {
            sidebar.classList.toggle("visible");
        });

        // Cierra el menú al hacer clic en un enlace
        sidebar.addEventListener("click", function() {
            sidebar.classList.remove("visible");
        });
    }

    // Lógica del carrusel
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cardsContainer = document.getElementById('cards-container');
    const apiUrl = urlAnadirEspacio; // Usar la URL del config.js
    let currentIndex = 0;
    let cards = [];

    const updateVisibility = () => {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'flex' : 'none';
        });
    };

    if (prevButton && nextButton && cardsContainer) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
            updateVisibility();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
            updateVisibility();
        });

        // Fetch data from API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    cardsContainer.innerHTML = '<p>No hay espacios disponibles.</p>';
                    return;
                }

                data.forEach(item => {
                    const card = document.createElement('a');
                    card.href = '../indexHTML/crearReserva.html'; // Ajusta el enlace según sea necesario
                    card.classList.add('card');

                    card.innerHTML = `
                        <div class="circles c1"></div>
                        <div class="image">
                            <img src="${item.imagen_url}" alt="${item.nombre_del_espacio}">
                        </div>
                        <div class="content">
                            <h4>${item.nombre_del_espacio}</h4>
                            <h2>${item.clasificacion}</h2>
                            <h5>Capacidad: ${item.capacidad} personas</h5>
                            <p>${item.descripcion}</p>
                        </div>
                        <div class="circles c2"></div>
                    `;

                    cardsContainer.appendChild(card);
                    cards.push(card); // Almacena la tarjeta en el array
                });

                updateVisibility(); // Inicializar visibilidad
            })
            .catch(error => {
                console.error('Hubo un problema con la petición Fetch:', error);
                cardsContainer.innerHTML = '<p>Error al cargar los datos.</p>';
            });
    }

    // Lógica de notificaciones (si tienes un sistema de notificaciones)
    const notificationLink = document.querySelector('.notification__link');
    const notificationCount = document.querySelector('.notification__count');
    let notifications = 0;

    const addNotification = (message) => {
        notifications++;
        if (notificationCount) {
            notificationCount.textContent = notifications;
        }
        alert(message);
    };
});

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el token de autenticación
    localStorage.removeItem('authTokens'); 
    
    // Limpiar el historial de navegación
    history.pushState(null, null, urlRedireccionInicioSesion); // Redirige al login
    
    // Desactivar retroceso
    window.addEventListener('popstate', function (event) {
      history.pushState(null, null, urlRedireccionInicioSesion);
    });
    
    // Redirigir al inicio de sesión
    window.location.href = urlRedireccionInicioSesion;
}
