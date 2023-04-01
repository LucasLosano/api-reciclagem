var express = require('express');
var router = express.Router();

const recompensaService = require('../services/recompensaService');
var recompensas = new recompensaService();

router.get('/', function(req, res) {
  res.json({recompensas: recompensas.getRecompensa()});
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  let recompensa = recompensas.getRecompensaId(id);
  if(recompensa === undefined){
    res.sendStatus(404);
    return;
  }

  res.json({recompensas: recompensas.getRecompensaId(recompensa.id)});
});

router.post('/', function(req, res) {
  let recompensaNova = req.body;
  let recompensa = recompensas.getRecompensaId(recompensaNova.id);

  if(recompensa !== undefined){
    res.sendStatus(400);
    return;
  }

  recompensas.addRecompensa(recompensaNova);
  res.sendStatus(201);
});

router.put('/', function(req, res) {
  let recompensaAtualizada = req.body;
  let recompensa = recompensas.getRecompensaId(recompensaAtualizada.id);
  if(recompensa === undefined){
    res.sendStatus(404);
    return;
  }

  recompensas.updateRecompensa(recompensaAtualizada);
  res.sendStatus(200);
});

router.delete('/:id', function(req, res) {
  let id = req.params.id;
  let recompensa = recompensas.getRecompensaId(id);
  if(recompensa === undefined){
    res.sendStatus(404);
    return;
  }
  
  recompensas.deleteRecompensa(recompensa.id)
  res.sendStatus(200);
});

module.exports = router;
