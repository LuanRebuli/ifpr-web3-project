import { Request, Response } from 'express';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

const obterTodosUsuarios = async (
    req: Request,
    res: Response
): Promise<Response> => {

    const mockUsuarios: Usuario[] = [
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

export default obterTodosUsuarios;