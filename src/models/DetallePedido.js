const { Schema, model } = require('mongoose')
const detallePedidoSchema = new Schema({
    descripcionPedido: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model("DetallePedido", detallePedidoSchema);