document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cardsContainer = document.getElementById('cards-container');
    const apiUrl = 'http://localhost:8080/api/v1/espacio/'; // Cambia esto por la URL de tu API
    let currentIndex = 0;
    let cards = [];

    const updateVisibility = () => {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'flex' : 'none';
        });
    };

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
                        <img src="${item.imagen}" alt="${item.nombre_del_espacio}">
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

    // Lógica de notificaciones
    const notificationLink = document.querySelector('.notification__link');
    const notificationCount = document.querySelector('.notification__count');
    let notifications = 0;

    const addNotification = (message) => {
        notifications++;
        notificationCount.textContent = notifications;
        alert(message);
    };

    // Simulación de burbujas
    const numBubbles = 30; // Número de burbujas
    const bubblesContainer = document.querySelector('.bubbles-container');

    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = `${Math.random() * 20}px`; // Tamaño aleatorio
        bubble.style.height = bubble.style.width;
        bubble.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
        bubble.style.animationDuration = `${Math.random() * 6 + 5}s`; // Duración aleatoria de la animación
        bubble.style.bottom = `${-Math.random() * 100}%`; // Posición inicial aleatoria en la pantalla
        bubblesContainer.appendChild(bubble);
    }
});
