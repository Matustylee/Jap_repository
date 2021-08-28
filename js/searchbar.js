//desafio ENTREGA 2
const searchBar = document.getElementById('searchbar');
const contenedor = document.getElementById("cat-list-container");
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
        console.log(productsList);
    } catch (err) {
        console.error(err);
    }
};
// Mostrar productos
const displayProduct = (products) => {
    const htmlcontent = products
       .map((product) => {
          return   `
          <a href="product-info.html" class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col-3">
                      <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">`+ product.name +`</h4>
                          <small class="text-muted">` + product.soldCount + ` artículos</small>
                      </div>
                      <p class="mb-1">` + product.description + `</p>
                      <h5> Precio ${product.cost} ${product.currency}</h5>
                  </div>
              </div>
          </a>
          `;

    }) 
    .join('');
    contenedor.innerHTML = htmlcontent;
};
 
loadProducts();
 