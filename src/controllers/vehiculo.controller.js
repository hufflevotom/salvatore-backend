const vehiculoController = {}
const Vehiculo = require('../models/Vehiculo')
vehiculoController.getVehiculos = async(req, res) => {
    const r = await Vehiculo.find()
    res.json(r)
};
vehiculoController.createVehiculo = async(req, res) => {
    const errores = [];
    const { placa, marca, color, modelo, fechaFabricacion, idEstadoVehiculo, vencimientoSoat, vencimientoRevision } = req.body;
    const vehiculo = await Vehiculo.findOne({ placa: req.body.placa });
    if (!vehiculo) {
        if (!/[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]/.test(placa)) {
            errores.push({ message: 'La placa debe ser valida' })
        }
        if (marca.length == 0) {
            errores.push({ message: 'La marca debe ser válida' })
        }
        if (color.length == 0) {
            errores.push({ message: 'El color debe ser válido' })
        }
        if (modelo.length == 0) {
            errores.push({ message: 'El modelo debe ser válido' })
        }
        if (fechaFabricacion.length == 0 || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(fechaFabricacion)) {
            errores.push({ message: 'La fecha de fabricación debe ser válida' })
        }
        if (vencimientoSoat.length == 0 || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(vencimientoSoat)) {
            errores.push({ message: 'La fecha de vencimiento del SOAT debe ser válida' })
        }
        if (vencimientoRevision.length == 0 || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(vencimientoRevision)) {
            errores.push({ message: 'La fecha de vencimiento de la revisión técnica debe ser válida' })
        }
        if (idEstadoVehiculo.length == 0) {
            errores.push({ message: 'El estado del vehículo es necesario' })
        }
    } else {
        errores.push({ message: 'La placa ya existe' })
    }
    if (errores.length > 0) {
        res.send({ type: 'error', errores })
    } else {
        const r = new Vehiculo({ placa, marca, color, modelo, fechaFabricacion, idEstadoVehiculo, vencimientoSoat, vencimientoRevision })
        await r.save()
        res.send({ type: 'success', message: 'Vehiculo creado' })
    }
};
vehiculoController.getVehiculo = async(req, res) => {
    const r = await Vehiculo.findOne({ _id: req.params.id })
    res.send(r)
};
vehiculoController.updateVehiculo = async(req, res) => {
    const errores = [];
    const { placa, marca, color, modelo, fechaFabricacion, idEstadoVehiculo, vencimientoSoat, vencimientoRevision } = req.body;
    if (!/[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]/.test(placa)) {
        errores.push({ message: 'La placa debe ser valida' })
    }
    if (marca.length == 0) {
        errores.push({ message: 'La marca debe ser válida' })
    }
    if (color.length == 0) {
        errores.push({ message: 'El color debe ser válido' })
    }
    if (modelo.length == 0) {
        errores.push({ message: 'El modelo debe ser válido' })
    }
    if (fechaFabricacion.length == 0 || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(fechaFabricacion)) {
        errores.push({ message: 'La fecha de fabricación debe ser válida' })
    }
    if (vencimientoSoat.length == 0 || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(vencimientoSoat)) {
        errores.push({ message: 'La fecha de vencimiento del SOAT debe ser válida' })
    }
    if (vencimientoRevision.length == 0 || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(vencimientoRevision)) {
        errores.push({ message: 'La fecha de vencimiento de la revisión técnica debe ser válida' })
    }
    if (idEstadoVehiculo.length == 0) {
        errores.push({ message: 'El estado del vehículo es necesario' })
    }
    if (errores.length > 0) {
        res.send({ type: 'error', errores })
    } else {
        await Vehiculo.findByIdAndUpdate(req.params.id, req.body)
        res.send({ type: 'success', message: 'Vehiculo actualizado' })
    }
};
vehiculoController.deleteVehiculo = async(req, res) => {
    await Vehiculo.findByIdAndDelete(req.params.id)
    res.send({ type: 'success', message: 'Vehiculo borrado' })
};
module.exports = vehiculoController;