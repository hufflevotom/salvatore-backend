const { Router } = require('express');
const router = Router();
const tipoVehiculoController = require('../controllers/tipoVehiculo.controller.js')
//* Create, Read, Update, Delete
router.get('/', tipoVehiculoController.getTipoVehiculos);
router.post('/', tipoVehiculoController.createTipoVehiculo);
router.get('/:id', tipoVehiculoController.getTipoVehiculo);
router.put('/:id', tipoVehiculoController.updateTipoVehiculo);
router.delete('/:id', tipoVehiculoController.deleteTipoVehiculo);
module.exports = router;