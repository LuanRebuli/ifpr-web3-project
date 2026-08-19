"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const ErrorType_1 = __importDefault(require("../types/ErrorType"));
const cepController = {
    // GET /cep/:cep
    async BuscarCep(req, res, next) {
        const { cep } = req.params;
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) {
            next((0, error_1.criarErro)('Formato de CEP inválido. Use 8 dígitos.', ErrorType_1.default.INVALID_INPUT.codigo));
            return;
        }
        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            if (!resposta.ok) {
                next((0, error_1.criarErro)(ErrorType_1.default.BAD_GATEWAY.mensagem, ErrorType_1.default.BAD_GATEWAY.codigo));
                return;
            }
            const dados = await resposta.json();
            if (dados.erro) {
                next((0, error_1.criarErro)('CEP não encontrado.', ErrorType_1.default.NOT_FOUND.codigo));
                return;
            }
            res.status(200).json(dados);
        }
        catch (erro) {
            next((0, error_1.criarErro)(ErrorType_1.default.INTERNAL_SERVER_ERROR.mensagem, ErrorType_1.default.INTERNAL_SERVER_ERROR.codigo));
        }
    },
    // GET /cep/:uf/:cidade/:logradouro
    async BuscarCepNome(req, res, next) {
        const { uf, cidade, logradouro } = req.params;
        if (uf.length !== 2 ||
            cidade.length < 3 ||
            logradouro.length < 3) {
            next((0, error_1.criarErro)('UF deve possuir 2 caracteres e cidade/logradouro pelo menos 3.', ErrorType_1.default.INVALID_INPUT.codigo));
            return;
        }
        try {
            const url = `https://viacep.com.br/ws/` +
                `${uf.toUpperCase()}/` +
                `${encodeURIComponent(cidade)}/` +
                `${encodeURIComponent(logradouro)}/json/`;
            const resposta = await fetch(url);
            if (!resposta.ok) {
                next((0, error_1.criarErro)(ErrorType_1.default.BAD_GATEWAY.mensagem, ErrorType_1.default.BAD_GATEWAY.codigo));
                return;
            }
            const dados = await resposta.json();
            res.status(200).json(dados);
        }
        catch (erro) {
            next((0, error_1.criarErro)(ErrorType_1.default.INTERNAL_SERVER_ERROR.mensagem, ErrorType_1.default.INTERNAL_SERVER_ERROR.codigo));
        }
    },
    // GET /cep/xml/:uf/:cidade/:logradouro
    async BuscarCepNomeXml(req, res, next) {
        const { uf, cidade, logradouro } = req.params;
        if (uf.length !== 2 ||
            cidade.length < 3 ||
            logradouro.length < 3) {
            next((0, error_1.criarErro)('UF deve possuir 2 caracteres e cidade/logradouro pelo menos 3.', ErrorType_1.default.INVALID_INPUT.codigo));
            return;
        }
        try {
            const url = `https://viacep.com.br/ws/` +
                `${uf.toUpperCase()}/` +
                `${encodeURIComponent(cidade)}/` +
                `${encodeURIComponent(logradouro)}/xml/`;
            const resposta = await fetch(url);
            if (!resposta.ok) {
                next((0, error_1.criarErro)(ErrorType_1.default.BAD_GATEWAY.mensagem, ErrorType_1.default.BAD_GATEWAY.codigo));
                return;
            }
            const dados = await resposta.text();
            res.type('application/xml');
            res.status(200).send(dados);
        }
        catch (erro) {
            next((0, error_1.criarErro)(ErrorType_1.default.INTERNAL_SERVER_ERROR.mensagem, ErrorType_1.default.INTERNAL_SERVER_ERROR.codigo));
        }
    }
};
exports.default = cepController;
