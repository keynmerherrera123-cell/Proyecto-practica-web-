// Intentamos recuperar los datos del "disco duro" del navegador
const datosGuardados = localStorage.getItem('empleadosIndustriales');

// Si existen datos, los usamos; si no, usamos la lista inicial
let baseDeDatos = datosGuardados ? JSON.parse(datosGuardados) : [
    { nombre: "Keynmer Daniel", cedula: "28123456", cargo: "Ingeniero de Sistemas", estado: "Activo", departamento: "IT / Refinería" }
];

// 2. FUNCIÓN MAESTRA DE BÚSQUEDA
function buscarEmpleado(cedulaBuscada) {
    const monitor = document.getElementById("infoEmpleado");
    
    // Buscamos ignorando espacios y forzando texto
    const resultado = baseDeDatos.find(emp => String(emp.cedula).trim() === String(cedulaBuscada).trim());

    if (resultado) {
        monitor.innerHTML = `
            <div class="ficha-empleado">
                <h2 style="color: #4ade80;">✅ Personal Identificado</h2>
                <p><strong>Nombre:</strong> ${resultado.nombre}</p>
                <p><strong>Cargo:</strong> ${resultado.cargo}</p>
                <p><strong>Dpto:</strong> ${resultado.departamento}</p>
                <p><strong>Estatus:</strong> <span class="badge">${resultado.estado}</span></p>
            </div>
        `;
    } else {
        monitor.innerHTML = `<p style="color: #ff4d4d;">❌ Error: Registro no encontrado en el servidor.</p>`;
    }
}

// 3. ESCUCHA DEL TERMINAL (ENTER)
document.getElementById("nombreUsuario").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        buscarEmpleado(this.value);
        this.value = ""; // Limpiamos el buscador
    }
});
function registrarNuevo() {
    const nombre = document.getElementById("regNombre").value;
    const cedula = document.getElementById("regCedula").value;
    const cargo = document.getElementById("regCargo").value;

    if(nombre && cedula && cargo) {
        baseDeDatos.push({
            nombre: nombre,
            cedula: cedula,
            cargo: cargo,
            estado: "Activo",
            departamento: "General"
        });

        // 💾 ESTA LÍNEA ES LA MAGIA: Guarda la lista actualizada en el navegador
        localStorage.setItem('empleadosIndustriales', JSON.stringify(baseDeDatos));

        alert("✅ Empleado Registrado y Guardado");
        
        document.getElementById("regNombre").value = "";
        document.getElementById("regCedula").value = "";
        document.getElementById("regCargo").value = "";
    }
}