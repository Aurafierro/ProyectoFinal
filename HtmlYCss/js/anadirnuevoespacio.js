document.getElementById('agregarIcono').addEventListener('click', function() {
  document.getElementById('imagenEvento').click();
});

document.getElementById('imagenEvento').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('imagenSeleccionada').setAttribute('src', e.target.result);
    document.getElementById('imagenSeleccionada').style.display = 'block';
  }
  reader.readAsDataURL(file);
});

document.getElementById('nombreEvento').addEventListener('click', function() {
  this.placeholder = '';
});

document.getElementById('nombreEvento').addEventListener('blur', function() {
  if (this.value === '') {
    this.placeholder = 'Nombre del evento';
  }
});

document.getElementById('eventoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aquí puedes agregar la lógica para enviar los datos del formulario
  alert('Datos enviados correctamente');
});
