const express = require("express");
const router = express.Router();
const Publicacion = require("../models/Publicacion");

router.post('/agregar', (req, res) => {
    const nuevaPublicacion = Publicacion.build({
      titulo: req.body.titulo,
      contenido: req.body.contenido,
      fechaCreacion: new Date(req.body.fechaCreacion),
      usuarioId: req.body.usuarioId
    });
    nuevaPublicacion.save()
      .then(nuevaPublicacionGuardada => {
        res.status(201).json(nuevaPublicacionGuardada);
      }).catch(error => {
        console.error('Error al agregar una publicacion:', error);
        res.status(500).json({ error: 'Error al agregar una publicacion' });
      });
});

router.get('/buscar/:usuarioId', (req,res) => {
    const {usuarioId} = req.params;
    Publicacion.findOne({ where:{usuarioId: usuarioId} })
    .then(usuarioObtenido => {
        if (publicacionObtenida) {
            res.status(200).json({ publicacionObtenida: publicacionObtenida });
          } else {
            res.status(404).json({ message: "Publicación no encontrada" });
          }
    }).catch(error => {
        console.error("Error al obtener una publicacion", error);
        res.status(500).json({ error: "Error al eliminar" });
    });
});

router.put('/actualizar/:usuarioId/:fecha', (req,res) => {
    const {usuarioId,fecha} = req.params;
    Publicacion.findOne({ 
        where:{
            fechaCreacion: new Date(fecha),
            usuarioId: usuarioId
        }
    }).then(publicacionModificable => {
        if(publicacionModificable){
            publicacionModificable.update({ contenido: req.body.contenido })
            .then(() => {
                res.status(200).json({ message: "Publicación actualizada" });
              })
              .catch(error => {
                console.error("Error al actualizar la publicación", error);
                res.status(500).json({ error: "Error al actualizar la publicación" });
              });
        }else{
            res.status(404).json({ message: "Publicacion no encontrada"} );
        }
    }).catch(error => {
        console.error("error al actualizar publicacion", error);
        res.status(500).json({error: "error al actualizar publicacion"});
    });
});

router.delete('/eliminar/:fecha', (req,res) => {
    Publicacion.findOne({
        where:{ fechaCreacion: new Date(req.params.fecha)}
    }).then(publicacionEliminable => {
        if(publicacionEliminable){
            publicacionEliminable.destroy().then(() => {
                res.status(200).json({ message: "publicacion eliminada" });
            }).catch(error => {
                console.error("Error al eliminar la publicación", error);
                res.status.json({ error: "error al eliminar la publicacion"});
            });
        }else{
            console.error("Error al buscar la publicación para eliminar", error);
            res.status(404).json({ message: "publicacion no encontrada" });
        }
    }).catch(error => {
        res.status(500).json({ error: "error al buscar la publicacion" });
    });
});


module.exports = router;

