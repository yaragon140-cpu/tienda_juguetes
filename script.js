const API = "http://localhost:3000";

// VER TODOS
async function cargarTodos() {
    const res = await fetch(`${API}/juguetes`);
    const datos = await res.json();
    renderizar(datos);
}

// GUARDAR
async function guardar() {
    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;

    if (!nombre || !precio) {
        alert("Completa todos los campos");
        return;
    }

    await fetch(`${API}/guardar`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nombre, categoria, precio })
    });

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";

    cargarTodos();
}

// BUSCAR
async function buscar() {
    const texto = document.getElementById("input-buscar").value;

    if (!texto) return;

    const res = await fetch(`${API}/buscar/${texto}`);
    const datos = await res.json();

    renderizar(datos);
}

// ELIMINAR
async function eliminar(id) {
    await fetch(`${API}/eliminar/${id}`, { method: "DELETE" });
    cargarTodos();
}

// ACTUALIZAR
async function actualizar(id) {
    const nombre = prompt("Nuevo nombre:");
    const categoria = prompt("Nueva categoria:");
    const precio = prompt("Nuevo precio:");

    if (!nombre || !precio) return;

    await fetch(`${API}/actualizar/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nombre, categoria, precio })
    });

    cargarTodos();
}

// RENDER
function renderizar(lista) {
    const contenedor = document.getElementById("contenedor-juguetes");
    contenedor.innerHTML = "";

    if (!lista.length) {
        contenedor.innerHTML = "<p>No hay juguetes</p>";
        return;
    }

    lista.forEach(j => {
        contenedor.innerHTML += `
            <div class="card">
                <h3>${j.nombre}</h3>
                <p>${j.categoria}</p>
                <p>$${j.precio}</p>

                <button onclick="eliminar('${j._id}')">Eliminar</button>
                <button onclick="actualizar('${j._id}')">Actualizar</button>
            </div>
        `;
    });
}

// INICIO
cargarTodos();