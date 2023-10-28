const sequelize = require("sequelize");
const Usuario = require("../../mongoDB/models/usuario");

const Publicacion = sequelize.define('publicacion', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: sequelize.STRING
    },
    contenido: {
        type: sequelize.TEXT
    },
    fechaCreacion: {
        type: sequelize.DATE
    },
    usuarioId: {
        type: sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
});

module.exports = Publicacion;