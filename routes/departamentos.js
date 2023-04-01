var express = require('express');
var router = express.Router();

const departamentoService = require('../services/departamentoService');
const retornoAPI = require('../entities/retornoAPI');
var departamentos = new departamentoService();

router.get('/', function (req, res) {
  try {
    res.json(new retornoAPI({ sucesso: true, retorno: departamentos.getDepartamentos(), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.get('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: departamentos.getDepartamentoById(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.post('/', function (req, res) {
  try {
    let departamentoNovo = req.body;

    res.status(201).json(new retornoAPI({ sucesso: true, retorno: addDepartamento(departamentoNovo), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.put('/', function (req, res) {
  try {
    let departamentoAtualizado = req.body;

    res.json(new retornoAPI({ sucesso: true, retorno: departamentos.updateDepartamento(departamentoAtualizado), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

router.delete('/:id', function (req, res) {
  try {
    let id = parseInt(req.params.id);

    res.json(new retornoAPI({ sucesso: true, retorno: departamentos.deleteDepartamento(id), erro: '' }));
  } catch (erro) {
    let status = erro.status !== undefined ? erro.status : 500;
    let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro;

    res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
  }
});

module.exports = router;
