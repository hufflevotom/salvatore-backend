const { Router } = require('express');
const router = Router();
const usuarioController = require('../controllers/usuario.controller.js')
//* Create, Read, Update, Delete
router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.createUsuario);
router.get('/:id', usuarioController.getUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/sesion/', usuarioController.iniciarSesion);
module.exports = router;