import { Request, Response, NextFunction } from 'express';
import { criarErro } from '../utils/error';
import ErrorType from '../types/ErrorType';

interface CepParams {
    cep: string;
}

interface BuscaCepParams {
    uf: string;
    cidade: string;
    logradouro: string;
}

interface ViaCepResponse {
    cep?: string;
    logradouro?: string;
    complemento?: string;
    unidade?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    estado?: string;
    regiao?: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
    erro?: boolean;
}

const cepController = {

    // GET /cep/:cep
    async BuscarCep(
        req: Request<CepParams>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const { cep } = req.params;

        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            next(
                criarErro(
                    'Formato de CEP inválido. Use 8 dígitos.',
                    ErrorType.INVALID_INPUT.codigo
                )
            );
            return;
        }

        try {
            const resposta = await fetch(
                `https://viacep.com.br/ws/${cepLimpo}/json/`
            );

            if (!resposta.ok) {
                next(
                    criarErro(
                        ErrorType.BAD_GATEWAY.mensagem,
                        ErrorType.BAD_GATEWAY.codigo
                    )
                );
                return;
            }

            const dados =
                await resposta.json() as ViaCepResponse;

            if (dados.erro) {
                next(
                    criarErro(
                        'CEP não encontrado.',
                        ErrorType.NOT_FOUND.codigo
                    )
                );
                return;
            }

            res.status(200).json(dados);

        } catch (erro) {

            next(
                criarErro(
                    ErrorType.INTERNAL_SERVER_ERROR.mensagem,
                    ErrorType.INTERNAL_SERVER_ERROR.codigo
                )
            );
        }
    },


    // GET /cep/:uf/:cidade/:logradouro
    async BuscarCepNome(
        req: Request<BuscaCepParams>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const { uf, cidade, logradouro } = req.params;

        if (
            uf.length !== 2 ||
            cidade.length < 3 ||
            logradouro.length < 3
        ) {
            next(
                criarErro(
                    'UF deve possuir 2 caracteres e cidade/logradouro pelo menos 3.',
                    ErrorType.INVALID_INPUT.codigo
                )
            );
            return;
        }

        try {

            const url =
                `https://viacep.com.br/ws/` +
                `${uf.toUpperCase()}/` +
                `${encodeURIComponent(cidade)}/` +
                `${encodeURIComponent(logradouro)}/json/`;

            const resposta = await fetch(url);

            if (!resposta.ok) {
                next(
                    criarErro(
                        ErrorType.BAD_GATEWAY.mensagem,
                        ErrorType.BAD_GATEWAY.codigo
                    )
                );
                return;
            }

            const dados =
                await resposta.json() as ViaCepResponse[];

            res.status(200).json(dados);

        } catch (erro) {

            next(
                criarErro(
                    ErrorType.INTERNAL_SERVER_ERROR.mensagem,
                    ErrorType.INTERNAL_SERVER_ERROR.codigo
                )
            );
        }
    },


    // GET /cep/xml/:uf/:cidade/:logradouro
    async BuscarCepNomeXml(
        req: Request<BuscaCepParams>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const { uf, cidade, logradouro } = req.params;

        if (
            uf.length !== 2 ||
            cidade.length < 3 ||
            logradouro.length < 3
        ) {
            next(
                criarErro(
                    'UF deve possuir 2 caracteres e cidade/logradouro pelo menos 3.',
                    ErrorType.INVALID_INPUT.codigo
                )
            );
            return;
        }

        try {

            const url =
                `https://viacep.com.br/ws/` +
                `${uf.toUpperCase()}/` +
                `${encodeURIComponent(cidade)}/` +
                `${encodeURIComponent(logradouro)}/xml/`;

            const resposta = await fetch(url);

            if (!resposta.ok) {
                next(
                    criarErro(
                        ErrorType.BAD_GATEWAY.mensagem,
                        ErrorType.BAD_GATEWAY.codigo
                    )
                );
                return;
            }

            const dados = await resposta.text();

            res.type('application/xml');
            res.status(200).send(dados);

        } catch (erro) {

            next(
                criarErro(
                    ErrorType.INTERNAL_SERVER_ERROR.mensagem,
                    ErrorType.INTERNAL_SERVER_ERROR.codigo
                )
            );
        }
    }
};

export default cepController;