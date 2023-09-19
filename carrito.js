const dbUnasVenta =  [
    {id: 1, nombre: "Brillos para uñas", precio: 1000, cantidad: 1000},
    {id: 2, nombre: "Esmalte fluor", precio: 500, cantidad: 1000},
    {id: 3, nombre: "Kit de manicura 1", precio: 5200, cantidad: 1000},
    {id: 4, nombre: "Esmalte", precio: 600, cantidad: 1000},
    {id: 5, nombre: "Kit de manicura 2", precio: 6000, cantidad: 1000},
    {id: 6, nombre: "Kit de manicura 3", precio: 6200, cantidad: 1000},
    {id: 7, nombre: "Esmalte 2", precio: 700, cantidad: 1000},
];

const carrito = []

const unasVenta = document.querySelector (".unas-venta__contenedor");
function crearTemplate (){
    unasVenta.innerHTML = "" ;
    dbUnasVenta.forEach((producto) => {
        const {id, nombre, precio} = producto
        unasVenta.innerHTML += `
        <section class="unas-venta__contenedor">
        <h3 class="unas-venta__nombre">${nombre}</h3>
        <span class="unas-venta__precio">Precio: $${precio}</span>
        <button id= "${id}" class="btnAgregar"><i class="fa-solid fa-cart-shopping"></i></button>
        </section>
        `
    })
}

crearTemplate ()

document.addEventListener ("click", (e) => {
    const btnAgregar = document.querySelectorAll (".btnAgregar")
    btnAgregar.forEach((btn) => {
        if (e.target == btn) {
            const id = parseInt (e.target.id)
            const producto = dbUnasVenta.map ((producto) => producto.id).indexOf (id)
            agregarAlCarrito(producto)
        }
        })
    })

function agregarAlCarrito (indice){
    const productoBuscar = carrito.find((productoCarrito) => productoCarrito.id === productoCarrito)
    if (productoBuscar) {
        productoBuscar.cantidad++
    }else{
        carrito.push ({
            ...nombre,
            cantidad: 1,
        })
    }
    console.log (carrito)
}

