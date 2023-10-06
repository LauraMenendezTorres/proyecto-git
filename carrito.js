
const dbUnasVenta = [
    { id: 1, nombre: "Brillos para uñas", precio: 1000, cantidad: 1000 },
    { id: 2, nombre: "Esmalte fluor", precio: 500, cantidad: 1000 },
    { id: 3, nombre: "Kit de manicura 1", precio: 5200, cantidad: 1000 },
    { id: 4, nombre: "Esmalte", precio: 600, cantidad: 1000 },
    { id: 5, nombre: "Kit de manicura 2", precio: 6000, cantidad: 1000 },
    { id: 6, nombre: "Kit de manicura 3", precio: 6200, cantidad: 1000 },
    { id: 7, nombre: "Esmalte 2", precio: 700, cantidad: 1000 },
];

const carrito = []

const btnCerrarCarrito = document.querySelector(".btnCerrarCarrito");
const btnPagar = document.querySelector(".btnPagar");
const totalElement = document.getElementById("total");

function actualizarCarrito() {
    const carritoItems = document.querySelector(".carrito-items");
    carritoItems.innerHTML = "";
    let total = 0;
    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        carritoItems.innerHTML += `
        <div class="carrito-item">
            <span class="carrito-item-nombre">${producto.nombre}</span>
            <span class="carrito-item-precio">$${producto.precio}</span>
            <span class="carrito-item-cantidad">${producto.cantidad}</span>
            <span class="carrito-item-subtotal">$${subtotal.toFixed(2)}</span>
            <button class="btn btn-danger btnEliminar" data-id="${producto.id}">Eliminar</button>
        </div>
        `;
    });
    totalElement.textContent = total.toFixed(2);
}

function agregarAlCarrito(id) {
    const productoExistente = carrito.find((producto) => producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = dbUnasVenta.find((producto) => producto.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    const productoIndex = carrito.findIndex((producto) => producto.id === id);

    if (productoIndex !== -1) {
        carrito.splice(productoIndex, 1);
        guardarCarrito();
        actualizarCarrito();
    }
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarrito();
    }
}

function mostrarCarrito() {
    document.querySelector(".carrito-contenedor").classList.add("carrito-visible");
}

cargarCarrito();

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        agregarAlCarrito(id);
    }

    if (e.target.classList.contains("btnEliminar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        eliminarDelCarrito(id);
    }
});

btnCerrarCarrito.addEventListener("click", () => {
    document.querySelector(".carrito-contenedor").classList.remove("carrito-visible");
});

btnPagar.addEventListener("click", () => {
    alert("¡Gracias por tu compra! El total a pagar es $" + totalElement.textContent);
    carrito.length = 0;
    guardarCarrito();
    actualizarCarrito();
});
