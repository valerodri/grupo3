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
          <td><input type="number" min="1" value="1" id="${uniqueId}"></td>
          <td id="subtotal-${uniqueId}">${calculateSubtotal(product.unitCost,1)}</td>
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

function calculateSubtotal(cost, cant) {
    return cost * cant;
}
