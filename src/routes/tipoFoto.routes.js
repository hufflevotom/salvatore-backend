const { Router } = require('express');
const router = Router();
const tipoFotoController = require('../controllers/tipoFoto.controller.js')
//* Create, Read, Update, Delete
router.get('/', tipoFotoController.getTipoFotos);
router.post('/', tipoFotoController.createTipoFoto);
router.get('/:id', tipoFotoController.getTipoFoto);
router.put('/:id', tipoFotoController.updateTipoFoto);
router.delete('/:id', tipoFotoController.deleteTipoFoto);
module.exports = router;