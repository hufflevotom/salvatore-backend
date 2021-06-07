const { Router } = require('express');
const router = Router();
const vehiculoController = require('../controllers/vehiculo.controller.js')
//* Create, Read, Update, Delete
router.get('/', vehiculoController.getVehiculos);
router.post('/', vehiculoController.createVehiculo);
router.get('/:id', vehiculoController.getVehiculo);
router.put('/:id', vehiculoController.updateVehiculo);
router.delete('/:id', vehiculoController.deleteVehiculo);
module.exports = router;