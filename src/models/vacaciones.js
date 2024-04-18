const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacacionesSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: { type: String, enum: ['aprobado', 'pendiente', 'rechazado'], default: 'pendiente' },
    comentarios: { type: String }
});

module.exports = mongoose.model('Vacaciones', vacacionesSchema);
