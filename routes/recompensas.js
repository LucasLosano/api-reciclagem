var express = require('express');
var router = express.Router();

const recompensaService = require('../services/recompensaService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
  try {
    res.json(new retornoAPI({ sucesso: true, retorno: recompensaService.getRecompensa(), erro: '' }));

  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.get('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: recompensaService.getRecompensaId(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.post('/', function (req, res) {
  try {
    let recompensaNova = req.body;

    res.status(201).json(new retornoAPI({ sucesso: true, retorno: recompensaService.addRecompensa(recompensaNova), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.put('/', function (req, res) {
  try {
    let recompensaAtualizada = req.body;

    
    res.json(new retornoAPI({ sucesso: true, retorno: recompensaService.updateRecompensa(recompensaAtualizada), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.delete('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: recompensaService.deleteRecompensa(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

module.exports = router;
