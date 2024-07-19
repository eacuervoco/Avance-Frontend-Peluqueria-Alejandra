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


//inicio de codigo para cada modulo.

const myForm = document.querySelector('form');
myForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const dataForm = new FormData(event.currentTarget);
  let formDataJSON = {};
  dataForm.forEach((value, key) => {
    // Convertir service, employee y client a números si es posible
    if (key === 'service' || key === 'employee' || key === 'client') {
      formDataJSON[key] = parseInt(value);
    } else {
      formDataJSON[key] = value;
    }
  });

  // Formatear el tiempo a "00:30:00.000"
  const formattedTime = "00:30:00.000";
  formDataJSON['time'] = formattedTime;

  // Convertir el objeto a JSON
  const jsonData = JSON.stringify(formDataJSON);
  console.log(jsonData);

  // Token JWT
  const token = sessionStorage.getItem('accessToken'); // Obtener el token JWT del almacenamiento local
  fetch('http://localhost:6543/api/v1/appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Usar el token JWT del almacenamiento local
    },
    body: jsonData,
  }).then(response => {
    if (response.ok) {
      console.log('Funciona');
    } else {
      console.log('Error');
    }
  }).catch(error => console.error('Error al hacer el fetch:' + error));
});

// HABILITANDO INPUTS SECUENCIALMENTE
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const notesInput = document.getElementById('notes');
const serviceInput = document.getElementById('service');
const employeeInput = document.getElementById('employee');
const clientInput = document.getElementById('client');
const submitButton = document.getElementById('submitButton');
// Inicialmente deshabilitamos todos los inputs excepto el primero
timeInput.disabled = true;
notesInput.disabled = true;
serviceInput.disabled = true;
employeeInput.disabled = true;
clientInput.disabled = true;
submitButton.disabled = true;
// vamos habilitando uno a uno cada input conforme se vayan llenando
dateInput.addEventListener('change', () => {
  if (dateInput.value !== '') {
    timeInput.disabled = false;
  }
});

timeInput.addEventListener('change', () => {
  if (timeInput.value !== '') {
    notesInput.disabled = false;
  }
});

notesInput.addEventListener('change', () => {
  if (timeInput.value !== '') {
    serviceInput.disabled = false;
  }
});

serviceInput.addEventListener('change', () => {
  if (timeInput.value !== '') {
    employeeInput.disabled = false;
  }
});

employeeInput.addEventListener('change', () => {
  if (timeInput.value !== '') {
    clientInput.disabled = false;
  }
});

clientInput.addEventListener('change', () => {
  if (timeInput.value !== '') {
    submitButton.disabled = false;
  }
});