const usuarioController = {}
const Usuario = require('../models/Usuario')
const TipoUsuario = require('../models/TipoRol')
usuarioController.getUsuarios = async(req, res) => {
    const r = await Usuario.find()
    res.status(200).json(r)
};
usuarioController.createUsuario = async(req, res) => {
    const errores = [];
    const { dni, contrasena, nombre, apellidos, celular, idTipoRol, brevete } = req.body;
    const usuario = await Usuario.findOne({ dni: req.body.dni });
    if (!usuario) {
        if (!/^\d{8}(?:[-\s]\d{4})?$/.test(dni)) {
            errores.push({ message: 'El DNI debe tener 8 números' })
        }
        if (celular.length < 8 || !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(celular)) {
            errores.push({ message: 'El celular debe ser válido' })
        }
        if (nombre.length == 0 || /[0-9]/.test(nombre)) {
            errores.push({ message: 'El nombre debe ser válido' })
        }
        if (apellidos.length == 0 || /[0-9]/.test(apellidos)) {
            errores.push({ message: 'Los apellidos deben ser válidos' })
        }
        if (contrasena.length < 6) {
            errores.push({ message: 'La contraseña debe tener 6 caracteres como mínimo' })
        }
    } else {
        errores.push({ message: 'El DNI ya existe' })
    }
    if (errores.length > 0) {
        res.status(409).send({ type: 'error', errores })
    } else {
        const r = new Usuario({ dni, contrasena, nombre, apellidos, celular, idTipoRol, brevete })
        r.contrasena = await r.encriptarContrasena(contrasena)
        await r.save()
        res.status(201).send({ type: 'success', message: 'Usuario creado' })
    }
};
usuarioController.getUsuario = async(req, res) => {
    const r = await Usuario.findOne({ _id: req.params.id })
    res.status(200).send(r)
};
usuarioController.updateUsuario = async(req, res) => {
    const errores = [];
    const { dni, contrasena, nombre, apellidos, celular, idTipoRol, brevete } = req.body;
    if (dni) {
        if (!/^\d{8}(?:[-\s]\d{4})?$/.test(dni)) {
            errores.push({ message: 'El DNI debe tener 8 números' })
        }
    }
    if (celular) {
        if (celular.length < 8 || !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(celular)) {
            errores.push({ message: 'El celular debe ser válido' })
        }
    }
    if (nombre) {
        if (nombre.length == 0 || /[0-9]/.test(nombre)) {
            errores.push({ message: 'El nombre debe ser válido' })
        }
    }
    if (apellidos) {
        if (apellidos.length == 0 || /[0-9]/.test(apellidos)) {
            errores.push({ message: 'Los apellidos deben ser válidos' })
        }
    }
    if (contrasena) {
        if (contrasena.length < 6) {
            errores.push({ message: 'La contraseña debe tener 6 caracteres como mínimo' })
        }
    }
    if (errores.length > 0) {
        res.status(409).send({ type: 'error', errores })
    } else {
        if (contrasena) {
            const r = new Usuario({ dni, contrasena, nombre, apellidos, celular, idTipoRol, brevete })
            req.body.contrasena = await r.encriptarContrasena(contrasena)
        }
        await Usuario.findByIdAndUpdate(req.params.id, req.body)
        res.status(204).send({ type: 'success', message: 'Usuario actualizado' })
    }
};
usuarioController.deleteUsuario = async(req, res) => {
    await Usuario.findByIdAndDelete(req.params.id)
    res.status(204).send({ type: 'success', message: 'Usuario borrado' })
};
usuarioController.iniciarSesion = async(req, res) => {
    const usuario = await Usuario.findOne({ dni: req.body.dni })
    if (!usuario) {
        res.status(409).send({ type: 'error', message: 'El usuario no existe' })
    } else {
        const r = await usuario.compararContrasena(req.body.contrasena, usuario.contrasena);
        if (r) {
            const tipo = await TipoUsuario.findOne({ _id: usuario.idTipoRol })
            res.status(200).send({ type: 'success', message: 'Bienvenido ' + tipo.descripcion, data: usuario })
        } else {
            res.status(401).send({ type: 'error', message: 'Contraseña incorrecta' })
        }
    }
}
module.exports = usuarioController;