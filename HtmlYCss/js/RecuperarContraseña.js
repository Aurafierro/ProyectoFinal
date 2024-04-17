document.getElementById("passwordRecoveryForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve email entered by user
    var email = document.getElementById("email").value;

    // Simulate sending email for password recovery
    // Here you can integrate with your backend to send the email
    alert("Se ha enviado un correo de recuperación a " + email);
});
