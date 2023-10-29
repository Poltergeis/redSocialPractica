const express = require("express");
const router = express.Router();
const Comentario = require("../models/Comentario");

router.post('/agregar', (req,res) => {
    const comentario = Comentario.build({
        contenido: req.body.contenido,
        fechaCreacion: new Date(req.body.fechaCreacion),
        publicacionId: req.body.publicacionId,
        usuarioId: req.body.usuarioId
    });
    comentario.save().then(comentarioNuevo => {
        res.status(201).json(comentarioNuevo);
    }).catch(error => {
        res.status(500).json({ error: "error al guardar el comentario" });
    });
});

router.get('/buscar/:publicacionId/:fecha', (req,res) => {
    Comentario.findOne({
        where: {
            fechaCreacion: new Date(req.params.fecha),
            publicacionId: req.params.publicacionId
        }
    }).then(comentarioEncontrado => {
        if(comentarioEncontrado){
            res.status(200).json({ comentarioEncontrado: comentarioEncontrado });
        }else{
            res.status(404).json({ message: "comentario no encontrado" });
        }
    }).catch(error => {
        console.error("error al buscar un comentario", error);
        res.status(500).json({ error: "error al buscar un comentario" });
    });
});

router.put('/actualizar/:publicacionId/:fecha', (req,res) => {
    Comentario.findOne({
        where: {
            fechaCreacion: new Date(req.params.fecha),
            publicacionId: req.params.publicacionId
        }
    }).then(comentarioEncontrado => {
        if(comentarioEncontrado){
            comentarioEncontrado.update({ contenido: req.body.contenido })
            .then(() => {
                res.status(200).json({ message: "comentario actualizado con exito" });
            }).catch(error => {
                console.error("error al actualizar el comentario", error);
                res.status(500).json({ error: "error al actualizar el comentario" });
            });
        }else{
            res.status(404).json({ message: "comentario no encontrado" });
        }
    }).catch(error => {
        console.error("error al buscar un comentario", error);
        res.status(500).json({ error: "error al buscar un comentario" });
    });
});

router.delete('/eliminar/:fecha/:publicacionId', (req,res) => {
    Comentario.findOne({ where:{
        fechaCreacion: new Date(req.params.fecha),
        publicacionId: req.params.publicacionId
    }}).then(comentario => {
        if(comentario){
            comentario.destroy().then(() => {
                res.status(200).json({ message: "comentario eliminado con exito" });
            }).catch(error => {
                console.error("error al borrar un comentario", error);
                res.status(500).json({ error: "error al borrar un comentario" });
            });
        }else{
            res.status(404).json({ message: "comentario no encontrado" });
        }
    }).catch(error => {
        console.error("error al buscar el comentario", error);
        res.status(500).json( { error: "error al buscar el comentario" });
    });
});

module.exports = router;