const express = require('express');
const router = express.Router();

const cepController = require('../controllers/cepController.js');

router.get('/:cep', cepController.BuscarCep);

router.get('/:uf/:cidade/:logradouro', cepController.BuscarCepNome);
router.get('/xml/:uf/:cidade/:logradouro', cepController.BuscarCepNomeXml);

module.exports = router;