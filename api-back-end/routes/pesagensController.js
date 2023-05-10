var express = require('express');
var router = express.Router();

const pesagemService = require('../services/pesagemService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
    pesagemService.getPesagem()
    .then(function (pesagens){
        res.send(new retornoAPI({ sucesso: true, retorno: pesagens, erro: '' }));
    }).catch ( function (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

        res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    })
});

router.get('/:id', function (req, res) {    
    let id = parseInt(req.params.id);
    pesagemService.getPesagemById(id)
    .then(function (pesagem){        
        res.send(new retornoAPI({ sucesso: true, retorno: pesagem, erro: '' }));
    }).catch ( function (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

        res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    })
});

router.post('/', function (req, res) {
    pesagemService.addPesagem(req.body)
    .then(function (pesagem){        
        res.send(new retornoAPI({ sucesso: true, retorno: pesagem, erro: '' }));
    }).catch ( function (erro) {
        let status = erro.status !== undefined ? erro.status : 500;
        let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
        res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    })
});

module.exports = router;
