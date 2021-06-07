const tipoRolController = {}
const TipoRol = require('../models/TipoRol')
tipoRolController.getTipoRols = async (req, res) => {
    const r = await TipoRol.find()
    res.json(r)
};
tipoRolController.createTipoRol = async (req, res) => {
    const r = new TipoRol(req.body)
    await r.save()
    res.send({ message: 'TipoRol creado' })
};
tipoRolController.getTipoRol = async (req, res) => {
    const r = await TipoRol.findOne({ _id: req.params.id })
    res.send(r)
};
tipoRolController.updateTipoRol = async (req, res) => {
    await TipoRol.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'TipoRol actualizado' })
};
tipoRolController.deleteTipoRol = async (req, res) => {
    await TipoRol.findByIdAndDelete(req.params.id)
    res.json({ status: 'TipoRol borrado' })
};

module.exports = tipoRolController
    ;