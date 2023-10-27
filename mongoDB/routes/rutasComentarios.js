const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comentario = require("../models/comentarios");

router.post('/agregar', async (req,res) => {
    try{
        const comentario = new Comentario(req.body);
        await comentario.save();
        res.status(201).json(comentario);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al agregar el comentario' });
    }
});

router.put('/actualizar/:usuarioID/:publicacionID', async (req, res) => {
    try{
        const {usuarioID,publicacionID} = req.params;
        const comentario = await Comentario.findOne({ usuario: usuarioID, publicacion: publicacionID });
        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }
        comentario.contenido = req.body.contenido || comentario.contenido;
        await comentario.save();
        res.status(200).json(comentario);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al actualizar el comentario' });
    }
  });

  router.get('/encontrar/:publicacionID', async (req,res) => {
    try{
        const comentario = await comentario.findOne({ publicacion: req.params.publicacionID });
        if (!comentario) {
            return res.status(404).json({ mensaje: 'No se encontró ningún comentario para esta publicación' });
        }
        res.status(200).json(comentario);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'error al buscar el comentario' });
    }
  });

  router.delete('/borrar/:fecha/:publicacionID', async (req,res) => {
    try{
        const {fecha, publicacionID} = req.params;
        fecha = new Date(fecha);
        const comentario = await Comentario.findOne({ fecha_creacion: fecha, publicacion: publicacionID });
        if (!comentario) {
            return res.status(404).json({ mensaje: 'No se encontró ningún comentario' });
        }
        await comentario.remove();
        res.status(200).json({ mensaje: 'Comentario eliminado con éxito' });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'error al eliminar el comentario' });
    }
  });

module.exports = router;