const { Schema, model } = require('mongoose')
const vehiculoSchema = new Schema({
    placa: { type: String, required: true },
    marca: { type: String, required: true },
    color: { type: String, required: true },
    modelo: { type: String, required: false },
    fechaCompra: { type: Date, required: false },
    idTipoVehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoVehiculo', required: false
    },
    idEstadoVehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoVehiculo', required: true
    }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("Vehiculo", vehiculoSchema);