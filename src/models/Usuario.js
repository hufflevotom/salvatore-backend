const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs');
const usuarioSchema = new Schema({
    dni: { type: String, required: true },
    contrasena: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    celular: { type: String, required: true },
    idTipoRol: {
        type: Schema.Types.ObjectId,
        ref: 'TipoRol', required: true
    },
    brevete: { type: String, required: false },
}, {
    timestamps: true,
    versionKey: false,
})
usuarioSchema.methods.encriptarContrasena = contrasena => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(contrasena, salt);
}
usuarioSchema.methods.compararContrasena = (contrasena, pass) => {
    return bcrypt.compareSync(contrasena, pass);
}
module.exports = model("Usuario", usuarioSchema);