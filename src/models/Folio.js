const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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

folioSchema.plugin(mongoosePaginate);

module.exports = model("Folio", folioSchema);