import { Request, Response, NextFunction } from 'express';

import Usuario from '../model/Usuario';
import { criarErro } from '../utils/error';
import ErrorType from '../types/ErrorType';

const usuarios: Usuario[] = [];

const usuarioController = {

    async listar(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {
            res.status(200).json(usuarios);

        } catch (erro) {
            next(
                criarErro(
                    ErrorType.INTERNAL_SERVER_ERROR.mensagem,
                    ErrorType.INTERNAL_SERVER_ERROR.codigo
                )
            );
        }
    },


    async buscarPorId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            next(
                criarErro(
                    'ID inválido.',
                    ErrorType.INVALID_INPUT.codigo
                )
            );
            return;
        }

        const usuario = usuarios.find(
            usuario => usuario.id === id
        );

        if (!usuario) {
            next(
                criarErro(
                    'Usuário não encontrado.',
                    ErrorType.NOT_FOUND.codigo
                )
            );
            return;
        }

        res.status(200).json(usuario);
    },


    async criar(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email) {
                next(
                    criarErro(
                        'Nome e email são obrigatórios.',
                        ErrorType.INVALID_INPUT.codigo
                    )
                );
                return;
            }

            const usuarioExiste = usuarios.find(
                usuario => usuario.email === email
            );

            if (usuarioExiste) {
                next(
                    criarErro(
                        'Email já cadastrado.',
                        ErrorType.INVALID_INPUT.codigo
                    )
                );
                return;
            }

            const novoUsuario = new Usuario(
                usuarios.length + 1,
                nome,
                email,
                senha
            );
            usuarios.push(novoUsuario);

            res.status(201).json(novoUsuario);

        } catch (erro) {
            next(
                criarErro(
                    ErrorType.INTERNAL_SERVER_ERROR.mensagem,
                    ErrorType.INTERNAL_SERVER_ERROR.codigo
                )
            );
        }
    },


    async atualizar(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            next(
                criarErro(
                    'ID inválido.',
                    ErrorType.INVALID_INPUT.codigo
                )
            );
            return;
        }

        const usuario = usuarios.find(
            usuario => usuario.id === id
        );

        if (!usuario) {
            next(
                criarErro(
                    'Usuário não encontrado.',
                    ErrorType.NOT_FOUND.codigo
                )
            );
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


    async excluir(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const id = Number(req.params.id);

        if (isNaN(id)) {
            next(
                criarErro(
                    'ID inválido.',
                    ErrorType.INVALID_INPUT.codigo
                )
            );
            return;
        }

        const index = usuarios.findIndex(
            usuario => usuario.id === id
        );

        if (index === -1) {
            next(
                criarErro(
                    'Usuário não encontrado.',
                    ErrorType.NOT_FOUND.codigo
                )
            );
            return;
        }

        usuarios.splice(index, 1);

        res.status(204).send();
    }
};

export default usuarioController;