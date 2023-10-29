const express = require("express");
const app = express();
const cors = require("cors");
const rutasComentarios = require("./routes/rutasComentarios");
const rutasUsuarios = require("./routes/rutasUsuario");
const rutasPublicaciones = require("./routes/rutasPublicaciones");
const Sequelize = require("sequelize");

app.use(cors());
app.use(express.json());
app.use("/comentarios", rutasComentarios);
app.use("/usuarios", rutasUsuarios);
app.use("/publicaciones", rutasPublicaciones);

const sequelize = new Sequelize({
    dialect: "mysql", //recordatorio: esto indica el tipo de base de datos (mysql, postgree, etc)
    host: "localhost",
    username: "root",
    password: "",
    database: "redSocial",
});

sequelize.authenticate()
.then(() => {
    console.log("Conexión a la base de datos exitosa.");
}).catch(error => {
    console.error("Error al conectar a la base de datos:", error);
});

app.listen(3991,() => {
    console.log("corriendo en el puerto 3991");/*puerto 3991 para que no tengas conflicto 
    si usas las vistas en 3000 yuen*/
});