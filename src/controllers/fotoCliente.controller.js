const fotoClienteController = {}
const FotoCliente = require('../models/FotoCliente')
fotoClienteController.getFotoClientes = async (req, res) => {
    const r = await FotoCliente.find()
    res.json(r)
};
fotoClienteController.createFotoCliente = async (req, res) => {
    const r = new FotoCliente(req.body)
    await r.save()
    res.send({ message: 'FotoCliente creado' })
};
fotoClienteController.getFotoCliente = async (req, res) => {
    const r = await FotoCliente.findOne({ _id: req.params.id })
    res.send(r)
};
fotoClienteController.updateFotoCliente = async (req, res) => {
    await FotoCliente.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'FotoCliente actualizado' })
};
fotoClienteController.deleteFotoCliente = async (req, res) => {
    await FotoCliente.findByIdAndDelete(req.params.id)
    res.json({ status: 'FotoCliente borrado' })
};
module.exports = fotoClienteController;