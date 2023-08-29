const ORDER_BY_PROD_COUNT = "Cant.";

let currentProductsArray = [];
//const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
url = PRODUCTS_URL + localStorage.getItem("catID") + ".json";

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        //        console.log(resultObj.status)
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });
});

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

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
    document.getElementById("prod-list-container").innerHTML =
        htmlContentToAppend;
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

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

function showAccount() {
    let accountDisplay = document.getElementById("accountDisplay");
    let nameAccount = localStorage.getItem("account");
    accountDisplay.innerHTML = nameAccount;
}

//Mostrar cuenta
document.addEventListener("DOMContentLoaded", showAccount());

function sortAndShowProducts(sortProducts, productsArray) {
    currentSortCriteria = sortProducts;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }
    //prettier-ignore
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showProductsList();
        }
    });

    document
        .getElementById("sortByCount")
        .addEventListener("click", function () {
            sortAndShowProducts(ORDER_BY_PROD_COUNT);
        });

    document
        .getElementById("clearRangeFilter")
        .addEventListener("click", function () {
            document.getElementById("rangeFilterPriceMin").value = "";
            document.getElementById("rangeFilterPriceMax").value = "";

            minPrice = undefined;
            maxPrice = undefined;

            showProductsList();
        });

    document
        .getElementById("rangeFilterPrice")
        .addEventListener("click", function () {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minPrice = document.getElementById("rangeFilterPriceMin").value;
            maxPrice = document.getElementById("rangeFilterPriceMax").value;

            if (
                minPrice != undefined &&
                minPrice != "" &&
                parseInt(minPrice) >= 0
            ) {
                minPrice = parseInt(minPrice);
            } else {
                minPrice = undefined;
            }

            if (
                maxPrice != undefined &&
                maxPrice != "" &&
                parseInt(maxPrice) >= 0
            ) {
                maxPrice = parseInt(maxPrice);
            } else {
                maxPrice = undefined;
            }

            showProductsList();
        });
});
