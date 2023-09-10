let currentProductImagesArray = [];
let currentProductCommentsArray = [];
let currentProduct;

//const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
//const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";

url = PRODUCT_INFO_URL + localStorage.getItem("prodID") + ".json";
urlcom = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + ".json";

document.addEventListener("DOMContentLoaded", async function (e) {
    try {
        const resultObj = await getJSONData(url);
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data;

        }

        const resultObj2 = await getJSONData(urlcom);
        if (resultObj2.status === "ok") {
            currentProductCommentsArray = resultObj2.data;
        }

        showProductInfo();
    } catch (error) {
        console.error("An error occurred:", error);
    }
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
                            <p>${product_info.currency} ${product_info.cost}</p>
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
                        </div>
                    </div>
                </div>
                <div>
                    <div id="productsIMG" class="row">
                    `;

        htmlContentToAppend += showProductImages(product_info.images, product_info.description); 

        htmlContentToAppend +=`
                    </div>
                </div>
                <div class="row justify-content-md-center">
                <div class="col-md-8 order-md-1">
                    <br><label><strong>Comentarios</strong></label>
                </div>
                </div>
                `
        htmlContentToAppend += showProductComments(); 

    document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;

}

function showProductImages(images, description) {
    let htmlContentToAppend = "";
    for (let i = 0; i < images.length; i++) {
        htmlContentToAppend += `
            <div class="row justify-content-md-center">
            <div class="col-md-8 order-md-1 img-thumbnail">
                <div class="col-md-3">
                    <img src="${product_info.images[i]}" alt="${description}">
                </div>
            </div>
            </div>
                `;
    }
    return htmlContentToAppend;
}


function showProductComments() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductCommentsArray.length; i++) {
        let product_com = currentProductCommentsArray[i];
    
        htmlContentToAppend += `
            <div>
            <div class="row justify-content-md-center">
            <div class="col-md-8 order-md-1">
            `;
        htmlContentToAppend += showProductRating(product_com.score)
        
        htmlContentToAppend += `
            <p>${product_com.description}</p>
            <p>${product_com.user}</p>
            <p>${product_com.dateTime}</p>
            </div>
            </div>
            </div>
        `;
    }
    return htmlContentToAppend;
}

function showProductRating(score){
    let htmlContentToAppend = ""
    for (let i=0; i<score; i++) 
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`
    for (let i=0; i<5-score; i++) 
        htmlContentToAppend += `<span class="fa fa-star"></span>`
    return htmlContentToAppend;
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
