// Obtener referencias a los elementos del DOM
// Se obtiene el elemento con el ID 'ciudad' y se guarda en la variable ciudadInput
const ciudadInput = document.getElementById('ciudad');
// Se obtiene el elemento con el ID 'obtenerPronostico' y se guarda en la variable obtenerPronosticoBtn
const obtenerPronosticoBtn = document.getElementById('obtenerPronostico');
// Se obtiene el elemento con el ID 'pronostico' y se guarda en la variable pronosticoDiv
const pronosticoDiv = document.getElementById('pronostico');

// Agregar un evento click al botón "Obtener Pronóstico"
// Se agrega un evento de escucha al botón obtenerPronosticoBtn para que cuando se haga clic en él, se ejecute la función obtenerPronostico
obtenerPronosticoBtn.addEventListener('click', obtenerPronostico);

// Función para obtener el pronóstico del tiempo
function obtenerPronostico() {
    // Se obtiene el valor ingresado en el campo de entrada ciudadInput y se elimina los espacios en blanco al inicio y al final
    const ciudad = ciudadInput.value.trim();
    
    // Verificar si se ingresó una ciudad
    // Si el valor de ciudad es una cadena vacía, se muestra un mensaje de error y se sale de la función
    if (ciudad === '') {
        mostrarError('Por favor, ingresa una ciudad');
        return;
    }
    
    // Realizar la solicitud a la API de OpenWeather
    const apiKey = 'a2b3b130836df2b29363946fccb90e93'; // Reemplaza con tu propia API key
    // Se construye la URL para hacer la solicitud a la API de OpenWeather, incluyendo la ciudad, la API key, las unidades métricas y el idioma español
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    
    // Se realiza una solicitud HTTP utilizando fetch a la URL construida
    fetch(url)
        // Se convierte la respuesta recibida a formato JSON
        .then(response => response.json())
        .then(data => {
            // Si la solicitud es exitosa y se reciben los datos, se muestra el pronóstico en el DOM llamando a la función mostrarPronostico
            mostrarPronostico(data);
        })
        .catch(error => {
            // Si ocurre un error durante la solicitud, se muestra un mensaje de error llamando a la función mostrarError
            mostrarError('Error al obtener el pronóstico. Por favor, intenta nuevamente.');
        });
}

// Función para mostrar el pronóstico en el DOM
function mostrarPronostico(data) {
    // Se extraen las propiedades name, main y weather de los datos recibidos
    const { name, main, weather } = data;
    // Se obtiene la temperatura de main.temp
    const temperatura = main.temp;
    // Se obtiene la sensación térmica de main.feels_like
    const sensacion = main.feels_like;
    // Se obtiene la humedad de main.humidity
    const humedad = main.humidity;
    // Se obtiene la descripción del clima de weather[0].description
    const descripcion = weather[0].description;
    
    // Se imprime en la consola los datos recibidos para fines de depuración
    console.log(data);
    
    // Se crea una cadena HTML con los datos del pronóstico
    const pronosticoHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}°C</p>
                <p class="card-text">Sensación de: ${sensacion}°C</p>
                <p class="card-text">Humedad de un: ${humedad}%</p>
                <p class="card-text">Descripción: ${descripcion}</p>
            </div>
        </div>
    `;
    
    // Se inserta el HTML generado en el elemento pronosticoDiv
    pronosticoDiv.innerHTML = pronosticoHTML;
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    // Se crea una cadena HTML con el mensaje de error
    const errorHTML = `
        <div class="alert alert-danger" role="alert">
            ${mensaje}
        </div>
    `;
    
    // Se inserta el HTML generado en el elemento pronosticoDiv
    pronosticoDiv.innerHTML = errorHTML;
}