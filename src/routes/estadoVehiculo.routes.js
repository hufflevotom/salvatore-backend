const { Router } = require('express');
const router = Router();
const estadoVehiculoController = require('../controllers/estadoVehiculo.controller.js')
//* Create, Read, Update, Delete
router.get('/', estadoVehiculoController.getEstadoVehiculos);
router.post('/', estadoVehiculoController.createEstadoVehiculo);
router.get('/:id', estadoVehiculoController.getEstadoVehiculo);
router.put('/:id', estadoVehiculoController.updateEstadoVehiculo);
router.delete('/:id', estadoVehiculoController.deleteEstadoVehiculo);
module.exports = router;