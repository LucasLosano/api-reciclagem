var express = require('express');
var router = express.Router();

var departamentoService = require('../services/departamentoService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
  departamentoService.getDepartamentos()
    .then(function (departamentos) {
      res.send(new retornoAPI({ sucesso: true, retorno: departamentos, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

router.get('/:id', function (req, res) {
  let id = parseInt(req.params.id);

  departamentoService.getDepartamentoById(id)
    .then(function (departamento) {
      res.send(new retornoAPI({ sucesso: true, retorno: departamento, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

router.post('/', function (req, res) {
  departamentoService.addDepartamento(req.body)
    .then(function (departamento) {
      res.status(201).json(new retornoAPI({ sucesso: true, retorno: departamento, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

router.put('/', function (req, res) {
  departamentoService.updateDepartamento(req.body)
    .then(function (departamento) {
      res.send(new retornoAPI({ sucesso: true, retorno: departamento, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

router.delete('/:id', function (req, res) {  
  let id = parseInt(req.params.id);
  departamentoService.deleteDepartamento(id)
    .then(function (departamento) {
      res.send(new retornoAPI({ sucesso: true, retorno: departamento, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

module.exports = router;
