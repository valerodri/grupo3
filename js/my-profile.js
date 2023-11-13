//prettier-ignore
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
document.addEventListener("DOMContentLoaded", function () {
    const account = localStorage.getItem("account");
    const email = document.getElementById("inputEmail");
    const image = document.getElementById("inputFoto");
    const perfil = document.getElementById("fotoPerfil");
    const userProfileImage = localStorage.getItem("userProfileImage");

    email.value = account;

    let user = localStorage.getItem("userInfo");

    if (user) {
        let name = document.getElementById("inputNombre");
        let secondName = document.getElementById("inputSegundoNombre");
        let surname = document.getElementById("inputApellido");
        let secondSurname = document.getElementById("inputSegundoApellido");
        let phone = document.getElementById("inputTelefono");

        user = JSON.parse(user);

        name.value = user.nombre;
        secondName.value = user.segundoNombre;
        surname.value = user.apellido;
        secondSurname.value = user.segundoApellido;
        phone.value = user.telefono;
    }

    if (!image.files.length) {
        perfil.src = "img/fotoperfilanonimo.jpeg";
    }

    if (userProfileImage) {
        perfil.src = userProfileImage;
    }

    image.addEventListener("change", function () {
        const selectedFile = image.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const dataURL = event.target.result;
                localStorage.setItem("userProfileImage", dataURL);
                perfil.src = dataURL;
            };
            reader.readAsDataURL(selectedFile);
        } else {
            perfil.src = "img/fotoperfilanonimo.jpeg";
            localStorage.removeItem("userProfileImage");
        }
    });

    document.querySelector(".btn-close").addEventListener("click", () => {
        document.querySelector(".alert").style.display = "none";
    });
});

(function () {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");
    const formProfile = document.getElementById("formProfile");

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
formProfile.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Si se valida el form mostrar una alert de que la compra se realizo con exito
    if (formProfile.checkValidity()) {
        const name = document.getElementById("inputNombre");
        const secondName = document.getElementById("inputSegundoNombre");
        const surname = document.getElementById("inputApellido");
        const secondSurname = document.getElementById("inputSegundoApellido");
        const phone = document.getElementById("inputTelefono");

        document.querySelector(".alert").style.display = "block";

        //prettier-ignore
        let info = {
            "nombre": name.value,
            "segundoNombre": secondName.value,
            "apellido": surname.value,
            "segundoApellido": secondSurname.value,
            "telefono": phone.value,
        };

        localStorage.setItem("userInfo", JSON.stringify(info));
    }
});
