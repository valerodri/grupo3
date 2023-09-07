let currentProduct = 0;
//const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
url = PRODUCT_INFO_URL + localStorage.getItem("prodID") + ".json";

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        console.log(resultObj.status);
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data;
            showProductInfo();
        }
    });
});
//prettier-ignore
function showProductInfo() {
    let htmlContentToAppend = "";
    product_info = currentProduct;
    htmlContentToAppend += `
                <div class="row justify-content-md-center">
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">${product_info.name}</h4>
                        <hr>
                        <div>
                            <label><strong>Precio</strong></label>
                            <p>${product_info.cost}</p>
                        </div>
                        <div>
                            <label><strong>Descripción</strong></label>
                            <p>${product_info.description}</p>
                        </div>
                        <div>
                            <label><strong>Categoría</strong></label>
                            <p>${product_info.category}</p>
                        </div>
                        <div>
                            <label><strong>Cantidad de vendidos</strong></label>
                            <p>${product_info.soldCount}</p>
                        </div>
                            <div>
                                <label><strong>Imágenes ilustrativas</strong></label>
                                <div id="productsIMG" class="row">
                                    <div class="col-md-3">
                                        <img src="${product_info.images[0]}" alt="${product_info.description}" class="img-thumbnail">
                                    </div>
                                    <div class="col-md-3">
                                        <img src="${product_info.images[1]}" alt="${product_info.description}" class="img-thumbnail">
                                    </div>
                                    <div class="col-md-3">
                                        <img src="${product_info.images[2]}" alt="${product_info.description}" class="img-thumbnail">
                                    </div>
                                    <div class="col-md-3">
                                        <img src="${product_info.images[3]}" alt="${product_info.description}" class="img-thumbnail">
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                `;
    document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;
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

document.addEventListener("DOMContentLoaded", showAccount());
