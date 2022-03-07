const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// leer las variables de entorno
dotenv.config();
// console.log(process.env);

// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());
// lectura y parseo del body
app.use(express.json());

// conexion a la bdd
dbConnection();

// rutas
app.use("/api/hospitales", require("./routes/hospital.routing"));
app.use("/api/login", require("./routes/auth.routing"));
app.use("/api/medicos", require("./routes/medico.routing"));
app.use("/api/todo", require("./routes/busquedas.routing"));
app.use("/api/usuarios", require("./routes/usuarios.routing"));
app.use("/api/upload", require("./routes/upload.routing"));

// escucha del servidor
app.listen(process.env.PORT, () => {
  console.log("On Run Server \x1b[32m%s\x1b[0m", process.env.PORT);
});
