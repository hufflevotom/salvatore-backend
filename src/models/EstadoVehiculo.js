const { Schema, model } = require('mongoose')
const estadoVehiculoSchema = new Schema({
    descripcion: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("EstadoVehiculo", estadoVehiculoSchema);