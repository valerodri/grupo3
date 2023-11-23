const express = require('express');

const app = express();
const puerto = 3000;

const path = require('path');
const fs = require('fs');

// Ruta dinamica para una categoria
function nuevaRutaCategoria(categoria) {
  const archivosJsonPath = path.join(__dirname, 'archivos_json', categoria);

  app.get(`/archivos_json/${categoria}/:numeroArchivo`, (req, res) => {
    const numeroArchivo = req.params.numeroArchivo;

    // Comprobamos si el archivo existe antes de enviarlo
    const rutaCompleta = path.join(archivosJsonPath, `${numeroArchivo}.json`);

    fs.access(rutaCompleta, fs.constants.F_OK, (err) => {
      if (err) { 
        res.status(404).send('Archivo no encontrado');// Si el archivo no existe retorna un error o una respuesta acorde
        res.sendFile(rutaCompleta);  // Si el archivo existe lo retorna
      }
    });
  });
}

// Crear rutas dinámicas para cada categoría
nuevaRutaCategoria('cart');
nuevaRutaCategoria('cats');
nuevaRutaCategoria('cats_products');
nuevaRutaCategoria('products');
nuevaRutaCategoria('products_comments');
nuevaRutaCategoria('sell');
nuevaRutaCategoria('user_cart');

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});