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
    
    for (let i = 0; i < Articles.length; i++) {
      let product = Articles[i];
      
       if (product.currency == "USD"){   
           let subtotal = parseInt(product.unitCost*40*product.count)   
           total += subtotal        
      htmlcontent +=   ` 
             
      <tr class="shoppingCartItem">
      
      <td>
      <div class="cart-info ">
      <img class="img-fluid img-thumbnail" src="${product.src}" alt="">
      <div>
      <p class="ItemTitle">${product.name}</p><br>
      <a href="#">Remove</a>
      </div>
      </div></td>
      <td><p class="shopping-cart-price" value="${product.unitCost*40}" name=preciounitario >Precio: UYU <span class="shoppingCartItemPrice">${product.unitCost*40}</span>
     
     </td>
      
      <td><input class="shoppingCartItemQuantity" type="number"  onchange="quantityChanged(event)" value="${product.count}"></td>
      <td class="totalUnitario"><p name=totalUnitario${i}>UYU <span>${subtotal}</span></p>
      </div></tr>
      
       `;
       
      } 
      else {
        let subtotal = parseInt(product.unitCost*product.count)
        total += subtotal

        htmlcontent +=   `      
        <tr class="shoppingCartItem">
        
        <td>
        <div class="cart-info">
        <img class="img-fluid img-thumbnail" src="${product.src}" alt="">
        <div>
        <p class="ItemTitle">${product.name}</p><br>
        <a href="#">Remove</a>        
        </div>
        </div></td>
        <td><p class="shopping-cart-price" value="${product.unitCost}" name=preciounitario >Precio: ${product.currency} <span class="shoppingCartItemPrice">${product.unitCost}</span>
        
        </td>
        
        </div>       
        
        <td><input class="shoppingCartItemQuantity" onchange="quantityChanged(event)"  type="number"  ; value="${product.count}"></td>
        <td class="totalUnitario"><p name=totalUnitario${i}>UYU <span>${subtotal}</span></p>
        </div></tr>
        
         `;
      }
         
     };    
      
     cantidad = Articles.length       
     carrito.innerHTML = htmlcontent;
     let iva = (total*22)/100;
     TotalProducto = total+iva
     localStorage.setItem('cantidadCarrito', JSON.stringify(cantidad));
     document.querySelector(".ShoppingSubtotal").innerHTML = `${parseInt(total)} UYU`;
     document.querySelector(".totalModal").innerHTML = `${parseInt(total)} UYU`;
     document.querySelector(".totalIVA").innerHTML = `${parseInt(iva)} UYU`;
     document.querySelector(".ivaModal").innerHTML = `${parseInt(iva)} UYU`;
     document.querySelector(".shoppingCartTotal").innerHTML =  `${parseInt(TotalProducto)} UYU` ;
     document.querySelector(".modalCartTotal").innerHTML =  `${parseInt(TotalProducto)} UYU`  ;
     $(".shoppingCartTotal").val((TotalProducto));
     $(".modalCartTotal").val((TotalProducto))
    
    
    
     
    
};

/* Aumenta y disminuye value y precios */
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  const modalTotal = document.querySelector(".modalCartTotal");
  const shoppingSubtotal = document.querySelector(".ShoppingSubtotal");
  const shoppingIVa = document.querySelector(".totalIVA");
  const modalIva = document.querySelector(".ivaModal"); 
  const modalSubtotal = document.querySelector(".totalModal");   

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceNode = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceNode.textContent
    );
    const shoppingCartItemQuantityNode= shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityNode.value
      
    );
    const shoppingCartUnitNode = shoppingCartItem.querySelector('.totalUnitario');
    shoppingCartUnitNode.querySelector('span').textContent = shoppingCartItemPrice * shoppingCartItemQuantity;
    
    
    
    
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    
  
  });
  shoppingSubtotal.innerHTML = `${total.toFixed(2)} UYU`;
  modalSubtotal.innerHTML = `${total.toFixed(2)} UYU`;
  let iva = (total*22)/100;
  shoppingIVa.innerHTML= `${iva.toFixed(2)} UYU`;
  modalIva.innerHTML = `${iva.toFixed(2)}UYU`;
  TotalProducto = total+iva
  modalTotal.innerHTML= `${TotalProducto.toFixed(2)}UYU`;
  shoppingCartTotal.innerHTML = `${TotalProducto.toFixed(2)} UYU`;
  $(".shoppingCartTotal").val((TotalProducto));
  $(".modalCartTotal").val((TotalProducto))

}




/* Escucha selector de opcion de envio */
precioEnvio.addEventListener("click", (e) => {
    const OpcionEnvio = document.querySelector(
        `input[type="radio"][name=options]:checked`
      ).value ; 
       var monto = $(".modalCartTotal").textContent();
       var iva = (monto*22)/100;
       var total = (parseInt(monto)+parseInt(iva))
       var envioStandar = (total*5)/100;
       var envioExpress = (total*10)/100;
       var envioPremium = (total*15)/100;
   
      if (OpcionEnvio == "1"){
        
        totalconEnvio= total + envioStandar;
        
        $(".modalCartTotal").val(parseInt(totalconEnvio));
        $(".modalCartTotal").text("UYU"+" "+(totalconEnvio))
        $(".modalCartTotal").val(parseInt(0));
      }  
      else if (OpcionEnvio == "2"){ 
                  
        totalconEnvio= total + envioExpress; 
            
        $(".modalCartTotal").val(parseInt(totalconEnvio));
        $(".modalCartTotal").text("UYU"+" "+(totalconEnvio))
        

      }
      else if (OpcionEnvio == "3"){  
           
        totalconEnvio= total + envioPremium;
        
        $(".modalCartTotal").val(parseInt(totalconEnvio));
        $(".modalCartTotal").text("UYU"+" "+(totalconEnvio));
        

      }


    
});

/* funcion activa tooltip*/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


/* funcion mensaje exitoso */
function cargarMensaje(){
  let mensaje = cargarComentario.msg;
Swal.fire({
  icon: 'success',
  title: mensaje
}  
)
}
/* Escucha de input */
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}
