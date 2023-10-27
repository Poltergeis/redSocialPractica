const mongoose = require("mongoose");

const modeloUsuario = mongoose.Schema({
  "nombre": String,
  "email": String
});

module.exports = mongoose.model('Usuario',modeloUsuario,'usuarios');