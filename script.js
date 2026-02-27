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

function aumentar() {
    // Lógica de datos
     jugador.puntos += jugador.multiplicador;    
    const inputNombre = document.getElementById("nombreUsuario");
    if (inputNombre.value !== "") {
        jugador.nombre = inputNombre.value;
        localStorage.setItem("usuario", jugador.nombre);
        inputNombre.value = "";
    }

    // Guardamos los puntos
    localStorage.setItem("puntos", jugador.puntos);
    // --- AQUÍ TERMINA LA FUNCIÓN AUMENTAR ---
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

// Buscamos el cuadro de texto y le asignamos el evento Enter
const inputNombreEvent = document.getElementById("nombreUsuario");

inputNombreEvent.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        aumentar();        
    }
});