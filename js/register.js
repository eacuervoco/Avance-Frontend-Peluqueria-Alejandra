

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
//inicio de codigo para cada modulo.


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

  //const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGFkbWluLmNvbSIsImlzcyI6IkFwcCBQZWx1cXVlcsOtYSIsImlkIjoxLCJleHAiOjE3MTM5MzcxMDF9.lNXS_eZYVOvOhC_qpSDRe7VCJ-qpRaY91kxN4IqxdB0";
  
  fetch('http://localhost:6543/api/client', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${apiKey}`
    },
    body: jsonData,
  }).then(response => {
    if(response.ok) {
        console.log('Funciona');
    } else {
        console.log('Error');
    }
  }).catch(error => console.error('Error al hacer el fech:' + error));
});
