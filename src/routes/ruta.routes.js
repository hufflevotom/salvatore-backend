const { Router } = require('express');
const router = Router();
const folioController = require('../controllers/folio.controller.js')
//* Create, Read, Update, Delete
router.get('/', folioController.getRutas);
module.exports = router;