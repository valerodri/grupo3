const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_ASC_BY_PRICE = "Barato";
const ORDER_DESC_BY_PRICE = "Caro";
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let busqueda = "";
let currentProductsArray = [];
//const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
url = PRODUCTS_URL + localStorage.getItem("catID") + ".json";

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
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
    }
    return result;
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

//prettier-ignore
function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        let productName = product.name.toLowerCase(); //Convierte el nombre del producto en minusculas para una mejor comparación
        let productDescription = product.description.toLowerCase();

        if (
            (minPrice == undefined || (minPrice != undefined && parseFloat(product.cost) >= minPrice)) &&
            (maxPrice == undefined || (maxPrice != undefined && parseFloat(product.cost) <= maxPrice)) &&
            (busqueda === "" || (productName.includes(busqueda) || productDescription.includes(busqueda))) //Chequea que el nombre o la descripción del producto incluya el termino que se busca
        ) {
            htmlContentToAppend += `
                    <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                                    <small class="text-muted">${product.soldCount} vendidos</small>
                                </div>
                                <p class="mb-1">${product.description}</p>
                            </div>
                        </div>
                    </div>
                    `;
        }
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//prettier-ignore
function sortAndShowProducts(sortingCriteria, productsArray) {
    currentSortCriteria = sortingCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    //if (currentSortCriteria === ORDER_BY_PROD_COUNT) {
   //     currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
   // }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);


    showProductsList();
}

//Función PRINCIPAL
//prettier-ignore
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(url).then(function (resultObj) {
        console.log(resultObj.status)
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, currentProductsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE, currentProductsArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT, currentProductsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        document.getElementById("searchByName").value = "";

        busqueda = "";
        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if (minPrice != undefined && minPrice != "" && parseInt(minPrice) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if (maxPrice != undefined && maxPrice != "" && parseInt(maxPrice) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProductsList();
    });

    document.getElementById("searchByName").addEventListener("input", function() {
        busqueda = this.value.toLowerCase();
        showProductsList();
    });
});

//Mostrar cuenta
function showAccount() {
    let accountDisplay = document.getElementById("accountDisplay");
    let nameAccount = localStorage.getItem("account");
    accountDisplay.innerHTML = nameAccount;
}

//Mostrar cuenta
document.addEventListener("DOMContentLoaded", showAccount());
