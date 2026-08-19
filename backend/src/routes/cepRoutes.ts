import { Router } from 'express';
import cepController from '../controllers/cepController';

const router = Router();

router.get(
    '/xml/:uf/:cidade/:logradouro',
    cepController.BuscarCepNomeXml
);

router.get(
    '/:uf/:cidade/:logradouro',
    cepController.BuscarCepNome
);

router.get(
    '/:cep',
    cepController.BuscarCep
);

export default router;