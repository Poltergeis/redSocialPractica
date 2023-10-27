const mongoose = require("mongoose");

const modeloPublicaciones = mongoose.Schema({
  "titulo": String,
  "contenido": String,
  "fecha_creacion": Date,
  "usuario":{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  }
});

module.exports = mongoose.model('publicacion',modeloPublicaciones,'publicaciones');