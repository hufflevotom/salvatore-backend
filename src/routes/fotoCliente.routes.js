const { Router } = require('express');
const router = Router();
const fotoClienteController = require('../controllers/fotoCliente.controller.js')
//* Create, Read, Update, Delete
router.get('/', fotoClienteController.getFotoClientes);
router.post('/', fotoClienteController.createFotoCliente);
router.get('/:id', fotoClienteController.getFotoCliente);
router.put('/:id', fotoClienteController.updateFotoCliente);
router.delete('/:id', fotoClienteController.deleteFotoCliente);
module.exports = router;