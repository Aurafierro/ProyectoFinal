$(document).ready(function () {
    // Seleccionar el botón de enviar
    $('#btnEnviar').on('click', function (event) {
        event.preventDefault(); // Prevenir que el formulario se recargue

        // Obtener el valor del campo de correo electrónico
        var email = $('#emailInput').val();

        // Validar que el correo no esté vacío
        if (!email || email.trim() === '') {
            Swal.fire('Error', 'El campo de correo electrónico es obligatorio.', 'error');
            return;
        }

        // Validar que el correo tenga un formato válido
        if (!isValidEmail(email)) {
            Swal.fire('Error', 'Introduce un correo electrónico válido.', 'error');
            return;
        }

        // Hacer la solicitud AJAX para enviar el correo de recuperación
        $.ajax({
            url: urlRecuperarContrasena, // Usamos la URL global definida para recuperar contraseña
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: email }), // Enviar el correo en el cuerpo de la petición
            success: function (response) {
                Swal.fire({
                    title: 'Correo enviado',
                    text: response.message, // Mostrar el mensaje de éxito devuelto por el servidor
                    icon: 'success'
                });
            },
            error: function (xhr, status, error) {
                // Si la respuesta tiene un mensaje de error, lo mostramos
                let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : 'Error al enviar el correo';
                Swal.fire('Error', errorMessage, 'error');
            }
        });
    });

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
        // Expresión regular simple para validar correos electrónicos
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
});
