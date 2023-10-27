const mongoose = require("mongoose");

const modeloComentarios = mongoose.Schema({
  "contenido": String,
  "fecha_creacion": Date,
  "publicacion": {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'publicacion'
  },
  "usuario": {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  }
});

module.exports = mongoose.model('Comentario', modeloComentarios,'comentarios');