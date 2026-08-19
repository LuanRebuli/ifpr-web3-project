const cepController = {
    async BuscarCep(req, res) {
        const { cep } = req.params;

        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return res.status(400).json({
                erro: "Formato de CEP inválido. Use 8 dígitos."
            });
        }

        try {
            const resposta = await fetch(
                `https://viacep.com.br/ws/${cepLimpo}/json/`
            );

            if (!resposta.ok) {
                return res.status(502).json({
                    erro: "Serviço de CEP indisponível no momento."
                });
            }

            const dados = await resposta.json();

            if (dados.erro) {
                return res.status(404).json({
                    erro: "CEP não encontrado."
                });
            }

            return res.status(200).json(dados);

        } catch (error) {
            console.error("Erro na busca de CEP:", error);

            return res.status(500).json({
                erro: "Erro interno no servidor."
            });
        }
    },

    async BuscarCepNome(req, res) {
        const { uf, cidade, logradouro } = req.params;

        if (!uf || !cidade || !logradouro) {
            return res.status(400).json({
                erro: 'UF, cidade e logradouro são obrigatórios'
            });
        }

        if (cidade.length < 3 || logradouro.length < 3) {
            return res.status(400).json({
                erro: 'Cidade e logradouro devem ter pelo menos 3 caracteres'
            });
        }

        const url =
            `https://viacep.com.br/ws/${uf}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;

        try {
            const resposta = await fetch(url);

            if (!resposta.ok) {
                return res.status(502).json({
                    erro: 'Erro ao consultar o ViaCEP'
                });
            }

            const dados = await resposta.json();

            return res.status(200).json(dados);

        } catch (erro) {
            return res.status(500).json({
                erro: 'Erro ao consultar o ViaCEP'
            });
        }
    },


    // 3 - Busca por texto e retorna XML
    async BuscarCepNomeXml(req, res) {
        const { uf, cidade, logradouro } = req.params;

        if (!uf || !cidade || !logradouro) {
            return res.status(400).json({
                erro: 'UF, cidade e logradouro são obrigatórios'
            });
        }

        if (cidade.length < 3 || logradouro.length < 3) {
            return res.status(400).json({
                erro: 'Cidade e logradouro devem ter pelo menos 3 caracteres'
            });
        }

        const url =
            `https://viacep.com.br/ws/${uf}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/xml/`;

        try {
            const resposta = await fetch(url);

            if (!resposta.ok) {
                return res.status(502).send(
                    'Erro ao consultar o ViaCEP'
                );
            }

            const dados = await resposta.text();

            res.type('application/xml');

            return res.send(dados);

        } catch (erro) {
            return res.status(500).json({
                erro: 'Erro ao consultar o ViaCEP'
            });
        }
    }
};

module.exports = cepController;