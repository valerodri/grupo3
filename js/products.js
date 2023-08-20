
let currentProductsArray = [];
//const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
url = PRODUCTS_URL + localStorage.getItem("catID")+".json";



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
//        console.log(resultObj.status)
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProductsList()

        }
})});

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
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
                `
            
    }
            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

    function setProdID(id) {
        localStorage.setItem("prodID", id);
        window.location = "product-info.html"
    }