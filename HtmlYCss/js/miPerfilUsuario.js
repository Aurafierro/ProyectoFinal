// URL de la API
const apiUrl = 'http://10.192.66.28:8080/api/v1/user/1e59f2f6-bd97-41b1-9830-f1bc270ab955';

// Función para actualizar el perfil
async function updateProfile() {
    try {
        // Hacer la solicitud a la API
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Actualizar el perfil con los datos de la API
        document.getElementById('nombre_completo').innerHTML = `<strong>${data.nombre_completo}</strong>`;
        document.getElementById('tipo_documento').innerText = data.tipo_documento;
        document.getElementById('numero_documento').innerText = data.numero_documento;
        document.getElementById('nombre_completo').innerText = data.nombre_completo;
        document.getElementById('rol').innerText = data.rol;
        document.getElementById('correo').innerText = data.correo;
        document.getElementById('telefono').innerText = data.telefono;
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
    }
}

// Llamar a la función para actualizar el perfil al cargar la página
window.onload = updateProfile;
