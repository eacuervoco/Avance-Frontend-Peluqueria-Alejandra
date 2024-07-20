// Inicialización del plugin para ocultar nav en pantallas medianas y pequeñas
document.addEventListener('DOMContentLoaded', function () {
  const sidenav = document.querySelector('.sidenav');
  M.Sidenav.init(sidenav);
});

// ACTIVAR CONTRASTE ALTO
function toggleHighContrast() {
  const elements = document.querySelectorAll("html *");
  const inputs = document.querySelectorAll(".switch input[type=checkbox]");

  inputs.forEach(input => {
    input.addEventListener("change", function () {
      const isChecked = this.checked;
      elements.forEach(element => element.classList.toggle("high-contrast", isChecked));
    });
  });
}
document.addEventListener('DOMContentLoaded', toggleHighContrast);


// FORMULARIO DE CITAS
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const dataForm = new FormData(event.currentTarget);
  let jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = key === 'service' || key === 'employee' || key === 'client' ? parseInt(value, 10) : value;
  });

  jsonData['time'] = "00:30:00.000"; // Formatear el tiempo a "00:30:00.000"

  const token = sessionStorage.getItem('accessToken'); // Obtener el token JWT del almacenamiento local

  fetch('http://localhost:6543/api/v1/appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Usar el token JWT del almacenamiento local
    },
    body: JSON.stringify(jsonData),
  })
    .then(response => response.ok ? console.log('Funciona') : console.log('Error'))
    .catch(error => console.error('Error al hacer el fetch:', error));
});

// HABILITANDO INPUTS SECUENCIALMENTE
function setupSequentialInputs(inputIds) {
  const inputs = inputIds.map(id => document.getElementById(id));

  function enableNextInput(currentIndex) {
    if (currentIndex < inputs.length - 1) {
      inputs[currentIndex + 1].disabled = false;
    }
  }

  // Inicialmente deshabilitamos todos los inputs excepto el primero
  inputs.slice(1).forEach(input => input.disabled = true);

  // Agregar event listeners a todos los inputs excepto el último
  inputs.slice(0, -1).forEach((input, index) => {
    input.addEventListener('change', () => {
      if (input.value !== '') {
        enableNextInput(index);
      }
    });
  });
}

// Uso de la función
setupSequentialInputs([
  'date',
  'time',
  'notes',
  'service',
  'employee',
  'client',
  'submitButton'
]);


// PETICIÓN GET A LA API, CUANDO CAGA LA PAGINA PARA OBTENER LOS HORARIOS DE TRABAJO HABILITADOS
const allowedDates = [];
document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = `http://localhost:6543/api/v1/workinghours/enabled`;
  const token = sessionStorage.getItem('accessToken');

  fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(response => response.json())
    .then(data => {
      const dates = data.content.map(workinghours => workinghours.startDate.split('T')[0]);

      const uniqueDates = new Set(dates); // Crea un Set con elementos únicos de 'dates'

      for (const element of uniqueDates) {
        allowedDates.push(element); // Agrega cada elemento único a 'allowedDates'
      }
      console.log(allowedDates);
    })
    .catch(error => {
      console.error('Error: ', error);
    });
});

// CONFIGURACIÓN PARA EL INPUT DE DATE
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.datepicker');

  const disableDayFn = function (data) {
    // Convertir la fecha a formato YYYY-MM-DD
    const formattedDate = data.toISOString().slice(0, 10);
    // Verificar si la fecha está en el array de fechas permitidas
    return !allowedDates.includes(formattedDate);
    /* 
        // Deshabilitar domingos y sábados
        if (date.getDay() === 0 || date.getDay() === 6) {
          return true;
        }
    
        // Deshabilitar fechas específicas (por ejemplo, 25 de diciembre)
        if (date.getMonth() === 11 && date.getDate() === 25) {
          return true;
        }
    
        // Devolver false para habilitar otras fechas
        return false; 
        */
  };
  const options = {
    autoClose: true,
    format: 'dd mmm yyyy',
    disableDayFn: disableDayFn
  };
  const instances = M.Datepicker.init(elements, options);
});

// CONFIGURACIÓN PARA EL INPUT DE TIME
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.timepicker');
  const options = {
    defaultTime: '08:00AM', // Customize additional options as needed
  };
  const instances = M.Timepicker.init(elements, options);
});