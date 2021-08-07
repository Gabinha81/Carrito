
const listaProductos = document.querySelector('.contenedorCard');
const tablaCarrito = document.querySelector("#items-carrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciar");


let carrito = [];


$('.contenedorCard').on('click', clickComprar);
//listaProductos.addEventListener('click', clickComprar);
tablaCarrito.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciar);

//Jquery Ready
$(function() {
    console.log('El DOM esta listo');
});

document.addEventListener('DOMContentLoaded', () => {

    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        insertarCarritoHTML();
    }
});

function borrarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar-producto")) {
        const eliminarProducto = e.target.parentElement.parentElement;
        const productoId = e.target.getAttribute('data-id');
        eliminarProducto.remove();

        carrito = carrito.filter(producto => producto.id !== productoId);

        guardarCarritoEnLocalStorage();
        calcularTotal();
    }
}

function vaciar(e) {
    e.preventDefault();
    carrito = [];
    guardarCarritoEnLocalStorage();
    insertarCarritoHTML();
}

function clickComprar(e) {
    e.preventDefault();

    if (e.target.classList.contains("comprar")) {
        const cardProducto = e.target.parentElement.parentElement;
        //Extrae los datos de una card que le pase
        const productoAgregado = {
            imagen: cardProducto.querySelector('img').src,
            nombre: cardProducto.querySelector('h5').textContent,
            precio: cardProducto.querySelector('.precio span').textContent,
            cantidad: 1,
            id: cardProducto.querySelector('a').getAttribute('data-id'),
        }
        addToCart(productoAgregado);
    }
}

function addToCart(productoAgregado) {
    //recorre carrito para ver si el id coincide con producto ya agregado, colocarlo en la cantidad y no repetirlo
    const existe = carrito.some(producto => producto.id === productoAgregado.id);
    if (existe) {
        const productos = carrito.map(producto => {
            if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                producto.precio = productoAgregado.precio
            } else {
                return producto;
            }
        })
    } else {
        carrito.push(productoAgregado);
    }
    guardarCarritoEnLocalStorage();
    insertarCarritoHTML();
}

function insertarCarritoHTML() {
    //No repetir carga de productos del carrito
    tablaCarrito.innerHTML = " ";


    carrito.forEach(producto => {
        const { imagen, nombre, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src ="${imagen}" width='30%'></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href ="#" class= "borrar-producto" data-id="${id}">x</a></td>
        `
        //insertar el contenido en la tabla 
        tablaCarrito.appendChild(row);
    });
    calcularTotal();
}

/* Calcula el precio total */
function calcularTotal() {
    total = 0;
    carrito.forEach((item) => {
        //console.log(item);
        total = total + (item.precio * item.cantidad);
    });
    const DOMtotal = document.querySelector('#total');
    DOMtotal.textContent = total.toFixed(2);

    
}



//Guarda lo que elegimos 

function guardarCarritoEnLocalStorage() {
    const miLocalStorage = window.localStorage;
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

//Form

document.getElementById ('Nombre').value = "Introduzca su nombre";
console.log(Nombre);

document.getElementById ('Apellido').value = "Introduzca su apellido";

document.getElementById ('email');



//Listener
/*
email.addEventListener('input', function(event){
if (email.validity.typeMisMatch){
    email.setCustomValidity("Introducta una dirección de email");

} else{
    email.setCustomValidity("");
}

})
*/

//jquery formulario

$(`.btn-info:button`).click(function(){
    $("<span>Su mensaje ha sido enviado correctamente!</span>").insertAfter("form");
  });


function guardarDatosFormulario() {
    const formLocalStorage = window.localStorage;
    formLocalStorage.setItem('carrito', JSON.stringify(carrito));
}
//$.ajax({
	// 	url: "js/productos.json",
	// 	method: "GET",
	// 	dataType: "JSON",
	// 	success: function (result, status, jqXHR) {
	// 		renderizarProductosHTML(result)
	// 		// console.log(jqXHR);
	// 	},
	// 	error: function (jqXHR, status, error) {
	// 		console.log(jqXHR);
	// 		console.log(status);
	// 		console.log(error);
	// 	}
	// });


//Ajax
$.ajax({
    //adónde vamos a hacer la petición
    url: "js/text.txt",
    method:"GET",
    dataType:"text",
    success: function (data, status, jqXHR) {
        console.log(data);
        console.log(status);
        console.log(jqXHR);


    },
    error: function (jqXHR, status, error) {
        console.log(jqXHR);
        console.log(status);
        console.log(error);


    }

})


