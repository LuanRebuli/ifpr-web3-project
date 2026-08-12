const express = require('express');
const router = express.Router();

const cepController = require('../controllers/cepController.js');

router.get('/:cep', cepController.listar);

module.exports = router;