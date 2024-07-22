document.addEventListener('DOMContentLoaded', function () {
    const elem = document.querySelector('.sidenav');
    M.Sidenav.init(elem);
});

const inputs = document.querySelectorAll(".switch input[type=checkbox]");
const elements = document.querySelectorAll("html *");

inputs.forEach(input => {
    input.addEventListener("change", function () {
        const isChecked = input.checked;

        elements.forEach(element => {
            if (isChecked) {
                element.classList.add("high-contrast");
            } else {
                element.classList.remove("high-contrast");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetchWorkingHours();
});

async function fetchWorkingHours() {
    try {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch("http://localhost:6543/api/v1/workinghours", {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error en la respuesta del servidor');
        }
        const data = await response.json();

        displayWorkingHours(data.content);
    } catch (error) {
        console.error('Error completo:', error);
        alert('Se produjo un error: ' + error.message);
    }
}

function displayWorkingHours(data) {
    const tbody = document.querySelector('tbody');
    // Asegurarse de que data siempre sea un array para manejarlo de forma uniforme
    if (!Array.isArray(data)) {
        data = [data];
    }

    data.forEach(item => {
        const { startDate, endDate } = item;
        const initialDate = startDate.split("T")[0];
        const initialTime = startDate.split("T")[1];
        const finalDate = endDate.split("T")[0];
        const finalTime = endDate.split("T")[1];

        const newRow = document.createElement('tr');

        const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const startDateObj = new Date(initialDate);
        const dayOfWeek = weekDays[startDateObj.getDay()];

        newRow.innerHTML = `
            <td>${dayOfWeek}</td>
            <td>${initialDate}</td>
            <td>${convertTo12Hour(initialTime)}</td>
            <td>${finalDate}</td>
            <td>${convertTo12Hour(finalTime)}</td>
        `;

        tbody.appendChild(newRow);
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const initialDate = document.getElementById('initialDate').value;
    const initialTime = convertTo24Hour(document.getElementById('initialTime').value);
    const finalDate = document.getElementById('finalDate').value;
    const finalTime = convertTo24Hour(document.getElementById('finalTime').value);

    const jsonData = {
        startDate: `${initialDate}T${initialTime}`,
        endDate: `${finalDate}T${finalTime}`,
        employeeId: 2
    };

    try {
        const token = sessionStorage.getItem('accessToken');

        const response = await fetch("http://localhost:6543/api/v1/workinghours", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error en la respuesta del servidor');
        }

        const data = await response.json();

        displayWorkingHours(data);
    } catch (error) {
        console.error('Error completo:', error);
        alert('Se produjo un error: ' + error.message);
    }
})


// CONFIGURACIÓN PARA EL INPUT DE DATE
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.datepicker');

    const options = {
        autoClose: true,
        format: 'yyyy-mm-dd'
    };
    const instances = M.Datepicker.init(elements, options);
});

// CONFIGURACIÓN PARA EL INPUT DE TIME
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.timepicker');
    const options = {
        defaultTime: '08:00',
        format: 'HH:mm'
    };
    const instances = M.Timepicker.init(elements, options);
});

// Función para convertir hora de formato 12 horas a formato 24 horas
function convertTo24Hour(time) {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

function convertTo12Hour(time) {
    const [hours, minutes] = time.split(':');
    let period = 'AM';
    let formattedHours = parseInt(hours);

    if (formattedHours >= 12) {
        period = 'PM';
        if (formattedHours > 12) {
            formattedHours -= 12;
        }
    }

    return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${period}`;
}
