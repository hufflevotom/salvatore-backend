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
    res.status(200).send(folio)
};
folioController.createFolio = async(req, res) => {
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
        res.status(409).send({ type: 'error', errores })
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
        res.status(201).send({ type: 'success', message: 'Folio creado' })
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
    res.status(200).send(r)
};
folioController.updateFolio = async(req, res) => {
    const errores = [];
    const { numeroFolio, ruta, nombre, dni, telefono, direccion, fechaEntrega, latitud, longitud, distrito, ordenEntrega, inicioVisita, finVisita, descripcionPedido, localAbastecimiento } = req.body;
    const folio = await Folio.findOne({ _id: req.params.id })
    if (folio) {
        if (numeroFolio) {
            if (!/^[0-9]+$/.test(numeroFolio)) {
                errores.push({ message: 'El numero de folio debe ser válido' })
            }
        }
        if (ruta) {
            if (!/^[0-9]+$/.test(ruta)) {
                errores.push({ message: 'La ruta debe ser válida' })
            }
        }
        if (dni) {
            if (!/^\d{8}(?:[-\s]\d{4})?$/.test(dni)) {
                errores.push({ message: 'El DNI debe tener 8 números' })
            }
        }
        if (ordenEntrega) {
            if (!/^[0-9]$/.test(ordenEntrega)) {
                errores.push({ message: 'La orden de entrega debe ser válida' })
            }
        }
        if (inicioVisita) {
            if (!/^[0-9]+$/.test(inicioVisita)) {
                errores.push({ message: 'El inicio de visita debe ser válido' })
            }
        }
        if (finVisita) {
            if (!/^[0-9]+$/.test(finVisita)) {
                errores.push({ message: 'El fin de visita debe ser válido' })
            }
        }
        if (nombre) {
            if (!/^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/.test(nombre)) {
                errores.push({ message: 'El nombre debe ser válido' })
            }
        }
    } else {
        errores.push({ message: 'El folio ' + numeroFolio + ' no existe' })
    }
    if (errores.length > 0) {
        res.status(409).send({ type: 'error', errores })
    } else {
        const detalleentrega = await DetalleEntrega.findOne({ _id: folio.idDetalleEntrega })
        await UbicacionEntrega.findByIdAndUpdate(detalleentrega.idUbicacionEntrega, { latitud, longitud, distrito })
        await HorarioVisita.findByIdAndUpdate(detalleentrega.idHorarioVisita, { inicioVisita, finVisita })
        await DetalleCliente.findByIdAndUpdate(folio.idDetalleCliente, { nombre, dni, telefono, direccion })
        await DetallePedido.findByIdAndUpdate(folio.idDetallePedido, { descripcionPedido })
        await LocalAbastecimiento.findByIdAndUpdate(folio.idLocalAbastecimiento, { localAbastecimiento })
        await DetalleEntrega.findByIdAndUpdate(folio.idDetalleEntrega, { fechaEntrega, ordenEntrega })
        await Folio.findByIdAndUpdate(req.params.id, { numeroFolio, ruta })
        res.status(204).send({ type: 'success', message: 'Folio actualizado' })
    }
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
    res.status(204).send({ type: 'success', message: 'Folio borrado' })
};
folioController.getRutas = async(req, res) => {
    const today = moment().startOf('day')
    const rutas = await Folio.find({
        createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }, { ruta: 1 }).sort({ ruta: 1 }).distinct('ruta')
    res.status(200).send(rutas)
}
folioController.cargarFolios = async(req, res) => {
    const { name } = req.body;
    const clientes = [];
    const ubicaciones = [];
    const horarios = [];
    const pedidos = [];
    const locales = [];
    const entregas = [];
    const folios = [];
    const errores = [];
    for (var i = 0; i < name.length; i++) {
        var FolioActual = name[i];
        if (!/^[0-9]+$/.test(FolioActual.Folio)) {
            errores.push({ message: 'El numero de Folio: ' + FolioActual.Folio + ' debe ser válido' })
        }
        if (!/^[0-9]+$/.test(FolioActual.IdRuta)) {
            errores.push({ message: 'La ruta: ' + FolioActual.IdRuta + ' del folio ' + FolioActual.Folio + ' debe ser válida' })
        }
        if (!/^[0-9]+$/.test(FolioActual.InicioVisita)) {
            errores.push({ message: 'El inicio de visita: ' + FolioActual.InicioVisita + ' del folio ' + FolioActual.Folio + ' debe ser válido' })
        }
        if (!/^[0-9]+$/.test(FolioActual.FinVisita)) {
            errores.push({ message: 'El fin de visita: ' + FolioActual.FinVisita + ' del folio ' + FolioActual.Folio + ' debe ser válido' })
        }
        if (errores.length == 0) {
            const idDetalleCliente = mongoose.Types.ObjectId();
            const idUbicacionEntrega = mongoose.Types.ObjectId();
            const idHorarioVisita = mongoose.Types.ObjectId();
            const idDetalleEntrega = mongoose.Types.ObjectId();
            const idDetallePedido = mongoose.Types.ObjectId();
            const idLocalAbastecimiento = mongoose.Types.ObjectId();
            clientes.push({
                _id: `${idDetalleCliente}`,
                nombre: `${FolioActual.Descripcion}`,
                dni: `${FolioActual.Dni}`,
                telefono: `${FolioActual.Telefono}`,
                direccion: `${FolioActual.Direccion}`
            })
            ubicaciones.push({
                _id: `${idUbicacionEntrega}`,
                latitud: `${FolioActual.Latitud}`,
                longitud: `${FolioActual.Longitud}`,
                distrito: `${FolioActual.Localidad}`
            })
            horarios.push({
                _id: `${idHorarioVisita}`,
                inicioVisita: `${FolioActual.InicioVisita}`,
                finVisita: `${FolioActual.FinVisita}`
            })
            pedidos.push({
                _id: `${idDetallePedido}`,
                descripcionPedido: `${FolioActual.Producto}`
            })
            locales.push({
                _id: `${idLocalAbastecimiento}`,
                localAbastecimiento: `${FolioActual.LocalAbastece}`
            })
            entregas.push({
                _id: `${idDetalleEntrega}`,
                fechaEntrega: `${FolioActual.FechaPactada}`,
                idUbicacionEntrega: `${idUbicacionEntrega}`,
                ordenEntrega: `${FolioActual.Orden}`,
                idHorarioVisita: `${idHorarioVisita}`
            })
            folios.push({
                numeroFolio: `${FolioActual.Folio}`,
                ruta: `${FolioActual.IdRuta}`,
                idDetalleCliente: `${idDetalleCliente}`,
                idDetalleEntrega: `${idDetalleEntrega}`,
                idDetallePedido: `${idDetallePedido}`,
                idLocalAbastecimiento: `${idLocalAbastecimiento}`
            })
        }
    }
    if (errores.length > 0) {
        res.status(409).send({ type: 'error', errores })
    } else {
        await DetalleCliente.insertMany(clientes).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        await UbicacionEntrega.insertMany(ubicaciones).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        await HorarioVisita.insertMany(horarios).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        await DetallePedido.insertMany(pedidos).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        await LocalAbastecimiento.insertMany(locales).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        await DetalleEntrega.insertMany(entregas).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        await Folio.insertMany(folios).then(function() {
            console.log("Data inserted")
        }).catch(function(error) {
            console.log(error)
        });
        res.status(201).send({ type: 'success', message: 'Folios creados' })
    }
}
folioController.getFoliosActuales = async(req, res) => {
    const today = moment().startOf('day')
    const rutas = await Folio.find({
            createdAt: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        }).populate({
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
        .sort({ ruta: 1 })
    res.status(200).send(rutas)
}
module.exports = folioController;