const { Schema, model } = require('mongoose')
const detalleEntregaSchema = new Schema({
    fechaEntrega: { type: Date, required: false },
    idUbicacionEntrega: {
        type: Schema.Types.ObjectId,
        ref: 'UbicacionEntrega',
        required: true
    },
    ordenEntrega: { type: Number, required: true },
    idHorarioVisita: {
        type: Schema.Types.ObjectId,
        ref: 'HorarioVisita',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("DetalleEntrega", detalleEntregaSchema);