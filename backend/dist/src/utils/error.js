"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarErro = exports.AppError = void 0;
class AppError extends Error {
    codigo;
    constructor(mensagem, codigo) {
        super(mensagem);
        this.codigo = codigo;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
const criarErro = (mensagem, codigo) => {
    return new AppError(mensagem, codigo);
};
exports.criarErro = criarErro;
