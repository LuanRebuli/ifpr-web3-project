"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorType = {
    NOT_FOUND: {
        mensagem: 'Recurso não encontrado',
        codigo: 404,
    },
    INVALID_INPUT: {
        mensagem: 'Entrada inválida',
        codigo: 400,
    },
    UNAUTHORIZED: {
        mensagem: 'Não autorizado',
        codigo: 401,
    },
    FORBIDDEN: {
        mensagem: 'Acesso proibido',
        codigo: 403,
    },
    INTERNAL_SERVER_ERROR: {
        mensagem: 'Erro interno do servidor',
        codigo: 500,
    },
    BAD_GATEWAY: {
        mensagem: 'Serviço externo indisponível',
        codigo: 502,
    },
};
exports.default = ErrorType;
