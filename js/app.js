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
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();


    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
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
    
    // Agrega elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el Carrito de compras en el HTML
function carritoHTML() {
  // 
  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach( curso => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        ${curso.titulo}
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
