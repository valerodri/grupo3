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

//nuevo
function showAccount() {
    let accountDisplay = document.getElementById("accountDisplay");
    let nameAccount = localStorage.getItem("account");
    accountDisplay.innerHTML = nameAccount;
}

document.addEventListener("DOMContentLoaded", showAccount());
