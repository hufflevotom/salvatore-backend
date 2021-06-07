const { Schema, model } = require('mongoose')
const tipoFotoSchema = new Schema({
    descripcion: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("TipoFoto", tipoFotoSchema);