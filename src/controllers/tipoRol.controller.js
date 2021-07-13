const tipoRolController = {}
const TipoRol = require('../models/TipoRol')
tipoRolController.getTipoRols = async(req, res) => {
    const r = await TipoRol.find()
    res.status(200).send(r)
};
tipoRolController.createTipoRol = async(req, res) => {
    const r = new TipoRol(req.body)
    await r.save()
    res.status(201).send({ type: 'success', message: 'TipoRol creado' })
};
tipoRolController.getTipoRol = async(req, res) => {
    const r = await TipoRol.findOne({ _id: req.params.id })
    res.status(200).send(r)
};
tipoRolController.updateTipoRol = async(req, res) => {
    await TipoRol.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).send({ type: 'success', message: 'TipoRol actualizado' })
};
tipoRolController.deleteTipoRol = async(req, res) => {
    await TipoRol.findByIdAndDelete(req.params.id)
    res.status(204).send({ type: 'success', message: 'TipoRol borrado' })
};

module.exports = tipoRolController;