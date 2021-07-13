const estadoEvidenciaController = {}
const EstadoEvidencia = require('../models/EstadoEvidencia')
estadoEvidenciaController.getEstadoEvidencias = async(req, res) => {
    const r = await EstadoEvidencia.find()
    res.status(200).json(r)
};
estadoEvidenciaController.createEstadoEvidencia = async(req, res) => {
    const r = new EstadoEvidencia(req.body)
    await r.save()
    res.status(201).send({ message: 'EstadoEvidencia creado' })
};
estadoEvidenciaController.getEstadoEvidencia = async(req, res) => {
    const r = await EstadoEvidencia.findOne({ _id: req.params.id })
    res.status(200).send(r)
};
estadoEvidenciaController.updateEstadoEvidencia = async(req, res) => {
    await EstadoEvidencia.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).json({ status: 'EstadoEvidencia actualizado' })
};
estadoEvidenciaController.deleteEstadoEvidencia = async(req, res) => {
    await EstadoEvidencia.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: 'EstadoEvidencia borrado' })
};
module.exports = estadoEvidenciaController;