const express = require('express');
const Vacaciones = require('../models/vacaciones');
const router = express.Router();

// CREATE
router.post('/vacaciones', (req, res) => {
    const vacaciones = Vacaciones(req.body);
    vacaciones
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET ALL
router.get('/vacaciones', (req, res) => {   
    Vacaciones
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY ID
router.get('/vacaciones/:id', (req, res) => {
    const { id } = req.params;
    Vacaciones
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// UPDATE BY ID
router.put('/vacaciones/:id', (req, res) => {
    const { id } = req.params;
    const { fechaInicio, fechaFin, estado, comentarios } = req.body;
    Vacaciones
        .updateOne({ _id: id }, { $set: { fechaInicio, fechaFin, estado, comentarios } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// DELETE BY ID
router.delete('/vacaciones/:id', (req, res) => {
    const { id } = req.params;
    Vacaciones
        .findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
