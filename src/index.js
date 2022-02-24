
const dotenv = require('dotenv');

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');


// leer las variables de entorno
dotenv.config();
// console.log(process.env);

// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// conexion a la bdd
 dbConnection();

 // rutas
app.get('/', (req, res) => {

    res.json({ok: true, msg: 'Hola Mundo'})
    // console.log('Hola Mundo');
});


// escucha del servidor
app.listen(process.env.PORT, ()=> {
    console.log('On run Server \x1b[32m%s\x1b[0m', process.env.PORT);
});



