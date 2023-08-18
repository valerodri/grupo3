
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var token = (Math.random().toString(36).substr(2));
    
    // Almacenar el token en localStorage
    localStorage.setItem("token", token);
    
    // Redirigir al usuario a la página index.html
    window.location.href = "index.html";
  });



