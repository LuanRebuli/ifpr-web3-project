import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import rotasCep from './src/routes/cepRoutes';
import rotasUsuario from './src/routes/usuarioRoutes';
import { AppError } from './src/utils/error';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime()
    });
});

app.use('/cep', rotasCep);
app.use('/usuario', rotasUsuario);

app.use((
    erro: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (erro instanceof AppError) {
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