const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const mongoose = require("mongoose");

router.post('/agregar', async (req,res) =>{
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al agregar el usuario' });
    }
});

router.get('/encontrar/:email', async (req,res) => {
    try{
        const usuario = await Usuario.find({ email: req.params.email });
        if(!usuario){
            return res.status(404).json({ mensaje: 'no se ha encontrado al usuario' });
        }
        res.json(usuario);
    }catch(error){
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

router.delete('/eliminar/:email', async (req,res) => {
    try{
        const usuario = await Usuario.findOne({ email: req.params.email });
        if(!usuario){
            return res.status(404).json({ mensaje: "no se ha encontrado al usuario" });
        }
        await usuario.remove();
        res.status(200).json({ mensaje: "Usuario eliminado con éxito" });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Hubo un error al eliminar al usuario" });
    }
});

module.exports = router;