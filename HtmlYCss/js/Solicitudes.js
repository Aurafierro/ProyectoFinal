// Función para abrir el modal
function openModal() {
    document.getElementById('editModal').style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Manejo del cambio de la imagen de perfil
document.querySelector('.profile-container').addEventListener('click', function () {
    document.getElementById('profileInput').click();
});

document.getElementById('profileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profilePic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});
