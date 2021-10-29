//desafio ENTREGA 2
const searchBar = document.getElementById('searchbar');
const contenedor = document.getElementById("product-list-container");
let productsList = [];

//EVENTO DE ESCUCHA mediante "keyup"
searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();     

    const filterProducts =  productsList.filter((product) => {
       return (product.name.toLowerCase().includes(searchString)) ;
    });
    displayProduct(filterProducts);
});

//FETCH products
const loadProducts = async () => {
    try {
        const res = await fetch(PRODUCTS_URL);
        productsList = await res.json();
        displayProduct(productsList);
       // console.log(productsList);
    } catch (err) {
        console.error(err);
    }
};
// Mostrar productos
const displayProduct = (products) => {
    const htmlcontent = products
       .map((product) => {
          return  `            
          <div class="col-sm-6">               
          <div class="card border-primary mb-1 "  style="max-width: 31rem";>
          <div class="card-header"><a href="product-info.html" >${product.name}</a></div> 
            <div class="card-body">   
            <a href="product-info.html" >        
            <img class="img-fluid img-thumbnail" src=" ${product.imgSrc}" alt="${product.description} "></a>             
          <p class="card-text "><strong>${product.description} </strong></p>
          <h3 class="text-center"><span class="badge badge-pill badge-success">${product.currency}${product.cost}</span></h3>
          <small class="text-muted float-right"> Vendidos ${product.soldCount} artículos</small>
          </div>
          </div>
          </div>          
          `;

    }) 
    .join('');       
    contenedor.innerHTML = htmlcontent;
};
 
loadProducts();
 


