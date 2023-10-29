const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Publicacion = require("../models/publicaciones");

router.post('/agregar', async (req,res) => {
    try{
        const publicacion = new Publicacion(req.body);
        await publicacion.save();
        res.status(201).json(publicacion);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'error al agregar el publicacion' });
    }
});

router.put('/actualizar/:usuarioID/:titulo', async (req,res) => {
    try{
        const {usuarioID,titulo} = req.params;
        const publicacion = await Publicacion.findOne({ titulo: titulo, usuario: usuarioID });
        if(!publicacion){
            return res.status(404).json({ mensaje: "no se ha encontrado la publicacion" });
        }
        publicacion.contenido = req.body.contenido || publicacion.contenido;
        await publicacion.save();
        res.status(200).json(publicacion);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'error al actualizar la publicación' });
    }
});

router.get('/encontrar/:usuarioID', async (req,res) => {
    try{
        const publicacion = await Publicacion.findOne({ usuario: req.params.usuarioID });
        if(!publicacion){
            return res.status(404).json({ mensaje: "no se ha encontrado la publicacion" });
        }
        res.status(200).json(publicacion);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'error al encontrar el publicacion' });
    }
});

router.delete('/eliminar/:fecha', async (req,res) => {
    try{
        const fecha = new Date(req.params.fecha);
        await Publicacion.deleteMany({ fecha_creacion: fecha});
        res.status(200).json({ mensaje: "Publicación eliminada con éxito" });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'error al eliminar el publicacion' });
    }
});

module.exports = router;