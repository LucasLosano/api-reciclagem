var express = require('express');
var router = express.Router();

const departamentoService = require('../services/departamentoService');
//const pesagemService = require('../services/pesagemService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
  try {
    res.json(new retornoAPI({ sucesso: true, retorno: departamentoService.getDepartamentos(), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.get('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: departamentoService.getDepartamentoById(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.post('/', function (req, res) {
  try {
    let departamentoNovo = req.body;

    res.status(201).json(new retornoAPI({ sucesso: true, retorno: departamentoService.addDepartamento(departamentoNovo), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.put('/', function (req, res) {
  try {
    let departamentoAtualizado = req.body;

    res.json(new retornoAPI({ sucesso: true, retorno: departamentoService.updateDepartamento(departamentoAtualizado), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.delete('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: departamentoService.deleteDepartamento(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

module.exports = router;
