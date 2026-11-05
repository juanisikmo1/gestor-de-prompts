
 // Obtener elementos HTML
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-prompts");
const contador = document.getElementById("contador");

// Cargar prompts guardados
let prompts = JSON.parse(localStorage.getItem("prompts")) || [];

// Guardar un nuevo prompt
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nuevoPrompt = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        categoria: document.getElementById("categoria").value,
        contenido: document.getElementById("contenido").value
    };

    prompts.push(nuevoPrompt);

    guardarDatos();
    mostrarPrompts();

    formulario.reset();

    alert("Prompt guardado correctamente");

});

// Guardar datos
function guardarDatos() {

    localStorage.setItem("prompts", JSON.stringify(prompts));

}

// Mostrar prompts
function mostrarPrompts() {

    lista.innerHTML = "";

    contador.textContent = prompts.length;

    if (prompts.length === 0) {

        lista.innerHTML = '<p class="vacio">Todavía no tienes prompts guardados.</p>';

        return;
    }

    prompts.forEach(function(prompt) {

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta";
        etiqueta.textContent = prompt.categoria;

        const titulo = document.createElement("h3");
        titulo.textContent = prompt.titulo;

        const contenido = document.createElement("p");
        contenido.textContent = prompt.contenido;

        const acciones = document.createElement("div");
        acciones.className = "acciones";

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn-eliminar";

        botonEliminar.addEventListener("click", function() {

            prompts = prompts.filter(function(p) {
                return p.id !== prompt.id;
            });

            guardarDatos();
            mostrarPrompts();

        });

        acciones.appendChild(botonEliminar);

        tarjeta.appendChild(etiqueta);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(contenido);
        tarjeta.appendChild(acciones);

        lista.appendChild(tarjeta);

    });

}

// Mostrar los datos al iniciar
mostrarPrompts();