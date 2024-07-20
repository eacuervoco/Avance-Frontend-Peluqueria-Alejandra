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
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
        console.error('No se encontró un token de autenticación.');
        return;
    }

    fetch('http://localhost:6543/api/v1/appointment', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject('Error al obtener las citas');
        }
    })
    .then(data => {
        console.log(data); // Puedes ver los datos en la consola
        displayAppointments(data);
    })
    .catch(error => console.error('Error:', error));
});

function displayAppointments(appointments) {
    const appointmentsContainer = document.getElementById('appointments-container');
    appointmentsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos datos

    if (Array.isArray(appointments) && appointments.length > 0) {
        appointments.forEach(appointment => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.className = 'appointment';
            appointmentDiv.innerHTML = `
                <p><strong>ID:</strong> ${appointment.id}</p>
                <p><strong>Cliente:</strong> ${appointment.client}</p>
                <p><strong>Servicio:</strong> ${appointment.service}</p>
                <p><strong>Empleado:</strong> ${appointment.employee}</p>
                <p><strong>Fecha:</strong> ${appointment.date}</p>
                <p><strong>Hora:</strong> ${appointment.time}</p>
            `;
            appointmentsContainer.appendChild(appointmentDiv);
        });
    } else {
        appointmentsContainer.innerHTML = '<p>No hay citas programadas.</p>';
    }
}
