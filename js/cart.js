const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let currentCartArray = [];

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

document.addEventListener("DOMContentLoaded", function () {
    showAccount();

    let cart = localStorage.getItem("cart");
    if (cart) {
        cart = JSON.parse(cart);
        currentCartArray = cart.articles;
        showCart();
    }
    /*getJSONData(url).then(function (resultObj) {
        console.log(resultObj.status);
        if (resultObj.status === "ok") {
            currentCartArray = resultObj.data.articles;
            showCart();
        }
    });*/
});

//Mostrar carrito
//prettier-ignore
function showCart() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCartArray.length; i++) {
        let product = currentCartArray[i];
        let uniqueId = `item-${i}`; // Identificador único para cada input

        htmlContentToAppend += `
        <tr>
          <th scope="row"><img src="${product.image}" class="imgCart"></th>
          <td>${product.name}</td>
          <td>${product.currency} ${product.unitCost}</td>
          <td><input type="number" class="inputEnvio" min="1" value="1" id="${uniqueId}"></td>
          <td id="subtotal-${uniqueId}">${calculateSubtotal(product.unitCost,1)}</td>
          <td>
            <button onClick="deleteCart(${i})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
            </button>
          </td>
        </tr>`;
    }
    document.getElementById("cart-container").innerHTML = htmlContentToAppend;

    // Escucha el evento input para cada input y actualiza los subtotales
    currentCartArray.forEach((product, i) => {
        const uniqueId = `item-${i}`;
        const inputElement = document.getElementById(uniqueId);

        inputElement.addEventListener("input", function () {
            const cantidad = parseInt(inputElement.value);
            const subtotal = calculateSubtotal(product.unitCost, cantidad);
            const subtotalElement = document.getElementById(`subtotal-${uniqueId}`);
            subtotalElement.textContent = subtotal;
        });
    });
}

/* La idea es que, basandonos en la posición del elemento en el carrito (i), 
podamos eliminar el elemento en el localStorage que se encuentre en esa posición */
function deleteCart(pos) {
    if (pos >= 0 && pos < currentCartArray.length) {
        currentCartArray.splice(pos, 1);
        localStorage.setItem(
            "cart",
            JSON.stringify({ articles: currentCartArray })
        );
        showCart();
    }
}

function calculateSubtotal(cost, cant) {
    return cost * cant;
}
