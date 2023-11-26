const express = require("express"); // Importa ExpressJS
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mariadb = require('mariadb'); // Importa MariaDB


const pool = mariadb.createPool({host: "localhost", user: "root", password: "Pasita.07", database: "ecommerce", connectionLimit: 5});
const app = express(); // Crea una instancia de ExpressJS
const port = 3000;

app.use(cors());
app.use(express.static('./emercado-api-main'));
app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const secretKey = "tu_clave_secreta_4y293dfdswc3r29jdc92hc23y4d9y2"; // Reemplaza con una clave segura en un entorno de producción

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  crearUsuarios();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Solicitud GET
app.get('/', (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});


// Solicitud POST
app.post("/login", async (req, res) => {

 const { username, password } = req.body;
 let conn;

  try {
	  conn = await pool.getConnection();
	  const response = await conn.query(
      'SELECT password FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (response.length > 0) {
      // Si la autenticación es exitosa, generamos un token
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" }); // Puedes ajustar el tiempo de expiración según tus necesidades
      // Devolvemos el token como respuesta al frontend
      res.json({ token });
    } else {
      // Si la autenticación falla, respondemos con un código de estado 401 (no autorizado)
      res.status(401).json({ mensaje: "Autenticación fallida" });

    }
  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
});


// Actualizar carrito en base de datos
app.put("/cart", checkToken, async (req, res) => {

  const { username, cart } = req.body;
 
  let conn;

  try {
	  conn = await pool.getConnection();
	  const response = await conn.query(
      'REPLACE INTO carts (username, cart) VALUES (?, ?)',
      [username, cart]
  );

  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
  
  res.json("exito put cart!");
 
 });


 // Obtener carrito de la base de datos y devolverlo
app.get("/cart", checkToken, async (req, res) => {

  const username = req.query.username;

  let conn;

  try {
	  conn = await pool.getConnection();
	  const response = await conn.query(
      'SELECT cart FROM carts WHERE username = ?',
      [username]
  );

  if (response.length > 0) {
  
    let carrito = response;

    if (carrito[0]) {
      res.send(carrito[0]);
    } else {
      res.send("{}");
    }
  } else {
    res.send("{}");
  }

  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  } finally {
	  if (conn) conn.release(); //release to pool
  }
 });

 // Precarga de usuarios
 async function crearUsuarios() {
  
  let conn;

  try {
	  conn = await pool.getConnection();
	  await conn.query(
      'REPLACE INTO users (username, password) VALUES ("maria@jap.com", "maria1")');
    await conn.query(
      'REPLACE INTO users (username, password) VALUES ("vale@jap.com", "vale1")');
    await conn.query(
      'REPLACE INTO users (username, password) VALUES ("fran@jap.com", "fran1")');
    await conn.query(
      'REPLACE INTO users (username, password) VALUES ("alain@jap.com", "alain1")');

  } catch(error) {
    console.error("Error al crear usuarios en la base de datos.")
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
 }

 // Función para verificar el token
function checkToken(req, res, next) {

  let token = req.header('Authorization');

  try {
    if (!token) {
      res.send("Token vacio");
    }
    if (jwt.verify(token, secretKey)) {

      let decoded_token = jwt.decode(token, secretKey);

      if (decoded_token.username.includes(req.query.username) || decoded_token.username.includes(req.body.username)) {
        next();
      } else {
        res.send("El token no pertenece al usuario consultado");
      }
    } else {
      res.send("Token invalido");
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
}

