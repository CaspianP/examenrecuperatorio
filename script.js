// Estructura de datos: un arreglo de objetos {id, nombre, telefono}
let contactos = [];

// Elementos del HTML
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");

// Dibuja la lista completa a partir del arreglo
function mostrarContactos() {
  lista.innerHTML = "";

  contactos.forEach(function (contacto) {
    const li = document.createElement("li");
    li.className = "contacto";

    const info = document.createElement("div");
    info.className = "contacto-info";

    const nombre = document.createElement("span");
    nombre.className = "contacto-nombre";
    nombre.textContent = contacto.nombre;

    const telefono = document.createElement("span");
    telefono.className = "contacto-telefono";
    telefono.textContent = contacto.telefono;

    info.appendChild(nombre);
    info.appendChild(telefono);
    li.appendChild(info);
    lista.appendChild(li);
  });

  // Mostrar el mensaje solo si no hay contactos
  mensajeVacio.style.display = contactos.length === 0 ? "block" : "none";
}

// Agrega un contacto nuevo
function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  if (nombre === "" || telefono === "") {
    return;
  }

  contactos.push({
    id: Date.now(),
    nombre: nombre,
    telefono: telefono,
  });

  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  mostrarContactos();
}

// Event listener  ← hasta aquí tenías
btnAgregar.addEventListener("click", agregarContacto);          // ← FALTABA
inputTelefono.addEventListener("keydown", (e) => {               // ← FALTABA
  if (e.key === "Enter") agregarContacto();
});
mostrarContactos();     