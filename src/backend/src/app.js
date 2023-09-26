const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000'); // Ctrl + C para stopar o servidor
});