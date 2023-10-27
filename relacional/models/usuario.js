const sequelize = require("sequelize");

const usuario = sequelize.define('usuario', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    }
});

module.exports = usuario;