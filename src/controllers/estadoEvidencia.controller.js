const estadoEvidenciaController = {}
const EstadoEvidencia = require('../models/EstadoEvidencia')
estadoEvidenciaController.getEstadoEvidencias = async (req, res) => {
    const r = await EstadoEvidencia.find()
    res.json(r)
};
estadoEvidenciaController.createEstadoEvidencia = async (req, res) => {
    const r = new EstadoEvidencia(req.body)
    await r.save()
    res.send({ message: 'EstadoEvidencia creado' })
};
estadoEvidenciaController.getEstadoEvidencia = async (req, res) => {
    const r = await EstadoEvidencia.findOne({ _id: req.params.id })
    res.send(r)
};
estadoEvidenciaController.updateEstadoEvidencia = async (req, res) => {
    await EstadoEvidencia.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'EstadoEvidencia actualizado' })
};
estadoEvidenciaController.deleteEstadoEvidencia = async (req, res) => {
    await EstadoEvidencia.findByIdAndDelete(req.params.id)
    res.json({ status: 'EstadoEvidencia borrado' })
};
module.exports = estadoEvidenciaController;