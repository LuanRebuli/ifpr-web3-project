const cepController = {
    async listar(req, res) {
        const { cep } = req.params;

        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return res.status(400).json({ erro: "Formato de CEP inválido. Use 8 dígitos." });
        }

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            
            if (!resposta.ok) {
                return res.status(502).json({ erro: "Serviço de CEP indisponível no momento." });
            }

            const dados = await resposta.json();

            if (dados.erro) {
                return res.status(404).json({ erro: "CEP não encontrado." });
            }

            return res.status(200).json(dados);

        } catch (error) {
            console.error("Erro na busca de CEP:", error); 
            return res.status(500).json({ erro: "Erro interno no servidor do aplicativo." });
        }
    },
};

module.exports = cepController;