// URL de la API
const apiUrl = 'http://10.192.66.24:8080/api/v1/user/';

// Función para actualizar el perfil
async function updateProfile() {
    try {
        // Hacer la solicitud a la API
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Actualizar el perfil con los datos de la API
        document.getElementById('profileName').innerHTML = `<strong>${data.name}</strong>`;
        document.getElementById('documentType').innerText = data.documentType;
        document.getElementById('documentNumber').innerText = data.documentNumber;
        document.getElementById('fullName').innerText = data.fullName;
        document.getElementById('role').innerText = data.role;
        document.getElementById('email').innerText = data.email;
        document.getElementById('phone').innerText = data.phone;
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
    }
}

// Llamar a la función para actualizar el perfil al cargar la página
window.onload = updateProfile;
