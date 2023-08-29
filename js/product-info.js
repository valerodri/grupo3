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

function showProductInfo() {
    let htmlContentToAppend = "";
    product_info = currentProduct;
    htmlContentToAppend += `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${product_info.images}" alt="${product_info.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product_info.name}</h4>
                                <small class="text-muted">${product_info.productCount} artículos</small>
                            </div>
                            <p class="mb-1">${product_info.description}</p>
                        </div>
                    </div>
                </div>
                `;
    document.getElementById("prod-info-container").innerHTML =
        htmlContentToAppend;
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
