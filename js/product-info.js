const urlCarrito =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";

let currentProductImagesArray = [];
let currentProductCommentsArray = [];
let currentProductRelatedArray = [];
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
        showCommentSection();
        showRelatedProducts();
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

//prettier-ignore
function agregarCarrito() {
        // Agregar el producto actual al carrito
        const item = {
            "id": currentProduct.id,
            "name": currentProduct.name,
            "count": 1,
            "unitCost": currentProduct.cost,
            "currency": currentProduct.currency,
            "image": currentProduct.images[0],
        };

        // Obtener el carrito actual del almacenamiento local
        let cart = localStorage.getItem("cart");
        if (cart) {
            cart = JSON.parse(cart);
        } else {
            cart = { articles: [] };
        }

        // Agregar el nuevo item al carrito
        let yaexiste = false;

        for (let index = 0; index < cart.articles.length; index++) {
            if (cart.articles[index].id==item.id){
                cart.articles[index].count++;
                yaexiste = true;
                break;
            }  
        }
        if (!yaexiste){
            cart.articles.push(item);
        }

        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem("cart", JSON.stringify(cart));
    
        //Alerta de producto agregado
        document.querySelector(".alert").style.display = "block";

        //Evento para cerrar alerta de producto agregado
        document.querySelector(".alert").addEventListener("click", function(){
            document.querySelector(".alert").style.display = "none";
        })
}

//prettier-ignore
function showProductInfo() {
    let htmlContentToAppend = "";
    product_info = currentProduct;
    htmlContentToAppend += `
                <div class="row justify-content-md-center">
                    <div class="col-md-8 order-md-1">
                        <div>
                            <h4 class="mb-3">${product_info.name}</h4>
                            <div class="d-grid d-md-flex justify-content-md-end">
                                <button class="btn btn-success" type="button" onclick="agregarCarrito()">Agregar al carrito</button>
                            </div>
                        </div>
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
                    <br><h5>Comentarios</h5>
                </div>
                </div>
                `
        htmlContentToAppend += showProductComments(); 


    document.getElementById("prod-info-container1").innerHTML = htmlContentToAppend;

}

function showProductImages(images, description) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `  
   <div class="row justify-content-md-center">
   <div div class="col-md-7 order-md-1 img-thumbnail">
   <div id="imagenesCarrusel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="${product_info.images[0]}" alt="${description}">
    </div> `;

    for (let i = 1; i < images.length; i++) {
        htmlContentToAppend += `
            <div class="carousel-item">
                    <img src="${product_info.images[i]}" alt="${description}">
                </div>
                `;
    }

    htmlContentToAppend += `
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#imagenesCarrusel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#imagenesCarrusel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
  </div>
    `;

    return htmlContentToAppend;
}

function showProductComments() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductCommentsArray.length; i++) {
        let product_com = currentProductCommentsArray[i];

        htmlContentToAppend += `
            <div>
            <div class="row justify-content-md-center">
            <div class="col-md-8 order-md-1 card mb-2">
            `;

        htmlContentToAppend += `
            <p><strong>${product_com.user}</strong> ${showProductRating(
            product_com.score
        )}</p>
            <p>${product_com.description}</p>
            <p class="text-muted">${product_com.dateTime}</p>
            
            </div>
            </div>
            </div>
        `;
    }
    return htmlContentToAppend;
}

function showProductRating(score) {
    let htmlContentToAppend = "";
    for (let i = 0; i < score; i++)
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
    for (let i = 0; i < 5 - score; i++)
        htmlContentToAppend += `<span class="fa fa-star"></span>`;
    return htmlContentToAppend;
}

function showCommentSection() {
    let htmlContentToAppend = "";
    product_info = currentProduct;
    htmlContentToAppend += `
    <div id="user_comment" class="row justify-content-md-center"> 
    <div class="col-md-8 order-md-1">
      <br>
      <h5>Comentar</h5>
      <form>
          <label for="comment">Tu opinión:</label> 
          <br>
          <textarea id="comment" rows="3" cols="40" required></textarea>
          <br><br>
          <label for="score">Tu puntuación:</label>
          <br>
          <select id="score" required>
          <option value="0" selected disabled ></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br>
        <br>
        <input type="button" value="Enviar" onclick="showInputComment()" id="submit_comment">
      </form>
    </div>
  </div>
  `;
    document.getElementById("prod-info-container2").innerHTML =
        htmlContentToAppend;
}

function showInputComment() {
    const description = document.getElementById("comment");
    const user = localStorage.getItem("account");
    const input_score = document.getElementById("score");

    let input_description = description.value;
    let comment_score = parseInt(input_score.value);

    if (input_description != "" && comment_score != 0) {
        document.getElementById("prod-info-container1").innerHTML += `
            <div class="row justify-content-md-center">
            <div class="col-md-8 order-md-1 card mb-2" id="comentarios" >
            <p><strong>${user}</strong> ${showProductRating(comment_score)}</p>
            <p>${input_description}</p>
            <p class="text-muted">${fecha()}</p>
            </div>
            </div>
    
                `;
    } else {
        alert("Debe rellenar todos los campos.");
    }
}

function fecha() {
    const hoy = new Date();

    const formato_hora = `${hoy.getHours().toString().padStart(2, 0)}:${hoy
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${hoy.getSeconds().toString().padStart(2, 0)}`;
    const formato_fecha = `${hoy.getFullYear()}-${(hoy.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${hoy.getDate().toString().padStart(2, 0)}`;

    return `${formato_fecha + " " + formato_hora}`;
}

function showRelatedProducts() {
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        </div>
        </div>
        <div class="row justify-content-md-center">
        <div class="col-md-8 order-md-1">
            <br><h5>Productos relacionados</h5>
        <div class="album">
        <div class="row">
    `;
    for (let i = 0; i < currentProduct.relatedProducts.length; i++) {
        let product_rel = currentProduct.relatedProducts[i];

        htmlContentToAppend += `
            <div class="col-md-4"onclick="setProdID(${product_rel.id})">
            <div class="card mb-4 custom-card cursor-active">
            `;

        htmlContentToAppend += `
            <img class="bd-placeholder-img card-img-top" src="${product_rel.image}"></img>
             <div class= "card-body"> 
            <p class="card-text">${product_rel.name}</p>
            </div>
            
            </div>
            </div>
        `;
    }

    htmlContentToAppend += ` 
        </div> 
        </div>
        </div>
        </div>
        `;

    document.getElementById("prod-info-container3").innerHTML =
        htmlContentToAppend;
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function showAccount() {
    let accountDisplay = document.getElementById("accountDisplay");
    let nameAccount = localStorage.getItem("account");
    let htmlContentToAppend = "";
    htmlContentToAppend += `<div class="btn-group">
    <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      ${nameAccount}
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" id="cerrar_sesion" onclick="cerrarSesion()">Cerrar sesion</a></li>
    </ul>
  </div>`;

    accountDisplay.innerHTML = htmlContentToAppend;
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", showAccount());
