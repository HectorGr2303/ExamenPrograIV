const express = require('express');
const citaSchema = require('../models/cita');
const router = express.Router();

// CREATE
router.post('/citas', (req, res) => {
    const cita = citaSchema(req.body);
    cita
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET ALL
router.get('/citas', (req, res) => {
    citaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY ID
router.get('/citas/:id', (req, res) => {
    const { id } = req.params;
    citaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// UPDATE BY ID
router.put('/citas/:id', (req, res) => {
    const { id } = req.params;
    const { fechaHora, usuario, descripcion, estado } = req.body;
    citaSchema
        .updateOne({ _id: id }, { $set: { fechaHora, usuario, descripcion, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// DELETE BY ID
router.delete('/citas/:id', (req, res) => {
    const { id } = req.params;
    citaSchema
        .findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
