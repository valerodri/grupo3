const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let currentCartArray = [];
const totalDisplay = document.getElementById("genericSubtotal");
const shipValues = document.querySelectorAll('.tipoEnvio input[type="radio"]');
let selectedShip = "premium";

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

    document.querySelector(".btn-close").addEventListener("click", () => {
        document.querySelector(".alert").style.display = "none";
    });
});

//Mostrar carrito
//prettier-ignore
function showCart() {
    let htmlContentToAppend = "";
    let totalSubtotal = 0;

    for (let i = 0; i < currentCartArray.length; i++) {
        let product = currentCartArray[i];
        let uniqueId = `item-${i}`; // Identificador único para cada input

        htmlContentToAppend += `
        <tr>
          <th scope="row"><img src="${product.image}" class="imgCart"></th>
          <td>${product.name}</td>
          <td>${product.currency} ${product.unitCost}</td>
          <td><input type="number" class="inputEnvio" min="1" value="${product.count}" id="${uniqueId}"></td>
          <td id="subtotal-${uniqueId}">${product.count*calculateSubtotal(convertCurrency(product),1)}</td>
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
            product.count = inputElement.value;
            actualizarCarrito(product);
            showCart();
            actualizarCostoEnvio();

        });
        const convertedCost = convertCurrency(product);
        totalSubtotal += calculateSubtotal(convertedCost, product.count);

    });
   
    totalDisplay.textContent = totalSubtotal;
   actualizarCostoEnvio();
}

function actualizarCarrito(product) {
    // Obtener el carrito actual del almacenamiento local
    let cart = localStorage.getItem("cart");
    if (cart) {
        cart = JSON.parse(cart);

        // Agregar el nuevo item al carrito
        for (let index = 0; index < cart.articles.length; index++) {
            if (cart.articles[index].id == product.id) {
                cart.articles[index].count = product.count;
                break;
            }
        }

        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function convertCurrency(product) {
    if (product.currency === "UYU") {
        return (product.unitCost / 39).toFixed(); // Realiza la conversión según la tasa
    }
    return product.unitCost;
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

function updateTotalSubtotal() {
    let totalSubtotal = 0;
    currentCartArray.forEach((product, i) => {
        const uniqueId = `item-${i}`;
        const cantidadElement = document.getElementById(uniqueId);
        const cantidad = parseInt(cantidadElement.value);
        totalSubtotal += calculateSubtotal(product.unitCost, cantidad);
    });
    totalDisplay.textContent = totalSubtotal; // Actualiza el elemento HTML con el total
}

function calculateSubtotal(cost, cant) {
    return cost * cant;
}

function actualizarCostoEnvio() {
    // Obtiene el valor del totalSubtotal
    const totalSubtotal = parseFloat(totalDisplay.textContent);

    // Calcula el costo de envío según la opción seleccionada
    let shippingCost = 0;
    if (selectedShip === "premium") {
        shippingCost = totalSubtotal * 0.15;
    } else if (selectedShip === "express") {
        shippingCost = totalSubtotal * 0.07;
    } else if (selectedShip === "standard") {
        shippingCost = totalSubtotal * 0.05;
    }

    // Actualiza el costo de envío en el HTML
    const costoEnvioElement = document.querySelector("#genericCostoEnvio");
    costoEnvioElement.textContent = `${shippingCost.toFixed(2)}`;

    const absTotal = totalSubtotal + shippingCost;

    // Actualiza el elemento HTML con el total absoluto
    const absTotalElement = document.querySelector("#absTotal");
    absTotalElement.textContent = `${absTotal.toFixed(2)}`;
}

// Agrega un evento de cambio para cada radio button

shipValues.forEach((radio) => {
    radio.addEventListener("change", function () {
        selectedShip = radio.value;

        actualizarCostoEnvio();
    });
});

const cardNumber = document.getElementById("cardNumber");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const accountNumber = document.getElementById("accountNumber");
const paymentSelection = document.getElementById("paymentSelection");
const formCart = document.getElementById("formCart");
const formaPago = document.getElementById("formaPago");
const paymentMethod1 = document.getElementById("paymentMethod1");
const paymentMethod2 = document.getElementById("paymentMethod2");
const checkboxFacu = document.getElementById("checkboxFacu");

// Validaciones Modal - Tarjeta de Credito
paymentMethod1.addEventListener("click", () => {
    accountNumber.setAttribute("disabled", "");
    cardNumber.removeAttribute("disabled", "");
    securityCode.removeAttribute("disabled", "");
    expiration.removeAttribute("disabled", "");
    checkboxFacu.click();

    paymentSelection.innerHTML = "Tarjeta de Crédito";
});

// Validaciones Modal - Transferencia Bancaria

paymentMethod2.addEventListener("click", () => {
    accountNumber.removeAttribute("disabled", "");
    cardNumber.setAttribute("disabled", "");
    securityCode.setAttribute("disabled", "");
    expiration.setAttribute("disabled", "");
    checkboxFacu.click();

    paymentSelection.innerHTML = "Transferencia Bancaria";
});

(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

//Validaciones para el Formulario.
formCart.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Si se valida el form mostrar una alert de que la compra se realizo con exito
    if (formCart.checkValidity()) {
        document.querySelector(".alert").style.display = "block";
    }
});

document.querySelector(".alert").addEventListener("click", () => {
    // Redirigir al usuario a la página index.html
    window.location.href = "index.html";
});
