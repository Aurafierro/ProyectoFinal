document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;

    const updateVisibility = () => {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'flex' : 'none';
        });
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }
        updateVisibility();
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateVisibility();
    });

    updateVisibility(); // Inicializar visibilidad

    // Lógica de notificaciones
    const notificationLink = document.querySelector('.notification__link');
    const notificationCount = document.querySelector('.notification__count');
    let notifications = 0;

    // Función para simular la llegada de una nueva notificación
    const addNotification = (message) => {
        notifications++;
        notificationCount.textContent = notifications;
        alert(message);
    };

   

    simulateReservation();
    document.addEventListener('DOMContentLoaded', function() {
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

});
