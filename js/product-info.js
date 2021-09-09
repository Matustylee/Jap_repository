//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var products = {};
var comments = [];
var productsList = [];

const ORDER_BY_DATATIME = "Fecha.";  /*probando para ordenar por fecha comentarios*/

/* Escucha carga descripcion y carusel*/
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                products = resultObj.data;
                let productsNameHTML  = document.getElementById("productName");                             
                let productsDescriptionHTML = document.getElementById("productsDescription");
                let soldCountHTML = document.getElementById("soldCount");
                //let relatedProductsHTML = document.getElementById("relatedProducts");
                let gallery=document.getElementById("productImagesGallery");
                let productCategoryHTML = document.getElementById("productCategory");               
            
                productsNameHTML.innerHTML = `${products.name} : <strong>Precio ${products.currency} ${products.cost}</strong>`;                         
                productsDescriptionHTML.innerHTML = products.description;
                soldCountHTML.innerHTML = products.soldCount+" "+"Articulos";                
                productCategoryHTML.innerHTML = `<a href= "../jap_repository/products.html">${products.category}</a>`; 
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
   //escucha carga productos relacionados
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                productsList = resultObj.data; 
                console.log(productsList)
                let htmlContentToAppend = "";
                
                for(let i = 0; i < productsList.length; i++){
                    let related = productsList[i];
                    if ( i == products["relatedProducts"][0] || i == products.relatedProducts[1] ) {
                        console.log(related);
                        htmlContentToAppend += `    
                                           <div class="col-sm-6">               
                                             <div class="card">
                                             <a class="card-header" href= "../jap_repository/products.html" >${related.name}</a> 
                                             <div class="card-body">
                                            <img class="img-fluid img-thumbnail" src="${related.imgSrc}" alt="">
                                          <p class="card-text class-muted">${related.description}</p>
                                         <h3 class="text-center"><strong>${related.currency}${related.cost}</strong></h3>
                                        </div>
                                         </div>
                                         </div> `
                    }
                    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
                }
            }   
            })
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
  let result = fecha.toLocaleDateString("es-ES", { // you can use undefined as first argument
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  //toISOString().split('T')[0]; Para fecha yyyy/mm/dd
  //let dia = fecha.getDay();
  //let mes = fecha.getMonth();
  //let año = fecha.getFullYear();
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
          <p class="text-muted">${result} ${hora}:${minuto}:${segundo}</p>
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



       

    


       
        
            


