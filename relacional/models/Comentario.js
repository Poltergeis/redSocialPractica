const sequelize = require("sequelize");
const Usuario = require("./usuario");
const Publicacion = require("./Publicacion");

const Comentario = sequelize.define('comentario', {
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenido: {
        type: sequelize.TEXT
    },
    fechaCreacion: {
        type: sequelize.DATE
    },
    publicacionId: {
        type: sequelize.INTEGER,
        references: {
            model: Publicacion,
            key: 'id',
            onDelete: 'CASCADE'
        }
    },
    usuarioId: {
        type: sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
            onDelete: 'CASCADE'
        }
    }
});

module.exports = Comentario;