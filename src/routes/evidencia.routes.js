const { Router } = require('express');
const router = Router();
const evidenciaController = require('../controllers/evidencia.controller.js')
//* Create, Read, Update, Delete
router.get('/', evidenciaController.getEvidencias);
router.post('/', evidenciaController.createEvidencia);
router.get('/:id', evidenciaController.getEvidencia);
router.put('/:id', evidenciaController.updateEvidencia);
router.delete('/:id', evidenciaController.deleteEvidencia);
module.exports = router;