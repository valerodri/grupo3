document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Verificar si el usuario tiene un token almacenado
    var token = localStorage.getItem("token");

    if (!token) {
        // Si no hay un token, redirigir al usuario a la página de inicio de sesión
        window.location.href = "login.html";
    } else {
        // El usuario tiene un token válido, puedes continuar con el contenido de la página index.html
        // Por ejemplo, mostrar un mensaje de bienvenida
        const welcomeMessage = document.createElement("p");
        welcomeMessage.textContent = "¡Bienvenido!";
        document.body.appendChild(welcomeMessage);
    }
});

//Funcion que muestra el usuario en la nav-bar
//prettier-ignore
function showAccount() {
    let accountDisplay = document.getElementById("accountDisplay");
    let nameAccount = localStorage.getItem("account");
    let htmlContentToAppend = "";
    htmlContentToAppend += 
    `<div class="btn-group">
        <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${nameAccount}
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
            <li><a class="dropdown-item" onclick="cambiarModo()">Cambiar modo</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" id="cerrar_sesion" onclick="cerrarSesion()">Cerrar sesion</a></li>
        </ul>
    </div>`;
    accountDisplay.innerHTML = htmlContentToAppend;
}

//Cambiar a modo oscuro / claro
function cambiarModo() {
    var element = document.body;
    element.dataset.bsTheme =
        element.dataset.bsTheme == "light" ? "dark" : "light";
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", showAccount());
