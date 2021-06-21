const folioController = {}
const mongoose = require('mongoose')
const Folio = require('../models/Folio')
const DetalleCliente = require('../models/DetalleCliente')
const UbicacionEntrega = require('../models/UbicacionEntrega')
const HorarioVisita = require('../models/HorarioVisita')
const DetallePedido = require('../models/DetallePedido')
const LocalAbastecimiento = require('../models/LocalAbastecimiento')
const DetalleEntrega = require('../models/DetalleEntrega')
const moment = require('moment')
folioController.getFolios = async(req, res) => {
    const folio = await Folio.find()
        .populate({
            path: 'idDetalleCliente',
            model: 'DetalleCliente',
            select: ['nombre', 'dni', 'telefono', 'direccion']
        })
        .populate({
            path: 'idDetalleEntrega',
            model: 'DetalleEntrega',
            populate: [{
                    path: 'idUbicacionEntrega',
                    model: 'UbicacionEntrega',
                    select: ['latitud', 'longitud', 'distrito']
                },
                {
                    path: 'idHorarioVisita',
                    model: 'HorarioVisita',
                    select: ['inicioVisita', 'finVisita']
                },
            ],
            select: ['fechaEntrega', 'idUbicacionEntrega', 'ordenEntrega', 'idHorarioVisita']
        })
        .populate({
            path: 'idDetallePedido',
            model: 'DetallePedido',
            select: ['descripcionPedido']
        })
        .populate({
            path: 'idLocalAbastecimiento',
            model: 'LocalAbastecimiento',
            select: ['localAbastecimiento']
        })
    res.send(folio)
};
folioController.createFolio = async(req, res) => {
    //TODO: Validar el numero de folio 
    const errores = [];
    const { numeroFolio, ruta, nombre, dni, telefono, direccion, fechaEntrega, latitud, longitud, distrito, ordenEntrega, inicioVisita, finVisita, descripcionPedido, localAbastecimiento } = req.body;
    const folio = await Folio.findOne({ numeroFolio: req.body.numeroFolio });
    if (!folio) {
        if (!/^[0-9]+$/.test(numeroFolio)) {
            errores.push({ message: 'numeroFolio debe ser válida' })
        }
        if (!/^[0-9]+$/.test(ruta)) {
            errores.push({ message: 'La ruta debe ser válida' })
        }
        if (!/^\d{8}(?:[-\s]\d{4})?$/.test(dni)) {
            errores.push({ message: 'dni debe ser válida' })
        }
        if (!/^[0-9]$/.test(ordenEntrega)) {
            errores.push({ message: 'ordenEntrega debe ser válida' })
        }
        if (!/^[0-9]+$/.test(inicioVisita)) {
            errores.push({ message: 'inicioVisita debe ser válida' })
        }
        if (!/^[0-9]+$/.test(finVisita)) {
            errores.push({ message: 'finVisita debe ser válida' })
        }
        if (!/^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(nombre)) {
            errores.push({ message: 'nombre debe ser válida' })
        }
    } else {
        errores.push({ message: 'El folio ' + numeroFolio + ' ya existe' })
    }
    if (errores.length > 0) {
        res.send({ type: 'error', errores })
    } else {
        const idDetalleCliente = mongoose.Types.ObjectId();
        const idUbicacionEntrega = mongoose.Types.ObjectId();
        const idHorarioVisita = mongoose.Types.ObjectId();
        const idDetalleEntrega = mongoose.Types.ObjectId();
        const idDetallePedido = mongoose.Types.ObjectId();
        const idLocalAbastecimiento = mongoose.Types.ObjectId();
        const cliente = new DetalleCliente({ _id: idDetalleCliente, nombre, dni, telefono, direccion })
        const ubicacion = new UbicacionEntrega({ _id: idUbicacionEntrega, latitud, longitud, distrito })
        const horario = new HorarioVisita({ _id: idHorarioVisita, inicioVisita, finVisita })
        const pedido = new DetallePedido({ _id: idDetallePedido, descripcionPedido })
        const local = new LocalAbastecimiento({ _id: idLocalAbastecimiento, localAbastecimiento })
        await cliente.save();
        await ubicacion.save();
        await horario.save();
        const entrega = new DetalleEntrega({ _id: idDetalleEntrega, fechaEntrega, idUbicacionEntrega, ordenEntrega, idHorarioVisita })
        await entrega.save();
        await pedido.save();
        await local.save();
        const r = new Folio({ numeroFolio, ruta, idDetalleCliente, idDetalleEntrega, idDetallePedido, idLocalAbastecimiento })
        await r.save()
        res.send({ type: 'success', message: 'Folio creado' })
    }
};
folioController.getFolio = async(req, res) => {
    const r = await Folio.findOne({ _id: req.params.id })
        .populate({
            path: 'idDetalleCliente',
            model: 'DetalleCliente',
            select: ['nombre', 'dni', 'telefono', 'direccion']
        })
        .populate({
            path: 'idDetalleEntrega',
            model: 'DetalleEntrega',
            populate: [{
                    path: 'idUbicacionEntrega',
                    model: 'UbicacionEntrega',
                    select: ['latitud', 'longitud', 'distrito']
                },
                {
                    path: 'idHorarioVisita',
                    model: 'HorarioVisita',
                    select: ['inicioVisita', 'finVisita']
                },
            ],
            select: ['fechaEntrega', 'idUbicacionEntrega', 'ordenEntrega', 'idHorarioVisita']
        })
        .populate({
            path: 'idDetallePedido',
            model: 'DetallePedido',
            select: ['descripcionPedido']
        })
        .populate({
            path: 'idLocalAbastecimiento',
            model: 'LocalAbastecimiento',
            select: ['localAbastecimiento']
        })
    res.send(r)
};
folioController.updateFolio = async(req, res) => {
    const { numeroFolio, ruta, nombre, dni, telefono, direccion, fechaEntrega, latitud, longitud, distrito, ordenEntrega, inicioVisita, finVisita, descripcionPedido, localAbastecimiento } = req.body;
    const folio = await Folio.findOne({ _id: req.params.id })
    const detalleentrega = await DetalleEntrega.findOne({ _id: folio.idDetalleEntrega })
    await UbicacionEntrega.findByIdAndUpdate(detalleentrega.idUbicacionEntrega, { latitud, longitud, distrito })
    await HorarioVisita.findByIdAndUpdate(detalleentrega.idHorarioVisita, { inicioVisita, finVisita })
    await DetalleCliente.findByIdAndUpdate(folio.idDetalleCliente, { nombre, dni, telefono, direccion })
    await DetallePedido.findByIdAndUpdate(folio.idDetallePedido, { descripcionPedido })
    await LocalAbastecimiento.findByIdAndUpdate(folio.idLocalAbastecimiento, { localAbastecimiento })
    await DetalleEntrega.findByIdAndUpdate(folio.idDetalleEntrega, { fechaEntrega, ordenEntrega })
    await Folio.findByIdAndUpdate(req.params.id, { numeroFolio, ruta })
        //TODO: Validar numero de folio
    res.send({ type: 'success', message: 'Folio actualizado' })
};
folioController.deleteFolio = async(req, res) => {
    const folio = await Folio.findOne({ _id: req.params.id })
    const detalleentrega = await DetalleEntrega.findOne({ _id: folio.idDetalleEntrega })
    await UbicacionEntrega.findByIdAndDelete(detalleentrega.idUbicacionEntrega)
    await HorarioVisita.findByIdAndDelete(detalleentrega.idHorarioVisita)
    await DetalleCliente.findByIdAndDelete(folio.idDetalleCliente)
    await DetallePedido.findByIdAndDelete(folio.idDetallePedido)
    await LocalAbastecimiento.findByIdAndDelete(folio.idLocalAbastecimiento)
    await DetalleEntrega.findByIdAndDelete(folio.idDetalleEntrega)
    await Folio.findByIdAndDelete(req.params.id)
    res.send({ type: 'success', message: 'Folio borrado' })
};
folioController.getRutas = async(req, res) => {
    const today = moment().startOf('day')
    const rutas = await Folio.find({
        createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }, { ruta: 1 }).sort({ ruta: 1 }).distinct('ruta')
    res.send(rutas)
}
module.exports = folioController;