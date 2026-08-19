const rotasCep = require('./src/routes/cep.js');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    return res.status(200).json({ status: "OK", uptime: process.uptime() });
})

app.use('/cep', rotasCep);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));