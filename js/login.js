document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    var floatingInput = document.getElementById("floatingInput").value;
    var floatingPassword = document.getElementById("floatingPassword").value;
  
    if (floatingInput.trim() === "" || floatingPassword.trim() === "") {
      alert("Por favor, ingresa tu correo y contraseña.");
      return;
    }
  
    try {
        // Realiza una solicitud POST al endpoint /login
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: floatingInput, password: floatingPassword }),
        });
    
        if (response.status == 200) {

            const data = await response.json();
            // Almacena el token en localStorage
            localStorage.setItem("token", data.token);
        
            // Almacena el nombre de cuenta
            localStorage.setItem("account", floatingInput);

            // reconstriur el carrito desde el backend
            const response2 = await fetch("http://localhost:3000/cart?" + new URLSearchParams({
                username: floatingInput
            }), 
            {
                method: "GET",
                headers: {
                    Authorization: `${data.token}`, // Enviar el token en el encabezado Authorization
                    "Content-Type": "application/json", // Especificar el tipo de contenido si es necesario
            }});
        
            const carrito = await response2.json();
            // Almacena el carrito en el local storage
            if (carrito.cart) {
                localStorage.setItem("cart", carrito.cart);
            }
            
            if (response.status != 200) {
                console.error('Error al obtener el carrito de la base de datos')
            }
        
            // Redirige al usuario a la página index.html
            window.location.href = "index.html";
        
        } else {

            //Alerta de usuario o clave incorrectos.
            document.querySelector(".alert").style.display = "block";
        }

    } catch (error) {
      console.error("Error durante la autenticación:", error);

    }
  });

