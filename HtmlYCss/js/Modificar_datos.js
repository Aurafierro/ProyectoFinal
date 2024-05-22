document.getElementById('modifyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const documentType = document.getElementById('documentType').value;
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    console.log('Datos modificados:');
    console.log('Tipo de documento:', documentType);
    console.log('Nombre Completo:', fullName);
    console.log('Teléfono:', phone);
    console.log('Correo:', email);

    alert('Datos enviados con éxito');
    
});
