const { Schema, model } = require('mongoose')
const ubicacionEntregaSchema = new Schema({
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    distrito: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("UbicacionEntrega", ubicacionEntregaSchema);