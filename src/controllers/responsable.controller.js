const responsableController = {}
const Responsable = require('../models/Responsable')
responsableController.getResponsables = async (req, res) => {
    const r = await Responsable.find()
        .populate({
            path: 'idUsuario',
            model: 'Usuario',
            select: ['dni', 'nombre', 'apellidos', 'celular', 'brevete']
        })
        .populate({
            path: 'idVehiculo',
            model: 'Vehiculo',
            select: ['placa', 'marca', 'color', 'modelo']
        })
    res.json(r)
};
responsableController.createResponsable = async (req, res) => {
    const r = new Responsable(req.body)
    await r.save()
    res.send({ message: 'Responsable creado' })
};
responsableController.getResponsable = async (req, res) => {
    const r = await Responsable.findOne({ _id: req.params.id })
        .populate({
            path: 'idUsuario',
            model: 'Usuario',
            select: ['dni', 'nombre', 'apellidos', 'celular', 'brevete']
        })
        .populate({
            path: 'idVehiculo',
            model: 'Vehiculo',
            select: ['placa', 'marca', 'color', 'modelo']
        })
    res.send(r)
};
responsableController.updateResponsable = async (req, res) => {
    await Responsable.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'Responsable actualizado' })
};
responsableController.deleteResponsable = async (req, res) => {
    await Responsable.findByIdAndDelete(req.params.id)
    res.json({ status: 'Responsable borrado' })
};
module.exports = responsableController;