var express = require('express');
var router = express.Router();

const recompensaService = require('../services/recompensaService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
  recompensaService.getRecompensa()
    .then(function (recompensas) {
      res.send(new retornoAPI({ sucesso: true, retorno: recompensas, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});


router.get('/:id', function (req, res) {
  let id = parseInt(req.params.id);
  recompensaService.getRecompensaById(id)
    .then(function (recompensa) {
      res.send(new retornoAPI({ sucesso: true, retorno: recompensa, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

router.post('/', function (req, res) {
  recompensaService.addRecompensa(req.body)
    .then(function (recompensa) {
      res.status(201).json(new retornoAPI({ sucesso: true, retorno: recompensa, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(status).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage }));
    });
});

router.put('/', function (req, res) {
  recompensaService.updateRecompensa(req.body)
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
  recompensaService.deleteRecompensa(id)
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
