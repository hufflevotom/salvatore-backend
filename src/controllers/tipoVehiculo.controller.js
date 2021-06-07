const tipoVehiculoController = {}
const TipoVehiculo = require('../models/TipoVehiculo')
tipoVehiculoController.getTipoVehiculos = async (req, res) => {
    const r = await TipoVehiculo.find()
    res.json(r)
};
tipoVehiculoController.createTipoVehiculo = async (req, res) => {
    const r = new TipoVehiculo(req.body)
    await r.save()
    res.send({ message: 'TipoVehiculo creado' })
};
tipoVehiculoController.getTipoVehiculo = async (req, res) => {
    const r = await TipoVehiculo.findOne({ _id: req.params.id })
    res.send(r)
};
tipoVehiculoController.updateTipoVehiculo = async (req, res) => {
    await TipoVehiculo.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'TipoVehiculo actualizado' })
};
tipoVehiculoController.deleteTipoVehiculo = async (req, res) => {
    await TipoVehiculo.findByIdAndDelete(req.params.id)
    res.json({ status: 'TipoVehiculo borrado' })
};

module.exports = tipoVehiculoController;