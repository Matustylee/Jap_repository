//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var products = {};
var comments = [];
document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                products = resultObj.data;
    
                let productsNameHTML  = document.getElementById("productName");
                let productCostHTML = document.getElementById("productCost");                
                let productsDescriptionHTML = document.getElementById("productsDescription");
                let soldCountHTML = document.getElementById("soldCount");
                let relatedProductsHTML = document.getElementById("relatedProducts");
                let gallery = document.getElementById("productImagesGallery");
                let productCategoryHTML = document.getElementById("productCategory");
            
                productsNameHTML.innerHTML = products.name+": "+"Precio"+" "+products.currency+" "+ products.cost; ;
                productCostHTML.innerHTML = "Precio"+" "+products.currency+" "+ products.cost;                
                productsDescriptionHTML.innerHTML = products.description;
                soldCountHTML.innerHTML = products.soldCount+" "+"Articulos";
                relatedProductsHTML.innerHTML = products.relatedProducts;
                productCategoryHTML.innerHTML = products.category;
                gallery.innerHTML =`
                <div class="slideshow-container"> 
                            
                <div class="mySlides fade">
                  <div class="numbertext">1 / 5</div>
                  <img src="${products.images[0]}" style="width:100%"> 
                  <div class="text">${products.name}</div>
                </div>
                
                <div class="mySlides fade">
                  <div class="numbertext">2 / 5</div>
                  <img src="${products.images[1]}" style="width:100%">
                  <div class="text">${products.name}</div>
                </div>
                
                <div class="mySlides fade">
                  <div class="numbertext">3 / 5</div>
                  <img src="${products.images[2]}" style="width:100%">
                  <div class="text">${products.name}</div>
                </div>
                
                <div class="mySlides fade">
                  <div class="numbertext">4 / 5</div>
                  <img src="${products.images[3]}" style="width:100%">
                  <div class="text">${products.name}</div>
                </div>
                
                <div class="mySlides fade">
                  <div class="numbertext">5 / 5</div>
                  <img src="${products.images[4]}" style="width:100%">
                  <div class="text">${products.name}</div>
                </div>
                
                </div>
                <br>
                <div style="text-align:center">
                  <span class="dot"onclick="currentSlide(1)"></span> 
                  <span class="dot"onclick="currentSlide(2)"></span> 
                  <span class="dot"onclick="currentSlide(3)"></span> 
                  <span class="dot"onclick="currentSlide(4)"></span> 
                  <span class="dot"onclick="currentSlide(5)"></span> 
                </div>
                `
                showSlides();
            }  
                            
            
        });
    });


var slideIndex = 0;


function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Cambia la imagen cada 2 SEGUNDOS
};


document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          comments = resultObj.data;   
          commentsPost();
      }})
      
      
    });

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
     </div> </li>`
        
   }
   document.getElementById("commentConteiner").innerHTML = HTMLcontent;

}


