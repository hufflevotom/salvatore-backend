const responsableController = {}
const Responsable = require('../models/Responsable')
responsableController.getResponsables = async(req, res) => {
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
    res.status(200).json(r)
};
responsableController.createResponsable = async(req, res) => {
    const r = new Responsable(req.body)
    await r.save()
    res.status(201).send({ type: 'success', message: 'Responsable creado' })
};
responsableController.getResponsable = async(req, res) => {
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
    res.status(200).send(r)
};
responsableController.updateResponsable = async(req, res) => {
    await Responsable.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).send({ type: 'success', message: 'Responsable actualizado' })
};
responsableController.deleteResponsable = async(req, res) => {
    await Responsable.findByIdAndDelete(req.params.id)
    res.status(204).send({ type: 'success', message: 'Responsable borrado' })
};
responsableController.cargarResponsables = async(req, res) => {
    const { name } = req.body;
    const responsables = [];
    for (var i = 0; i < name.length; i++) {
        var responsableActual = name[i];
        responsables.push({
            ruta: `${responsableActual.ruta}`,
            idUsuario: `${responsableActual.idUsuario}`,
            idVehiculo: `${responsableActual.idVehiculo}`
        })
    }
    await Responsable.insertMany(responsables).then(function() {
        console.log("Data inserted")
    }).catch(function(error) {
        console.log(error)
    });
    res.status(201).send({ type: 'success', message: 'Responsables creados' })
}
module.exports = responsableController;