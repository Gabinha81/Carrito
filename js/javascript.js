const listaProductos = document.querySelector('.contenedorCard');
const tablaCarrito = document.querySelector("#items-carrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciar");

let carrito = [];

$('.contenedorCard').on('click', clickComprar);
//listaProductos.addEventListener('click', clickComprar);
tablaCarrito.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciar);

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
        
        //calcularTotal();
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
        const total = precio * cantidad; 
        row.innerHTML = `
        <td>
        <img src ="${imagen}" width='30%'></td>
        <td>${nombre}</td>
        <td class="product-price">${precio}</td>
        <td class="product-quantity"><input type="number" value="${cantidad}"></td>   
        <td><a href ="#" class= "borrar-producto" data-id="${id}">x</a></td>
        <td><p class="text-right"><label class="product-line-price">${total}</label></p></td>
        `
        tablaCarrito.appendChild(row);  
    });
        
    /* TOTAL FINAL DE LA COMPRA */
    var totalFinal = 0;
    $('#items-carrito tbody tr').each(function () {
        var price = $(this).find(".product-line-price").text();
        totalFinal = totalFinal + parseFloat(price);
    });
    $('#spTotal').text(totalFinal);
}

 //Jquery Ready
$(function() {
    console.log('El DOM esta listo');

    /*FUNCION PARA SUMAR o restar segun CANTIDAD */
    $('.product-quantity input').change( function() {

        console.log("click en cantidad");

        const product_row = $(this).parent().parent();
        const quantity = $(this).val();
        const price = $(product_row).find('.product-price').text();
        const total = quantity * price;
        $(product_row).find('.product-line-price').text(total);

        console.log("quantity:"+quantity);
        console.log("price:"+price);
			
       /* TOTAL FINAL DE LA COMPRA */
        var totalFinal = 0;
        $('#items-carrito tbody tr').each(function () {
            var price = $(this).find(".product-line-price").text();
            totalFinal = totalFinal + parseFloat(price);
        });
        $('#spTotal').text(totalFinal);
       
    });
});

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

//jquery formulario
$(`.btn-info:button`).click(function(){
    $("<span>Su mensaje ha sido enviado correctamente!</span>").insertAfter("form");
  });

function guardarDatosFormulario() {
    const formLocalStorage = window.localStorage;
    formLocalStorage.setItem('carrito', JSON.stringify(carrito));
}


//jquery efectos


$("form")
        .slideUp(2000)
        .slideDown(2000);


$("h1") .hide()
        .show(1000);


$('section#services').animate({
    opacity: 1,
    height: "toggle"
} , 1500)
    .show(1500);
  

  $("#services").click(function(){
        $(this).hide();
      });

 
           
