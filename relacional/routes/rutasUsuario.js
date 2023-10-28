const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const usuario = require("../../mongoDB/models/usuario");

router.post('/agregar', (req,res) => {
    const usuario = Usuario.build({
        nombre: req.body.nombre,
        email: req.body.email
    });
    usuario.save()
    .then(usuarioGuardado => {
        res.status(201).json(usuarioGuardado);
    })
    .catch(error => {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: 'Error al agregar usuario' });
    });
});

router.get('/buscar/:email', (req,res) => {
    const email = req.params.email;
    usuario.findOne({
        where: {email: email}
    }).then(usuarioEncontrado => {
        if (usuarioEncontrado) {
            res.status(200).json(usuarioEncontrado);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    }).catch(error => {
        console.error("Error al buscar usuario:", error);
        res.status(500).json({ error: 'Error al buscar usuario' });
    });
});

router.delete('/eliminar/:email', (req,res) => {
    const email = req.params.email;
    Usuario.destroy({
        where: { email: email }
    }).then(() => {
            res.status(204).send();
    }).catch(error => {
            console.error("Error al eliminar usuario:", error);
            res.status(500).json({ error: 'Error al eliminar usuario' });
    });
});

module.exports = router;