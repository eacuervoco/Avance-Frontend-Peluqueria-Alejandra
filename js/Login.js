


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



async function obtenerToken(userData) {
    try {
        const response = await fetch("http://localhost:6543/api/v1/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error en la respuesta del servidor');
        }
        const data = await response.json();

        sessionStorage.setItem('accessToken', data.JwtToken);

        // Decodificar el payload del token
        const payload = JSON.parse(atob(data.JwtToken.split('.')[1]));

        // Almacenar id y role en sessionStorage
        sessionStorage.setItem('userId', payload.id);
        sessionStorage.setItem('userRole', payload.role);

        window.location.href = "/citas.html";
    } catch (error) {
        console.error('Error completo:', error);
        alert('Se produjo un error: ' + error.message);
    }
}

const myForm = document.querySelector('form');
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    obtenerToken(formDataObject);
});



document.querySelector('.signup-button').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "/register.html";
});

