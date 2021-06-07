const estadoVehiculoController = {}
const EstadoVehiculo = require('../models/EstadoVehiculo')
estadoVehiculoController.getEstadoVehiculos = async (req, res) => {
    const r = await EstadoVehiculo.find()
    res.json(r)
};
estadoVehiculoController.createEstadoVehiculo = async (req, res) => {
    const r = new EstadoVehiculo(req.body)
    await r.save()
    res.send({ message: 'EstadoVehiculo creado' })
};
estadoVehiculoController.getEstadoVehiculo = async (req, res) => {
    const r = await EstadoVehiculo.findOne({ _id: req.params.id })
    res.send(r)
};
estadoVehiculoController.updateEstadoVehiculo = async (req, res) => {
    await EstadoVehiculo.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'EstadoVehiculo actualizado' })
};
estadoVehiculoController.deleteEstadoVehiculo = async (req, res) => {
    await EstadoVehiculo.findByIdAndDelete(req.params.id)
    res.json({ status: 'EstadoVehiculo borrado' })
};
module.exports = estadoVehiculoController;