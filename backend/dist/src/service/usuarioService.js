"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obterTodosUsuarios = async (req, res) => {
    const mockUsuarios = [
        {
            id: 1,
            nome: 'João',
            email: 'joao@gmail.com',
            senha: '123456'
        },
        {
            id: 2,
            nome: 'Biel',
            email: 'biel@gmail.com',
            senha: '123456'
        },
        {
            id: 3,
            nome: 'Bia',
            email: 'bia@gmail.com',
            senha: '123456'
        }
    ];
    const usuarios = mockUsuarios.map(({ senha, ...usuario }) => usuario);
    return res.status(200).json(usuarios);
};
exports.default = obterTodosUsuarios;
