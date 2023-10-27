const mongoose = require("mongoose");
const express = require("express");
const app = express();
const rutasComentarios = require("./routes/rutasComentarios");
const rutasUsuarios = require("./routes/rutasUsuario");
const rutasPublicaciones = require("./routes/rutasPublicaciones");

app.use(express.json());
app.use('/comentario',rutasComentarios);
app.use('/usuario',rutasUsuarios);
app.use('/publicacion',rutasPublicaciones);

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
  });
  
  mongoose.connect('mongodb://127.0.0.1:27017/PracticaRedSocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
    db.on('error', (error) => {
        console.error('Error de conexión a MongoDB:\n', error);
    });

    db.once('open', () => {
        console.log('Conexión a MongoDB exitosa');
    });