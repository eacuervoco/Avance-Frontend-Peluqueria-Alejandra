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


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío tradicional del formulario

        try {
            // Captura todos los datos del formulario
            const formData = new FormData(form);
            const formDataObject = Object.fromEntries(formData.entries());
            // Obtiene el token de sessionStorage

            // Divide los datos en dos paquetes
            const userPack = {
                email: formDataObject.email,
                password: formDataObject.password,
                confirmPassword: formDataObject.confirmPassword
            };

            
            // Realiza la petición POST para crear el usuario

            const userResponse = await fetch('http://localhost:6543/api/v1/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userPack),
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.text();
                throw new Error(errorData || 'Error en la respuesta del servidor');
            }

            const userData = await userResponse.json();

            const clientPack = {
                name: formDataObject.name,
                lastName: formDataObject.lastName,
                birthday: formDataObject.birthday,
                phone: formDataObject.phone,
                userId: userData.id
                };
            // Realiza la petición POST para crear el cliente
            const clientResponse = await fetch('http://localhost:6543/api/v1/client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientPack),
            });

            if (!clientResponse.ok) {
                const errorData = await clientResponse.text();
                throw new Error(errorData || 'Error en la respuesta del servidor');
            }

            const clientData = await clientResponse.json();

            alert('Registro realizado con éxito.'); 
            window.location.href = "/citas.html";
            
        } catch (error) {
            console.error('Error completo:', error);
            alert('Se produjo un error: ' + error.message);
        }
    });
});