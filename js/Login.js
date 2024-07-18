


// Inicialización del plugin para ocultar nav en pantallas medianas y pequeñas
document.addEventListener('DOMContentLoaded', function () {
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elem);
});

// ACTIVAR CONTRASTE ALTO
// Seleccionar los dos inputs que están dentro de los elementos con la clase switch
const inputs = document.querySelectorAll(".switch input[type=checkbox]");

// let html = document.querySelector("html");
let elements = document.querySelectorAll("html *");

for (let i = 0; i < inputs.length; i++) {
    // Capturar el evento de tipo change de los dos inputs
    inputs[i].addEventListener("change", function () {
        /// Obtener el valor de la propiedad checked que puede ser true or false
        const isChecked = inputs[i].checked;

        if (isChecked) {
            // html.classList.add("high-contrast")
            for (var j = 0; j < elements.length; j++) {
                elements[j].classList.add("high-contrast");
            }
        } else {
            // Si el checkbox no está marcado, quitar la clase .high-contrast a cada elemento
            // html.classList.remove("high-contrast")
            for (var j = 0; j < elements.length; j++) {
                elements[j].classList.remove("high-contrast");
            }
        }
    });
}



async function obtenerToken(user) {
    try {
        const response = await fetch("http://localhost:6543/api/v1/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',    
            },
            body: user
            
        });

        if (response.ok) {
            // Si la respuesta es exitosa, redirigir o mostrar un mensaje de éxito
            console.log("Login exitoso");
           window.location.href = "/citas.html"; // Redirigir al dashboard u otra página
        }

        if (!response.ok) {
            throw new Error('No se pudo obtener el token de acceso');
        }
        const data = await response.json();
        localStorage.setItem('accessToken', data.JwtToken);
    } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
    }
}

const myForm = document.querySelector('form');
myForm.addEventListener ('submit', (event) => {
  event.preventDefault();
  const dataForm = new FormData (event.currentTarget) 
  let formDataJSON = { };
  dataForm.forEach((value, key)  => {
    formDataJSON [key] = value;
  });
    
  const jsonData = JSON.stringify (formDataJSON);
  console.log (jsonData );

  obtenerToken(jsonData);


  
  setTimeout(function(){
    console.log(localStorage.getItem('accessToken'));
  },1000);

});



document.querySelector('.signup-button').addEventListener ('click', (event) => {
    event.preventDefault();
    window.location.href = "/register.html";
});

