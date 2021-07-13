const evidenciaController = {}
const Evidencia = require('../models/Evidencia')
evidenciaController.getEvidencias = async(req, res) => {
    const r = await Evidencia.find()
    res.status(200).json(r)
};
evidenciaController.createEvidencia = async(req, res) => {
    const r = new Evidencia(req.body)
    await r.save()
    res.status(201).send({ message: 'Evidencia creada' })
};
evidenciaController.getEvidencia = async(req, res) => {
    const r = await Evidencia.findOne({ _id: req.params.id })
    res.status(200).send(r)
};
evidenciaController.updateEvidencia = async(req, res) => {
    await Evidencia.findByIdAndUpdate(req.params.id, req.body)
    res.status(204).json({ status: 'Evidencia actualizada' })
};
evidenciaController.deleteEvidencia = async(req, res) => {
    await Evidencia.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: 'Evidencia borrada' })
};
module.exports = evidenciaController;