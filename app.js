import express from "express";
import fetch from "node-fetch";
import os from "os";

const addresses = Object.values(os.networkInterfaces())
  .flatMap(interfaceInfo =>
    interfaceInfo.filter(info => info.family === 'IPv4' && !info.internal)
  )
  .map(info => info.address);

const app = express();
const port = 3000;

let url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY'

app.get('/', (req, res) => {
    res.send('Hola, este es mi servidor en Express');
});

app.get('/nasa', async (req, res) => {
 try {
   // Hacer la solicitud HTTP a la API externa utilizando node-fetch
   const response = await fetch(url);
   const data = await response.json();
   
   // Obtener los nombres de los asteroides
   const asteroids = data.near_earth_objects['2015-09-08'];
   const asteroidNames = asteroids.map(asteroid => asteroid.name);

   // Devolver los nombres de los asteroides como respuesta en formato JSON
   res.json(asteroidNames);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Error al obtener los datos de la API' });
 }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://${addresses}:${port}/`);
});
