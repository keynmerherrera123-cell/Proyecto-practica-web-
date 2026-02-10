// Centralizamos la información en un objeto
let jugador = {
    nombre: localStorage.getItem("usuario") || "",
    puntos: parseInt(localStorage.getItem("puntos")) || 0,
    rango: "Novato"
};

// Función que se encarga solo de actualizar lo que el usuario ve (UI)
function actualizarInterfaz() {
    const titulo = document.getElementById("idtituloBienvena");
    const contador = document.getElementById("contador");
    const tarjeta = document.querySelector(".card"); // Asegúrate de tener esta variable
    const input = document.getElementById("nombreUsuario");

    contador.innerText = jugador.puntos;
    
    // 1. Manejo del nombre
    if (jugador.nombre !== "") {
        titulo.innerText = `Panel de ${jugador.nombre}`;
        if (input) input.style.display = "none";
    }

    // 2. Manejo de colores (ESTO ES LO QUE SE MANTENDRÁ AL REFRESCAR)
    if (jugador.puntos >= 10) {
        contador.style.color = "#fbbf24";
        contador.style.fontWeight = "bold";
    }

    if (jugador.puntos >= 20) {
        tarjeta.style.boxShadow = "0 0 30px #38bdf8";
        tarjeta.style.borderColor = "#38bdf8";
    }
}

// Llamamos a la actualización apenas carga la página
window.onload = actualizarInterfaz;
async function obtenerFrase() {
    try {
        // Nueva API de consejos/frases (más confiable)
        const respuesta = await fetch("https://api.adviceslip.com/advice");
        const datos = await respuesta.json();
        
        // Esta API devuelve los datos con una estructura diferente (datos.slip.advice)
        document.getElementById("textoFrase").innerText = `"${datos.slip.advice}"`;
        
        console.log("¡Frase nueva recibida!");
    } catch (error) {
        document.getElementById("textoFrase").innerText = "Sigue adelante, desarrollador.";
        console.error("Error al conectar:", error);
    }
}

function aumentar() {
    // Lógica de datos
    jugador.puntos++;
    
    const inputNombre = document.getElementById("nombreUsuario");
    if (inputNombre.value !== "") {
        jugador.nombre = inputNombre.value;
        localStorage.setItem("usuario", jugador.nombre);
        inputNombre.value = "";
    }

    // Guardamos los puntos
    localStorage.setItem("puntos", jugador.puntos);

    // Feedback visual y auditivo
    const sonido = document.getElementById("sonidoClic");
    if (sonido) {
        sonido.currentTime = 0;
        sonido.play();
    }

    // Refrescamos la pantalla
    actualizarInterfaz();
    // Reto: Volver a poner los efectos visuales
    if (jugador.puntos >= 10) {
        contador.style.color = "#fbbf24";
    }
    // ... (aquí termina la lógica de los colores)
    if (jugador.puntos >= 20) {
        document.querySelector(".card").style.boxShadow = "0 0 30px #38bdf8";
    }
    // Dentro de la función aumentar(), al final:
if (jugador.puntos % 5 === 0) { 
    obtenerFrase(); 
}
} // <--- ESTA LLAVE CIERRA LA FUNCIÓN AUMENTAR

function reiniciar() { // <--- AHORA ESTÁ AFUERA Y ES INDEPENDIENTE
    if (confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
        localStorage.clear();
        location.reload();
    }
}
async function obtenerFrase() {
    // Justo al principio de tu función obtenerFrase:
document.getElementById("textoFrase").innerText = "Traduciendo sabiduría...";
    try {
        // 1. Pedimos el consejo en inglés
        const respuesta = await fetch("https://api.adviceslip.com/advice");
        const datos = await respuesta.json();
        const fraseIngles = datos.slip.advice;

        // 2. ¡MAGIA! Enviamos esa frase a un traductor gratuito
        const resTraduccion = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fraseIngles)}&langpair=en|es`);
        const datosTraduccion = await resTraduccion.json();
        const fraseEspanol = datosTraduccion.responseData.translatedText;

        // 3. Mostramos el resultado en español
        document.getElementById("textoFrase").innerText = `"${fraseEspanol}"`;
        
        console.log("Traducción completada con éxito");
    } catch (error) {
        document.getElementById("textoFrase").innerText = "La persistencia es el camino al éxito.";
        console.error("Error en la conexión o traducción:", error);
    }
}