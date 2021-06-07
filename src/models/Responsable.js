const { Schema, model } = require('mongoose')
const responsableSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', required: true
    },
    idVehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo', required: true
    }
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model("Responsable", responsableSchema);