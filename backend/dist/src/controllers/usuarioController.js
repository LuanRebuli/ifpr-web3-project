"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../model/Usuario"));
const error_1 = require("../utils/error");
const ErrorType_1 = __importDefault(require("../types/ErrorType"));
const usuarios = [];
const usuarioController = {
    async listar(req, res, next) {
        try {
            res.status(200).json(usuarios);
        }
        catch (erro) {
            next((0, error_1.criarErro)(ErrorType_1.default.INTERNAL_SERVER_ERROR.mensagem, ErrorType_1.default.INTERNAL_SERVER_ERROR.codigo));
        }
    },
    async buscarPorId(req, res, next) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            next((0, error_1.criarErro)('ID inválido.', ErrorType_1.default.INVALID_INPUT.codigo));
            return;
        }
        const usuario = usuarios.find(usuario => usuario.id === id);
        if (!usuario) {
            next((0, error_1.criarErro)('Usuário não encontrado.', ErrorType_1.default.NOT_FOUND.codigo));
            return;
        }
        res.status(200).json(usuario);
    },
    async criar(req, res, next) {
        try {
            const { nome, email, senha } = req.body;
            if (!nome || !email) {
                next((0, error_1.criarErro)('Nome e email são obrigatórios.', ErrorType_1.default.INVALID_INPUT.codigo));
                return;
            }
            const usuarioExiste = usuarios.find(usuario => usuario.email === email);
            if (usuarioExiste) {
                next((0, error_1.criarErro)('Email já cadastrado.', ErrorType_1.default.INVALID_INPUT.codigo));
                return;
            }
            const novoUsuario = new Usuario_1.default(usuarios.length + 1, nome, email, senha);
            usuarios.push(novoUsuario);
            res.status(201).json(novoUsuario);
        }
        catch (erro) {
            next((0, error_1.criarErro)(ErrorType_1.default.INTERNAL_SERVER_ERROR.mensagem, ErrorType_1.default.INTERNAL_SERVER_ERROR.codigo));
        }
    },
    async atualizar(req, res, next) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            next((0, error_1.criarErro)('ID inválido.', ErrorType_1.default.INVALID_INPUT.codigo));
            return;
        }
        const usuario = usuarios.find(usuario => usuario.id === id);
        if (!usuario) {
            next((0, error_1.criarErro)('Usuário não encontrado.', ErrorType_1.default.NOT_FOUND.codigo));
            return;
        }
        const { nome, email } = req.body;
        if (nome) {
            usuario.nome = nome;
        }
        if (email) {
            usuario.email = email;
        }
        res.status(200).json(usuario);
    },
    async excluir(req, res, next) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            next((0, error_1.criarErro)('ID inválido.', ErrorType_1.default.INVALID_INPUT.codigo));
            return;
        }
        const index = usuarios.findIndex(usuario => usuario.id === id);
        if (index === -1) {
            next((0, error_1.criarErro)('Usuário não encontrado.', ErrorType_1.default.NOT_FOUND.codigo));
            return;
        }
        usuarios.splice(index, 1);
        res.status(204).send();
    }
};
exports.default = usuarioController;
