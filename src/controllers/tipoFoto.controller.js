const tipoFotoController = {}
const TipoFoto = require('../models/TipoFoto')
tipoFotoController.getTipoFotos = async(req, res) => {
    const r = await TipoFoto.find()
    res.status(200).send(r)
};
tipoFotoController.createTipoFoto = async(req, res) => {
    const r = new TipoFoto(req.body)
    await r.save()
    res.status(201).send({ type: 'success', message: 'TipoFoto creado' })
};
tipoFotoController.getTipoFoto = async(req, res) => {
    const r = await TipoFoto.findOne({ _id: req.params.id })
    res.status(200).send(r)
};
tipoFotoController.updateTipoFoto = async(req, res) => {
    await TipoFoto.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).send({ type: 'success', message: 'TipoFoto actualizado' })
};
tipoFotoController.deleteTipoFoto = async(req, res) => {
    await TipoFoto.findByIdAndDelete(req.params.id)
    res.status(204).send({ type: 'success', message: 'TipoFoto borrado' })
};
module.exports = tipoFotoController;