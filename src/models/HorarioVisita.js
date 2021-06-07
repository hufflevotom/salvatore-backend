const { Schema, model } = require('mongoose')
const horarioVisitaSchema = new Schema({
    inicioVisita: { type: Number, required: true },
    finVisita: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model("HorarioVisita", horarioVisitaSchema);