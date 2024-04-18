const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true},
    hash:{ type: String, required: true },
    rol: { type: String, required: true },
    fechaRegistro: { type: Date}
    })

module.exports = mongoose.model('User', userSchema);