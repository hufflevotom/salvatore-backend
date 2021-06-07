const { Router } = require('express');
const router = Router();
const folioController = require('../controllers/folio.controller.js')
//* Create, Read, Update, Delete
router.get('/', folioController.getFolios);
router.post('/', folioController.createFolio);
router.get('/:id', folioController.getFolio);
router.put('/:id', folioController.updateFolio);
router.delete('/:id', folioController.deleteFolio);

module.exports = router;