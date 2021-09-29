const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Vend.";
const ORDER_BY_PROD_COUNT_MIN = "Vent.";
const ORDER_BY_COST_COUNT = "Precio";
const ORDER_BY_COST_COUNT_DESC = "Precios";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT_MIN) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount < bCount) {
        return -1;
      }
      if (aCount > bCount) {
        return 1;
      }
      return 0;
    });
    /* Agrege linea de costo*/
  } else if (criteria === ORDER_BY_COST_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_COST_COUNT_DESC) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount < bCount) {
        return -1;
      }
      if (aCount > bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function showProductList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-4">
                    <img src=" ${product.imgSrc}" alt=" ${product.description} " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1"> ${product.name}</h4>
                        <small class="text-muted"> ${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1"> ${product.description}  </p>
                    <h5 class="mt-3"> Precio ${product.cost} ${product.currency}</h5>
                </div>
            </div>
           </a>
            `;
    }

    document.getElementById("product-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro los productos ordenadas
  showProductList();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });
});

document.getElementById("sortAsc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_ASC_BY_NAME);
});

document.getElementById("Precio").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_COST_COUNT);
});

document.getElementById("Precios").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_COST_COUNT_DESC);
});

document.getElementById("sortDesc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_DESC_BY_NAME);
});

document
  .getElementById("sortByCountMin")
  .addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_COUNT_MIN);
  });

document.getElementById("sortByCount").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_PROD_COUNT);
});

document
  .getElementById("clearRangeFilter")
  .addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductList();
  });

document
  .getElementById("rangeFilterCount")
  .addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
      minCount = parseInt(minCount);
    } else {
      minCount = undefined;
    }

    if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
      maxCount = parseInt(maxCount);
    } else {
      maxCount = undefined;
    }

    showProductList();
  });
