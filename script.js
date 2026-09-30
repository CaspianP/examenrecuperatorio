// Estructura de datos: un arreglo de objetos {id, nombre, telefono}
let contactos = [];

// Elementos del HTML
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const inputBuscador = document.getElementById("buscador");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");
const spanContador = document.getElementById("contador");

// Dibuja la lista a partir del arreglo, aplicando el filtro de búsqueda
function mostrarContactos() {
  lista.innerHTML = "";

  // Texto de búsqueda en minúsculas, sin espacios en los extremos
  const textoBusqueda = inputBuscador.value.trim().toLowerCase();

  // Contactos que se van a mostrar (no modifica el arreglo original)
  const contactosFiltrados = contactos.filter(function (contacto) {
    return contacto.nombre.toLowerCase().includes(textoBusqueda);
  });

  contactosFiltrados.forEach(function (contacto) {
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

    // Botón eliminar (uno por cada contacto)
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", function () {
      eliminarContacto(contacto.id);
    });

    info.appendChild(nombre);
    info.appendChild(telefono);
    li.appendChild(info);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  // Mensaje cuando no hay nada que mostrar
  if (contactos.length === 0) {
    mensajeVacio.textContent = "Todavía no agregaste contactos.";
    mensajeVacio.style.display = "block";
  } else if (contactosFiltrados.length === 0) {
    mensajeVacio.textContent = "No se encontraron contactos.";
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }

  // Contador: siempre el total real, NO los filtrados
  spanContador.textContent = contactos.length;
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

// Elimina el contacto que tenga ese id
function eliminarContacto(id) {
  contactos = contactos.filter(function (contacto) {
    return contacto.id !== id;
  });

  mostrarContactos();
}

// Event listeners
btnAgregar.addEventListener("click", agregarContacto);
inputTelefono.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarContacto();
});
inputBuscador.addEventListener("input", mostrarContactos);

mostrarContactos();