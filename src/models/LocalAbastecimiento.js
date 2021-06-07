const { Schema, model } = require('mongoose')
const localAbastecimientoSchema = new Schema({
    localAbastecimiento: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model("LocalAbastecimiento", localAbastecimientoSchema);