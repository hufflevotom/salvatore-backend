const { Schema, model } = require('mongoose')
const folioSchema = new Schema({
    numeroFolio: { type: String, required: true },
    ruta: { type: String, required: true },
    idDetalleCliente: {
        type: Schema.Types.ObjectId,
        ref: 'DetalleCliente', required: true
    },
    idDetalleEntrega: {
        type: Schema.Types.ObjectId,
        ref: 'DetalleEntrega', required: true
    },
    idDetallePedido: {
        type: Schema.Types.ObjectId,
        ref: 'DetallePedido', required: true
    },
    idLocalAbastecimiento: {
        type: Schema.Types.ObjectId,
        ref: 'LocalAbastecimiento', required: true
    }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("Folio", folioSchema);