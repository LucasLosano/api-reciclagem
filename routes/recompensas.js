var express = require('express');
var router = express.Router();

const recompensaService = require('../services/recompensaService');
const retornoAPI = require('../entities/retornoAPI');
var recompensas = new recompensaService();

router.get('/', function (req, res) {
  try {
    res.json(new retornoAPI({ sucesso: true, retorno: recompensas.getRecompensa(), erro: '' }));

  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.get('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: recompensas.getRecompensaId(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.post('/', function (req, res) {
  try {
    let recompensaNova = req.body;

    res.status(201).json(new retornoAPI({ sucesso: true, retorno: recompensas.addRecompensa(recompensaNova), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.put('/', function (req, res) {
  try {
    let recompensaAtualizada = req.body;

    
    res.json(new retornoAPI({ sucesso: true, retorno: recompensas.updateRecompensa(recompensaAtualizada), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.delete('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: recompensas.deleteRecompensa(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

module.exports = router;
