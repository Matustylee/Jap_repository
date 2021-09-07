//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var products = {};
var comments = [];
const ORDER_BY_DATATIME = "Fecha.";

/* Escucha carga descripcion y carusel*/
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                products = resultObj.data;
    
                let productsNameHTML  = document.getElementById("productName");                             
                let productsDescriptionHTML = document.getElementById("productsDescription");
                let soldCountHTML = document.getElementById("soldCount");
                let relatedProductsHTML = document.getElementById("relatedProducts");
                let gallery=document.getElementById("productImagesGallery");
                let productCategoryHTML = document.getElementById("productCategory");
            
                productsNameHTML.innerHTML = `${products.name} : <strong>Precio ${products.currency} ${products.cost}</strong>`;                         
                productsDescriptionHTML.innerHTML = products.description;
                soldCountHTML.innerHTML = products.soldCount+" "+"Articulos";
                relatedProductsHTML.innerHTML = products.relatedProducts;
                productCategoryHTML.innerHTML = products.category;                
                gallery.innerHTML= `<div class="carousel-item active">
                <img src="${products.images[0]}"  class="d-block w-100" alt="${products.name}">
                </div>
                <div class="carousel-item">
                <img src="${products.images[1]}" class="d-block w-100" alt="${products.name}">
                </div>
                <div class="carousel-item">
                <img src="${products.images[2]}" class="d-block w-100" alt="${products.name}">
                </div>
                <div class="carousel-item">
                <img src="${products.images[3]}" class="d-block w-100"  alt="${products.name}">
                </div>
                <div class="carousel-item">
                <img src="${products.images[4]}" class="d-block w-100" alt="${products.name}">
                </div>
                
                `
            }                             
            
        });
    });
    /*

function carrusel(){
  let gallery = "";
  
  for (let i = 1; i < products.length; i++) {
    let imagenes = products[i];

    gallery +=  `<div class="item">
    <img src="${imagenes.images}"  alt="${imagenes.name}">
    </div>`
    
  }

  document.getElementById("productImagesGallery").innerHTML = gallery;
}
carrusel();
*/
    
/* Intervalo carrusel*/


$('.carousel').carousel({
  interval: 3000
})

/* escucha carga productos*/
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          comments = resultObj.data;   
          commentsPost();
      }})
      
      
    });


/*Carga Comentarios*/
function commentsPost(){

   let HTMLcontent = "";
   for (let i = 0; i < comments.length; i++) {
     let comment = comments[i];
       
     
     HTMLcontent += ` <li class="media">
     <a href="#" class="float-left">
         <img src="img/face_icon.jpg" alt="" class="img-circle">
     </a>
     <div class="media-body">
         <span class="text-muted float-right">
             <p class="text-muted">${comment.dateTime}</p>
         </span>
         <strong class="text-success ml-2" >${comment.user}</strong>
         <p class="ml-1">
             ${comment.description}
         </p>     
                 
         <span class="stars">${comment.score}</span>       
    
         
     </div> </li>`
        
   }
   
   document.getElementById("commentConteiner").innerHTML = HTMLcontent;
  
   $('.stars').stars();
}

/* Comentar Desafio*/
function comentar(){
  let texto = document.getElementById("textAreaControl").value;
  let user = JSON.parse(localStorage.getItem("userName"));
  let fecha = new Date();
  let dia = fecha.getDay();
  let mes = fecha.getMonth();
  let año = fecha.getFullYear();
  let hora=fecha.getHours(); //hora actual
  let minuto=fecha.getMinutes(); //minuto actual
  let segundo=fecha.getSeconds(); //segundo actual   
  let score = document.querySelector(`input[type="radio"][name=rating]:checked`).value
 
 
  document.getElementById("commentConteiner").innerHTML +=  ` <li class="media">
  <a href="#" class="float-left">
      <img src="img/face_icon.jpg" alt="" class="img-circle">
  </a>
  <div class="media-body">
      <span class="text-muted float-right">
          <p class="text-muted">${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}</p>
      </span>
      <strong class="text-success ml-2" >${user}</strong>
      <p class="ml-1">
          ${texto}
      </p>      
      <span class="stars">${score}</span>
  </div> </li>`
  
  $('.stars').stars();
  
}


/*funcion mostrar score en estrellas*/
$.fn.stars = function() {
  return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};









