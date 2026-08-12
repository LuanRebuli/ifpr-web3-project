const express = require('express');
const router = express.Router();

const cepController = require('../controllers/cepController.js');

router.get('/:cep', cepController.BuscarCep);
router.get('/:uf/:cidade/:logradouro', cepController.BuscarCepNome);

module.exports = router;