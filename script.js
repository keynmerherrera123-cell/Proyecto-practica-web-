// Centralizamos la información en un objeto
let jugador = {
    nombre: localStorage.getItem("usuario") || "",
    puntos: parseInt(localStorage.getItem("puntos")) || 0,
    rango: "Novato",
    multiplicador: 1 
};
const inputNombreGlobal = document.getElementById("nombreUsuario");
// Función que se encarga solo de actualizar lo que el usuario ve (UI)
function actualizarInterfaz() {
    const titulo = document.getElementById("idtituloBienvena");
    const contador = document.getElementById("contador");
    const tarjeta = document.querySelector(".card"); // Asegúrate de tener esta variable
    const input = document.getElementById("nombreUsuario");

    contador.innerText = jugador.puntos;
    document.getElementById("puntosPorClic").innerText = jugador.multiplicador;
    
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

function accederAlPanel() {
    const inputNombre = document.getElementById("nombreUsuario");
    
    if (inputNombre.value !== "") {
        jugador.nombre = inputNombre.value;
        localStorage.setItem("usuario", jugador.nombre);
        
        actualizarInterfaz();
        inputNombre.value = ""; // Limpiamos el cuadro
    }
}

function aumentar() {
    // Solo suma puntos si el jugador ya se registró
    if (jugador.nombre !== "") {
        jugador.puntos += jugador.multiplicador;
        localStorage.setItem("puntos", jugador.puntos);
        actualizarInterfaz();
    } else {
        alert("Escribe tu nombre y presiona Enter para empezar.");
    }
}

function comprarMejora() {
    if (jugador.puntos >= 10) {
        jugador.puntos -= 10;
        jugador.multiplicador += 1;
        actualizarInterfaz();
        alert("¡Poder aumentado!");
    } else {
        alert("Te faltan puntos...");
    }
}

// Vinculamos el botón naranja
document.getElementById("btnMejora").onclick = comprarMejora;

const inputNombreEvent = document.getElementById("nombreUsuario");

inputNombreEvent.addEventListener("keypress", function (e) {
    // Solo actúa si presionas Enter Y si el jugador aún NO tiene nombre
    if (e.key === 'Enter' && jugador.nombre === "") {
        e.preventDefault(); 
        accederAlPanel();
    } else if (e.key === 'Enter') {
        // Si ya tiene nombre, evitamos que el Enter haga cualquier cosa
        e.preventDefault();
    }
});