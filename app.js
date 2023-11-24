const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html
const cors = require("cors");
const path = require("path");
const fs = require("fs");
/*
const mariadb = require('mariadb'); // Importa MariaDB
const pool = mariadb.createPool({host: "localhost", user: "root", password: "Pasita.07", database: "pruebadb", connectionLimit: 5});
*/

//const app2 = await NestFactory.create(AppModule);
//app.enableCors();
//await app.listen(3000);

//const app2 = await NestFactory.create(AppModule, { cors: true });
//await app.listen(3000);


const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

let datos = require('./emercado-api-main/cart/buy.json')
app.use(cors());
app.use(express.static('./emercado-api-main'));
/*
const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

*/

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



app.get('/', (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});


/*
/////////////////////////////// FUNCION GET
app.get("./emercado-api-main/people", async (req, res) => { 

  let conn;

  try {
	  conn = await pool.getConnection();
	  const rows = await conn.query(
      "SELECT id, name, lastname, email FROM people"
  );

    res.json(rows);
  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }

});

/*
/////////////////////////////// FUNCION GET CON PARAMETRO
app.get("/people/:id", async (req, res) => {

  let conn;

  try {
	  conn = await pool.getConnection();
	  const rows = await conn.query(
      "SELECT id, name, lastname, email FROM people WHERE id=?",[req.params.id]
  );

    res.json(rows[0]);
  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
});

/////////////////////////////// FUNCION POST
app.post("/people", async (req, res) => {

  let conn;

  try {
	  conn = await pool.getConnection();
	  const response = await conn.query(
      'INSERT INTO people(name, lastname, email) VALUE(?,?,?)',[req.body.name, req.body.lastname, req.body.email]
  );

    res.json({id: parseInt(response.insertId), ...req.body});
  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
});

/////////////////////////////// FUNCION PUT
app.put("/people/:id", async(req, res) => {

  let conn;

  try {
	  conn = await pool.getConnection();
	  const response = await conn.query(
      'UPDATE people SET name=?, lastname=?, email=? WHERE id=?',
      [req.body.name, req.body.lastname, req.body.email, req.params.id]
  );

    res.json({ id: req.params.id, ...req.body});
  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
});

/////////////////////////////// FUNCION DELETE
app.delete("/people/:id", async(req, res) => {

  let conn;

  try {
	  conn = await pool.getConnection();
	  const rows = await conn.query(
      'DELETE FROM people WHERE id=?',
      [req.params.id]
  );

    res.json({message:"elemento eliminado correctamente"});
  } catch(error) {
    res.status(500).json({message:"se rompio el servidor"});
  }  finally {
	  if (conn) conn.release(); //release to pool
  }
});
*/