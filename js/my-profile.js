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
document.addEventListener("DOMContentLoaded", function () {
    const account = localStorage.getItem("account");
    const email = document.getElementById("inputEmail");
    const image = document.getElementById("inputFoto");
    const perfil = document.getElementById("fotoPerfil");

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
});

(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const formProfile = document.getElementById("formProfile");

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
        const image = document.getElementById("inputFoto");
        
        document.querySelector(".alert").style.display = "block";

        //prettier-ignore
        const info = {
            "nombre": name.value,
            "segundoNombre": secondName.value,
            "apellido": surname.value,
            "segundoApellido": secondSurname.value,
            "telefono": phone.value,
        };

        localStorage.setItem("userInfo", JSON.stringify(info));
    }
});
