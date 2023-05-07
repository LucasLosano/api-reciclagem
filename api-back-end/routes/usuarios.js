var express = require('express');
var router = express.Router();

const usuarioService = require('../services/usuarioService');
const retornoAPI = require('../entities/retornoAPI');

router.post('/autenticar', function (req, res) {
    usuarioService.autenticar(req.body)
    .then(function (usuario){        
        res.send(new retornoAPI({ sucesso: true, retorno: usuario, erro: '' }));
    }).catch ( function (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
        res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    })
});

router.post('/registrar', function (req, res) {
    usuarioService.registrar(req.body)    
    .then(function (usuario){        
        res.send(new retornoAPI({ sucesso: true, retorno: usuario, erro: '' }));
    }).catch ( function (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
        res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    })
});

module.exports = router;