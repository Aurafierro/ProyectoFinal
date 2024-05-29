document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar.querySelector('input[type="text"]');
    const searchButton = searchBar.querySelector('button');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
});
