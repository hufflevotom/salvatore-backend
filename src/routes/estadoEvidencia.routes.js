const { Router } = require('express');
const router = Router();
const estadoEvidenciaController = require('../controllers/estadoEvidencia.controller.js')
//* Create, Read, Update, Delete
router.get('/', estadoEvidenciaController.getEstadoEvidencias);
router.post('/', estadoEvidenciaController.createEstadoEvidencia);
router.get('/:id', estadoEvidenciaController.getEstadoEvidencia);
router.put('/:id', estadoEvidenciaController.updateEstadoEvidencia);
router.delete('/:id', estadoEvidenciaController.deleteEstadoEvidencia);
module.exports = router;