const { Router } = require('express');
const router = Router();
const tipoRolController = require('../controllers/tipoRol.controller.js')
//* Create, Read, Update, Delete
router.get('/', tipoRolController.getTipoRols);
router.post('/', tipoRolController.createTipoRol);
router.get('/:id', tipoRolController.getTipoRol);
router.put('/:id', tipoRolController.updateTipoRol);
router.delete('/:id', tipoRolController.deleteTipoRol);
module.exports = router;