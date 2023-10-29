const mongoose = require("mongoose");
const publicaciones = require("./publicaciones");

const modeloUsuario = mongoose.Schema({
  "nombre": String,
  "email": String
});

modeloUsuario.pre("remove", async function(next){
  try{
    await publicaciones.deleteMany({ usuario: this._id });
    next();
  }catch(error){
    next(error);
  }
});

module.exports = mongoose.model('Usuario',modeloUsuario,'usuarios');