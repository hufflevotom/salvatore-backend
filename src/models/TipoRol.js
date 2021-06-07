const { Schema, model } = require('mongoose')
const tipoRolSchema = new Schema({
    descripcion: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("TipoRol", tipoRolSchema);