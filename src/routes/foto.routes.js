const { Router } = require('express');
const router = Router();
const fotoController = require('../controllers/foto.controller.js')
//* Create, Read, Update, Delete
router.get('/', fotoController.getFotos);
router.post('/', fotoController.createFoto);
router.get('/:id', fotoController.getFoto);
router.put('/:id', fotoController.updateFoto);
router.delete('/:id', fotoController.deleteFoto);
module.exports = router;