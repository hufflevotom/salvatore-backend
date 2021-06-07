const { Router } = require('express');
const router = Router();
const responsableController = require('../controllers/responsable.controller.js')
//* Create, Read, Update, Delete
router.get('/', responsableController.getResponsables);
router.post('/', responsableController.createResponsable);
router.get('/:id', responsableController.getResponsable);
router.put('/:id', responsableController.updateResponsable);
router.delete('/:id', responsableController.deleteResponsable);
module.exports = router;