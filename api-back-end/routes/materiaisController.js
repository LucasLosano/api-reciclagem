var express = require('express');
var router = express.Router();

const materialService = require('../services/materialService');
const retornoAPI = require('../entities/retornoAPI');

router.get('/', function (req, res) {
  materialService.getMaterials()
    .then(function (materials) {
      res.send(new retornoAPI({ sucesso: true, retorno: materials, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    });
});


router.get('/:id', function (req, res) {
  let id = parseInt(req.params.id);
  materialService.getMaterialById(id)
    .then(function (material) {
      res.send(new retornoAPI({ sucesso: true, retorno: material, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    });
});

router.post('/', function (req, res) {
  materialService.addMaterial(req.body)
    .then(function (material) {
      res.status(201).json(new retornoAPI({ sucesso: true, retorno: material, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    });
});

router.put('/', function (req, res) {
  materialService.updateMaterial(req.body)
    .then(function (material) {
      res.send(new retornoAPI({ sucesso: true, retorno: material, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    });
});

router.delete('/:id', function (req, res) {  
  let id = parseInt(req.params.id);
  materialService.deleteMaterial(id)
    .then(function (material) {
      res.send(new retornoAPI({ sucesso: true, retorno: material, erro: '' }));
    })
    .catch(function (erro) {
      let status = erro.status !== undefined ? erro.status : 500;
      let errorMessage = erro.mensagem !== undefined ? erro.mensagem : erro.message;
      res.status(200).json(new retornoAPI({ sucesso: false, retorno: null, erro: errorMessage, status: status }));
    });
});

module.exports = router;
