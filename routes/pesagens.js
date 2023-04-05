var express = require('express');
var router = express.Router();

const pesagemService = require('../services/pesagemService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
    try {
        res.json(new retornoAPI({ sucesso: true, retorno: pesagemService.getPesagem(), erro: '' }));
    } catch (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

        res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    }
});

router.get('/:id', function (req, res) {
    try {
        let id = parseInt(req.params.id);

        res.json(new retornoAPI({ sucesso: true, retorno: pesagemService.getPesagemById(id), erro: '' }));
    } catch (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

        res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    }
});

router.post('/', function (req, res) {
    try {
        let pesagemNova = req.body;

        res.status(201).json(new retornoAPI({ sucesso: true, retorno: pesagemService.addPesagem(pesagemNova), erro: '' }));
    } catch (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

        res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    }
});

module.exports = router;
