const { Schema, model } = require('mongoose')
const estadoEvidenciaSchema = new Schema({
    descripcion: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false,
})
module.exports = model("EstadoEvidencia", estadoEvidenciaSchema);