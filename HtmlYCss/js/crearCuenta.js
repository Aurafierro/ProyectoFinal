var url = "http://localhost:8080/api/v1/user/";

document.getElementById("nombre_completo").addEventListener("keypress",nombre_completo);
document.getElementById("correo").addEventListener("keypress",correo);
document.getElementById("telefono").addEventListener("keypress",soloNumeros);
document.getElementById("numero_documento").addEventListener("keypress",soloNumeros);
document.getElementById("contrasena").addEventListener("keypress",caracteresPermitidos);
document.getElementById("confirmar_contrasena").addEventListener("keypress",caracteresPermitidos);



function soloLetras(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  const letrasPermitidas=[
    //letras en minúsculas
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
    //LETRAS EN MAYÚSCULAS
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
    //letras con tildes, mayusculas y minusculas
    "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"
  ];

  if (!(letrasPermitidas.includes(event.key))){
    event.preventDefault();
    return;
  }
}
//función para que el titulo del libro permita solamente numeros y letras
function nombre_completo(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  
  const letrasPermitidas=[
    //letras en minúsculas
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
    //LETRAS EN MAYÚSCULAS
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
    //letras con tildes, mayusculas y minusculas
    "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"];

  const numeroPermitidos=[
    '1', '2', '3','4','5','6','7','8','9','0'
  ];

  if (
    !(letrasPermitidas.includes(event.key)) &&
    !(numeroPermitidos.includes(event.key))
  ){
    event.preventDefault();
    return;
  }
}


function correo(event){
    console.log("Llave presionada: "+event.key);
    console.log("Código tecla: "+event.keyCode);
    
    const letrasPermitidas=[
      //letras en minúsculas
      "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
      //LETRAS EN MAYÚSCULAS
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
      //letras con tildes, mayusculas y minusculas
      "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"
    ];
    const numeroPermitidos=[
      '1', '2', '3','4','5','6','7','8','9','0'
    ];
    const caracteresPermitidos=[
      '@','_','-','.'
    ];
  
    if (
      !(letrasPermitidas.includes(event.key)) &&
      !(numeroPermitidos.includes(event.key))&&
      !(caracteresPermitidos.includes(event.key))
    ){
      event.preventDefault();
      return;
    }
  }

  function caracteresPermitidos(event){
    console.log("Llave presionada: "+event.key);
    console.log("Código tecla: "+event.keyCode);
    
    const letrasPermitidas=[
      //letras en minúsculas
      "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
      //LETRAS EN MAYÚSCULAS
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
      //letras con tildes, mayusculas y minusculas
      "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"
    ];
    const numeroPermitidos=[
      '1', '2', '3','4','5','6','7','8','9','0'
    ];
    const caracteresPermitidos=[
      '@','_','-','.','*',','
    ];
  
    if (
      !(letrasPermitidas.includes(event.key)) &&
      !(numeroPermitidos.includes(event.key))&&
      !(caracteresPermitidos.includes(event.key))
    ){
      event.preventDefault();
      return;
    }
  }

function soloNumeros(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  
  const numeroPermitidos=[
    '1', '2', '3','4','5','6','7','8','9','0'
  ];


  if (!(numeroPermitidos.includes(event.key))){
    event.preventDefault();
    return;
  }
}


function crearCuenta() {


    let formData = {
      "tipo_documento": document.getElementById("tipo_documento").value,
      "numero_documento": document.getElementById("numero_documento").value,
      "nombre_completo": document.getElementById("nombre_completo").value,
      "telefono": document.getElementById("telefono").value,
      "correo": document.getElementById("correo").value,
      "contrasena": document.getElementById("contrasena").value,
      "confirmar_contrasena": document.getElementById("confirmar_contrasena").value,
      "rol": document.getElementById("rol").value

  
    };
  
    let camposValidos = true;
    let camposRequeridos = [
        "tipo_documento",
        "numero_documento",
        "nombre_completo",
        "telefono",
        "correo",
        "contrasena",
        "confirmar_contrasena",
        "rol"

    ];
  
    camposRequeridos.forEach(function(campo) {
        let valorCampo = document.getElementById(campo).value.trim();
        if (valorCampo === "") {
            camposValidos = false;
            return false; // Terminar la iteración si se encuentra un campo vacío
        }
    });
  
    if (camposValidos) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                limpiarFormulario();
            },
            error: function (error) {
                Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
            },
        });
  
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
  
  }
  
  //se ejecuta la peticion
  
  //valida el numero de documento
  function validarCampos() {
    var numero_documento = document.getElementById("numero_documento");
    return validarNumero_documento(numero_documento);
  }
  function validarNumero_documento(cuadroNumero) {
    /*
    isbn del libro
    min=5
    max=40
    numero entero
  
    si cumple, se cambia color a verde
    si no, se cambia a rojo
    */
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 11) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  


  }

  //valida el telefono
  function validarCampos() {
    var telefono = document.getElementById("telefono");
    return validarTelefono(telefono);
  }
  function validarTelefono(cuadroNumero) {
    /*
    min=5
    max=15
    numero entero
  
    si cumple, se cambia color a verde
    si no, se cambia a rojo
    */
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 15) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  

    
  }
  
  //Valida contra
  
  function validarCampos() {
    var contrasena = document.getElementById("contrasena");
    return validarContrasena(contrasena);
  }
  function validarContrasena(cuadroNumero) {
  
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 8 || valor.length > 16) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }

  //Valida confirmar contra
  
  function validarCampos() {
    var confirmar_contrasena = document.getElementById("confirmar_contrasena");
    return validarConfirmarContrasena(confirmar_contrasena);
  }
  function validarConfirmarContrasena(cuadroNumero) {
  
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 8 || valor.length > 16) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  //Valida el nombre completo
  function validarCampos() {
    var nombre_completo = document.getElementById("nombre_completo");
    return validarNombre_completo(nombre_completo);
  }
  function validarNombre_completo(cuadroNumero) {
    
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 2 || valor.length > 120) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  //Valida el correo
  function validarCampos() {
    var correo = document.getElementById("correo");
    return validarCorreo(correo);
  }
  function validarCorreo(cuadroNumero) {
    
    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 100) {
      valido = false
    }
  
    if (valido) {
      //cuadro de texto cumple
      cuadroNumero.className = "form-control is-valid";
    } else {
      //cuadro de texto no cumple
      cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
  
  }
  
  function limpiarFormulario() {
    document.getElementById("tipo_documento").className="form-control";
    document.getElementById("rol").className="form-control";
    document.getElementById("contrasena").className="form-control";
    document.getElementById("telefono").className="form-control";
    document.getElementById("numero_documento").className="form-control";
    document.getElementById("nombre_completo").className="form-control";
    document.getElementById("confirmar_contrasena").className="form-control";
    document.getElementById("correo_electronico").className="form-control";
  
  
    document.getElementById("tipo_documento").value = "";
    document.getElementById("rol").value = "";
    document.getElementById("contrasena").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("numero_documento").value = "";
    document.getElementById("nombre_completo").value = "";
    document.getElementById("confirmar_contrasena").value = "";
    document.getElementById("correo_electronico").value = "";
  }