const pesagemModel = require('../entities/pesagemModel');
const pesagemDTO = require('../entities/DTOs/pesagemDTO');

var connection = process.env.AZURE_MONGODB;
var database = process.env.AZURE_DATABASE;
const mongo = require('mongodb').MongoClient;
await mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));


var service = {};
service.addPesagem = addPesagem;
service.getPesagem = getPesagem;
service.getPesagemById = getPesagemById;
service.getPesagemByDepartamentoId = getPesagemByDepartamentoId;

module.exports = service;

async function addPesagem(pesagemNova) {     
    let departamentoService = require('../services/departamentoService');  
    await departamentoService.getDepartamentoById(pesagemNova.departamentoId);
    let pesagens = await global.conn.collection("pesagens");
    let auxPesagem = await pesagens.findOne({id : pesagemNova.id});
    if (auxPesagem !== null)
        throw { 'status': 400, 'mensagem': 'Uma pesagem com esse Id já foi criado' };

    await pesagens.insertOne(new pesagemModel(pesagemNova));
    return this.getPesagemById(pesagemNova.id);
}

async function getPesagem() {
    let pesagens = await global.conn.collection("pesagens");
    let result = await pesagens.find().toArray();
    return Array.from(result).map(pesagem => new pesagemDTO(pesagem));
}

async function getPesagemById(id) {
    let pesagens = await global.conn.collection("pesagens");
    let pesagem = await pesagens.findOne({id : id});
    if (pesagem === null)
        throw { 'status': 404, 'mensagem': 'Pesagem não existe ou não foi encontrado' };

    return new pesagemDTO(pesagem);
}

async function getPesagemByDepartamentoId(id) {
    let pesagens = global.conn.collection("pesagens");
    let result = await pesagens.find({departamentoId : id}).toArray();
    return Array.from(result).map(pesagem => new pesagemDTO(pesagem));
}
