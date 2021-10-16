//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const carrito = document.getElementById("Carrito");
const precioEnvio = document.getElementById("envios");
const cart_url = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let productsList = [];
let Articles = [];
let cargarComentario = {};
/* escucha carrito y mensaje */
document.addEventListener("DOMContentLoaded", function(e){   
    cargarCarrito();

    /* escucha del mensaje de compra exitosa*/ 
   getJSONData(CART_BUY_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
    cargarComentario = resultObj.data;
    
  }
});    
});

/* fetch cargar el carrito y mostrarlos */
const cargarCarrito = async () => {
    try {
        const res = await fetch(cart_url);
        productsList = await res.json();              
       // console.log(productsList); 
        displayProduct(productsList);
        
    } catch (error) {
        console.error(error);
    }
};
/* Funcion mostrar productos, calculo de subtotal de los productos*/
/* carga en dropmenu de cantidad de productos en carrito */
function displayProduct() {
    let htmlcontent = "";
    let Articles = productsList.articles
    let total = 0;  
    let iva = 0; 
    
    for (let i = 0; i < Articles.length; i++) {
      let product = Articles[i];      
      
       if (product.currency == "USD"){   
        product.currency= product.currency.replace("USD", "UYU");
        product.unitCost = parseInt(product.unitCost*40*product.count) 
        subtotal = parseInt(product.unitCost*40*product.count)                  
       }

       subtotal = parseInt(product.unitCost*product.count)
       total += subtotal;
       htmlcontent +=   `              
      <tr class="shoppingCartItem">      
      <td>
      <div class="cart-info ">
      <img class="img-fluid img-thumbnail" src="${product.src}" alt="">      
      <p class="ItemTitle">${product.name}</p>          
      </div></td>
      <td><p class="shopping-cart-price" value="${product.unitCost}" name=preciounitario >Precio: ${product.currency} <span class="shoppingCartItemPrice">${product.unitCost}</span>     
      </td>      
      <td><input class="shoppingCartItemQuantity" type="number" onchange="quantityChanged(event)"  value="${product.count}"></td>
      <td class="totalUnitario"><p name=totalUnitario${i}>UYU <span>${subtotal}</span></p></td>
      <td> <button class="btn btn-danger "  onclick="removeCartItem(event)" type="button">X</button></td>
      </div></tr>      
       `;
      
      }  
             
     cantidad = Articles.length       
     carrito.innerHTML = htmlcontent;
     iva = (total*22)/100;
     TotalProducto = total+iva
     localStorage.setItem('cantidadCarrito', JSON.stringify(cantidad));
     document.querySelector(".ShoppingSubtotal").innerHTML = `${parseFloat(total).toFixed(2)} UYU`;
     document.querySelector(".totalModal").innerHTML = `${parseFloat(total).toFixed(2)} UYU`;
     document.querySelector(".totalIVA").innerHTML = `${iva.toFixed(2)} UYU`;
     document.querySelector(".ivaModal").innerHTML = `${iva.toFixed(2)} UYU`;
     document.querySelector(".shoppingCartTotal").innerHTML =  `${parseFloat(TotalProducto).toFixed(2)} UYU` ;
     document.querySelector(".modalCartTotal").innerHTML =  `${parseFloat(TotalProducto).toFixed(2)} UYU`  ;
     $(".shoppingCartTotal").val((TotalProducto));
     $(".modalCartTotal").val((TotalProducto))
    
};

/* Aumenta y disminuye value y precios */
function updateTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  const modalTotal = document.querySelector(".modalCartTotal");
  const shoppingSubtotal = document.querySelector(".ShoppingSubtotal");
  const shoppingIVa = document.querySelector(".totalIVA");
  const modalIva = document.querySelector(".ivaModal"); 
  const modalSubtotal = document.querySelector(".totalModal");   

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
  
    const shoppingCartItemPrice = parseFloat(shoppingCartItem.querySelector(
      '.shoppingCartItemPrice').textContent      
    );
    const shoppingCartItemQuantity = parseFloat(shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity').value
    );   
    const shoppingCartUnitNode = shoppingCartItem.querySelector('.totalUnitario'
    );
    shoppingCartUnitNode.querySelector('span').textContent = shoppingCartItemPrice * shoppingCartItemQuantity;
        
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;    
  
  });
  shoppingSubtotal.innerHTML = `${total.toFixed(2)} UYU`;
  modalSubtotal.innerHTML = `${total.toFixed(2)} UYU`;
  let iva = (total*22)/100;
  shoppingIVa.innerHTML= `${iva.toFixed(2)} UYU`;
  modalIva.innerHTML = `${iva.toFixed(2)} UYU`;
  TotalProducto = total+iva
  modalTotal.innerHTML= `${TotalProducto.toFixed(2)}UYU`;
  shoppingCartTotal.innerHTML = `${TotalProducto.toFixed(2)} UYU`;
  $(".shoppingCartTotal").val((TotalProducto));
  $(".modalCartTotal").val((TotalProducto))

};

/* Escucha selector de opcion de envio */
precioEnvio.addEventListener("click", (e) => {
    const OpcionEnvio = document.querySelector(
        `input[type="radio"][name=options]:checked`
      ).value ; 
       var monto = $(".shoppingCartTotal").text().replace("UYU", "")
       var iva = (monto*22)/100;
       var total = (parseInt(monto)+parseInt(iva))
       var envioStandar = (total*5)/100;
       var envioExpress = (total*10)/100;
       var envioPremium = (total*15)/100;
   
      if (OpcionEnvio == "1"){
         totalconEnvio= total + envioStandar;       
        $(".costoEnvio").text(parseFloat(envioStandar)+" "+"UYU")
        $(".modalCartTotal").text(parseFloat(totalconEnvio)+" "+"UYU")
        
      }  
      else if (OpcionEnvio == "2"){                   
        totalconEnvio= total + envioExpress;             
        $(".costoEnvio").text(parseFloat(envioExpress)+" "+"UYU")
        $(".modalCartTotal").text(parseFloat(totalconEnvio)+" "+"UYU")          

      }
      else if (OpcionEnvio == "3"){             
        totalconEnvio= total + envioPremium;        
        $(".costoEnvio").text(parseFloat(envioPremium)+" "+"UYU")
        $(".modalCartTotal").text(parseFloat(totalconEnvio)+" "+"UYU")
        
      }
});

/* funcion activa tooltip*/
$(document).ready(function(){
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
});

/* funcion mensaje exitoso */
function cargarMensaje(){
  let mensaje = cargarComentario.msg;
  Swal.fire({
  icon: 'success',
  title: mensaje
})
};

/* Escucha de input */
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateTotal();
};
/* Remueve item de carrito y guarda el local storage*/
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  cantidad =  document.querySelectorAll('.shoppingCartItem').length;
  localStorage.setItem('cantidadCarrito', JSON.stringify(cantidad));
  updateTotal();
};
