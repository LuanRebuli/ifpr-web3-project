"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cepRoutes_1 = __importDefault(require("./src/routes/cepRoutes"));
const error_1 = require("./src/utils/error");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime()
    });
});
app.use('/cep', cepRoutes_1.default);
app.use((erro, req, res, next) => {
    if (erro instanceof error_1.AppError) {
        res.status(erro.codigo).json({
            erro: erro.message
        });
        return;
    }
    console.error(erro);
    res.status(500).json({
        erro: 'Erro interno do servidor'
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
