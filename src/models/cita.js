const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citaSchema = new Schema({
    fechaHora: { type: Date, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, enum: ['pendiente', 'completada', 'cancelada'], default: 'pendiente' }
});

module.exports = mongoose.model('Cita', citaSchema);
