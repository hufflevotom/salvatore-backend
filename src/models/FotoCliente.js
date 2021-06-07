const { Schema, model } = require('mongoose')
const fotoClienteSchema = new Schema({
    idTipoFoto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoFoto', required: true
    },
    idEvidencia: {
        type: Schema.Types.ObjectId,
        ref: 'Evidencia', required: true
    },
    urlFoto: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model("FotoCliente", fotoClienteSchema);