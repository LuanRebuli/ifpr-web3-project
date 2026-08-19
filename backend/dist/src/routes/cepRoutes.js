"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cepController_1 = __importDefault(require("../controllers/cepController"));
const router = (0, express_1.Router)();
router.get('/xml/:uf/:cidade/:logradouro', cepController_1.default.BuscarCepNomeXml);
router.get('/:uf/:cidade/:logradouro', cepController_1.default.BuscarCepNome);
router.get('/:cep', cepController_1.default.BuscarCep);
exports.default = router;
