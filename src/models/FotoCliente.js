const { Schema, model } = require('mongoose')
const fotoClienteSchema = new Schema({
    urlFoto: { type: String, required: false },
    idTipoFoto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoFoto', required: true
    },
    idEvidencia: {
        type: Schema.Types.ObjectId,
        ref: 'Evidencia', required: true
    },
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model("FotoCliente", fotoClienteSchema);