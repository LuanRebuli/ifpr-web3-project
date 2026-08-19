"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    id;
    nome;
    email;
    senha;
    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}
exports.default = Usuario;
