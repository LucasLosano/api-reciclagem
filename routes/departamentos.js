var express = require('express');
var router = express.Router();

const departamentoService = require('../services/departamentoService');
var departamentos = new departamentoService();

router.get('/', function(req, res) {
  res.json({departamentos: departamentos.getDepartamentos()});
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  let departamento = departamentos.getDepartamentoById(id);
  if(departamento === undefined){
    res.sendStatus(404);
    return;
  }

  res.json({departamentos: departamentos.getDepartamentoById(departamento.id)});
});

router.post('/', function(req, res) {
  let departamentoNovo = req.body;
  let departamento = departamentos.getDepartamentoById(departamentoNovo.id);
  if(departamento !== undefined){
    res.sendStatus(400);
    return;
  }

  departamentos.addDepartamento(departamentoNovo);
  res.sendStatus(201);
});

router.put('/', function(req, res) {
  let departamentoAtualizado = req.body;
  let departamento = departamentos.getDepartamentoById(departamentoAtualizado.id);
  if(departamento === undefined){
    res.sendStatus(404);
    return;
  }

  departamentos.updateDepartamento(departamentoAtualizado);
  res.sendStatus(200);
});

router.delete('/:id', function(req, res) {
  let id = req.params.id;
  let departamento = departamentos.getDepartamentoById(id);

  if(departamento === undefined){
    res.sendStatus(404);
    return;
  }
  
  departamentos.deleteDepartamento(id)
  res.sendStatus(200);
});

module.exports = router;
