const tipoFotoController = {}
const TipoFoto = require('../models/TipoFoto')
tipoFotoController.getTipoFotos = async (req, res) => {
    const r = await TipoFoto.find()
    res.json(r)
};
tipoFotoController.createTipoFoto = async (req, res) => {
    const r = new TipoFoto(req.body)
    await r.save()
    res.send({ message: 'TipoFoto creado' })
};
tipoFotoController.getTipoFoto = async (req, res) => {
    const r = await TipoFoto.findOne({ _id: req.params.id })
    res.send(r)
};
tipoFotoController.updateTipoFoto = async (req, res) => {
    await TipoFoto.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'TipoFoto actualizado' })
};
tipoFotoController.deleteTipoFoto = async (req, res) => {
    await TipoFoto.findByIdAndDelete(req.params.id)
    res.json({ status: 'TipoFoto borrado' })
};
module.exports = tipoFotoController;