"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
const router = (0, express_1.Router)();
router.get('/', usuarioController_1.default.listar);
router.get('/:id', usuarioController_1.default.buscarPorId);
router.post('/', usuarioController_1.default.criar);
router.put('/:id', usuarioController_1.default.atualizar);
router.delete('/:id', usuarioController_1.default.excluir);
exports.default = router;
