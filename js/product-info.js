var products = {};
var comments = [];
var productsList = [];
const ORDER_BY_DATATIME =
  "Fecha."; /*probando para ordenar por fecha comentarios*/

/* Escucha carga descripcion y carusel*/
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      products = resultObj.data;
      let productsNameHTML = document.getElementById("productName");
      let productsDescriptionHTML = document.getElementById(
        "productsDescription"
      );
      let soldCountHTML = document.getElementById("soldCount");
      let productCategoryHTML = document.getElementById("productCategory");

      productsNameHTML.innerHTML = `${products.name} : <strong>Precio ${products.currency} ${products.cost}</strong>`;
      productsDescriptionHTML.innerHTML = products.description;
      soldCountHTML.innerHTML = products.soldCount + " " + "Articulos";
      productCategoryHTML.innerHTML = `<a href= "../jap_repository/products.html">${products.category}</a>`;
      Imgcarusel(products.images);
    }
  });
  //escucha carga productos relacionados
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsList = resultObj.data;
      //console.log(productsList)
      let htmlContentToAppend = "";
      let relacionados = products["relatedProducts"];
      for (let i = 0; i < relacionados.length; i++) {
        let related = relacionados[i];
        let producto = productsList[related];

        htmlContentToAppend += `    
                         <div class="col-sm-6">               
                         <div class="card">
                         <a class="card-header" href= "../jap_repository/products.html" >${producto.name}</a> 
                         <div class="card-body">
                         <img class="img-fluid img-thumbnail" src="${producto.imgSrc}" alt="">
                         <p class="card-text class-muted">${producto.description}</p>
                         <h3 class="text-center"><strong>${producto.currency}${producto.cost}</strong></h3>
                         </div>
                         </div>
                         </div> `;
      }
      document.getElementById("relatedProducts").innerHTML =
        htmlContentToAppend;
    }
  });
  /* escucha carga comentarios*/
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comments = resultObj.data;
      commentsPost();
    }
  });
});

//Agrego imagenes a carrusel
function Imgcarusel(array) {
  let HTMLcontent = "";
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    HTMLcontent += `<div class="carousel-item">   
    <img src="${product}"  class="d-block w-100" alt="">
    </div>                
    `;
  }
  document.getElementById("productImagesGallery").innerHTML = HTMLcontent;
  // funcion add class active carousel
  $(document).ready(function () {
    $("#myCarousel").find(".carousel-item").first().addClass("active");
  });
}

/* Intervalo carrusel*/

$(".carousel").carousel({
  interval: 3000,
});

/*funcion cargar Comentarios*/
function commentsPost() {
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
         <div class="stars">`+ star(comment.score)+`</div>            
     </div> </li>`;
  }
  document.getElementById("commentConteiner").innerHTML = HTMLcontent;

  
}

/* Comentar Desafio*/
function comentar() {
  let texto = document.getElementById("textAreaControl").value;
  let user = JSON.parse(localStorage.getItem("userName"));
  let fecha = new Date();
  let result = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  //toISOString().split('T')[0]; Para fecha yyyy/mm/dd
  let hora = fecha.getHours(); //hora actual
  let minuto = fecha.getMinutes(); //minuto actual
  let segundo = fecha.getSeconds(); //segundo actual
  let score = document.querySelector(
    `input[type="radio"][name=rating]:checked`
  ).value;
   
  
  document.getElementById("commentConteiner").innerHTML += ` <li class="media">
  <a href="#" class="float-left">
      <img src="img/face_icon.jpg" alt="" class="img-circle">
  </a>
  <div class="media-body">
      <span class="text-muted float-right">
          <p class="text-muted">${result} ${hora}:${minuto}:${segundo}</p>
      </span>
      <strong class="text-success ml-2" >${user}</strong>
      <p class="ml-1">
          ${texto}
      </p>      
      <div class="stars">`+ star(score)+`</div>
  </div> </li>`;
  

}

/*funcion para mostrar star mediante imagen */
/*$.fn.stars = function () {
  return this.each(function (i, e) {
    $(e).html($("<span/>").width($(e).text() * 16));
  });
};*/

/*funcion mostrar score en estrellas*/
function star(puntaje){
let startscore = "";

if(puntaje==1){
  startscore = ` <span class="fa fa-star green-color checked checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`
}
else if (puntaje==2){
  startscore = ` <span class="fa fa-star green-color checked"></span>
                 <span class="fa fa-star green-color checked "></span>
                 <span class="fa fa-star "></span>
  <span class="fa fa-star "></span>
  <span class="fa fa-star "></span>`
}
else if (puntaje==3){
  startscore = ` <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked "></span>
  <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star "></span>
      <span class="fa fa-star "></span>`
}

else if (puntaje==4){
  startscore = ` <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star "></span>`
}

else if (puntaje==5){
  startscore = ` <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked "></span>
  <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked"></span>
  <span class="fa fa-star green-color checked"></span>`
}

else {
  startscore = ` <span class="fa fa-star"></span>
  <span class="fa fa-star  "></span>
  <span class="fa fa-star "></span>
  <span class="fa fa-star "></span>
  <span class="fa fa-star "></span>`
}
return startscore
}
