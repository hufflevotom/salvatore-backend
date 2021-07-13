const fotoClienteController = {}
const FotoCliente = require('../models/FotoCliente')
fotoClienteController.getFotoClientes = async(req, res) => {
    const r = await FotoCliente.find()
    res.status(200).json(r)
};
fotoClienteController.createFotoCliente = async(req, res) => {
    const r = new FotoCliente(req.body)
    await r.save()
    res.status(201).send({ message: 'FotoCliente creado' })
};
fotoClienteController.getFotoCliente = async(req, res) => {
    const r = await FotoCliente.findOne({ _id: req.params.id })
    res.status(200).send(r)
};
fotoClienteController.updateFotoCliente = async(req, res) => {
    await FotoCliente.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).json({ status: 'FotoCliente actualizado' })
};
fotoClienteController.deleteFotoCliente = async(req, res) => {
    await FotoCliente.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: 'FotoCliente borrado' })
};
module.exports = fotoClienteController;