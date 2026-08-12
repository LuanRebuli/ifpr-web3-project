const express = require('express');
const app = express();
const rotasCep = require('./src/routes/cep.js');

app.use(express.json());

app.get('/health', (req, res) => {
    return res.status(200).json({ status: "OK", uptime: process.uptime() });
})

app.use('/cep', rotasCep);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));