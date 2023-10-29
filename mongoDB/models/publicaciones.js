const mongoose = require("mongoose");
const Comentario = require('./comentarios');

const modeloPublicaciones = mongoose.Schema({
  "titulo": String,
  "contenido": String,
  "fecha_creacion": Date,
  "usuario":{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  }
});

modeloPublicaciones.pre("remove", async function (next) {
  try {
    await Comentario.deleteMany({ publicacion: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('publicacion',modeloPublicaciones,'publicaciones');