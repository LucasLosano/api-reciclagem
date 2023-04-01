var express = require('express');
var router = express.Router();

const pesagemService = require('../services/pesagemService');
const departamentoService = require('../services/departamentoService');
var pesagens = new pesagemService();
var departamentos = new departamentoService();

router.get('/', function(req, res) {
    res.json({pesagens: pesagens.getPesagem()});
});
  
router.get('/:id', function(req, res) {
    let id = req.params.id;
    let pesagem = pesagens.getPesagemById(id);

    if(pesagem === undefined){
        res.sendStatus(404);
        return;
    }

    res.json({pesagens: pesagem});
});

router.post('/', function(req, res) {
    let pesagemNova = req.body;
    let departamento = departamentos.getDepartamentoById(pesagemNova.departamentoId);

    if(departamento === undefined){
    res.sendStatus(400);
    return;
    }

    pesagens.addPesagem(pesagemNova);
    res.sendStatus(201);
});

module.exports = router;
