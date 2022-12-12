// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()  => {
      // Reseteamos el array
      articulosCarrito =[];

      limpiarHTML();
    })
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();


    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
    }

}

// Elimina un curso del carrito
function eliminarCurso(eve) {
  if (eve.target.classList.contains('borrar-curso')) {
    const cursoId = eve.target.getAttribute('data-id');

    // Elimina del array de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHTML();
  }
}

/* Lee el contenido del HTML al que le dimos click y extrae la inforamación del curso */
function leerDatosCurso(curso) {

    /* Crear un objeto con el contenido del curso actual */
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya exite en el carrito
    const exite = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (exite) {
      // Actualizamos la cantidad
      // const cursos = articulosCarrito.findIndex(curso => curso.id === infoCurso.id)
      // articulosCarrito[cursos].cantidad++
      const cursos = articulosCarrito.map(curso => {
        if (curso.ido === infoCurso.id) {
          curso.cantidad++;
          return curso; // Retorna el objeto actualizado
        } else {
          return curso; // Retorna los objetos que no seon los duplicados
        }
      });
      articulosCarrito = [...cursos];
    } else {
      // Agrega elementos al carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}


// Muestra el Carrito de compras en el HTML
function carritoHTML() {

  // limpiar HTML
  limpiarHTML()

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach( curso => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>
        ${titulo}
      </td>
      <td>
      ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  })
  
}


function limpiarHTML() {
  /* // Forma lenta
  contenedorCarrito.innerHTML = ''; */ 

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}
