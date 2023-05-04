const departamentoDTO = require('../entities/DTOs/departamentoDTO');
const pesagemService = require('../services/pesagemService');

var config = require('../config.json');
var connection = process.env.connectionStringV2 || config.connectionStringV2;
var database = process.env.databaseV2 || config.databaseV2;
const mongo = require('mongodb').MongoClient;
mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));


var service = {};
service.addDepartamento = addDepartamento;
service.getDepartamentos = getDepartamentos;
service.getDepartamentoById = getDepartamentoById;
service.updateDepartamento = updateDepartamento;
service.deleteDepartamento = deleteDepartamento;

module.exports = service;

async function getDepartamentos(){
    var departamentos = global.conn.collection("departamentos");
    const result = await departamentos.find().toArray();
    return await Promise.all(result.map(
        async (departamento) => {
            departamento.pesagens = await pesagemService.getPesagemByDepartamentoId(departamento.id);
            return new departamentoDTO(departamento)
        }
    ));
}

async function getDepartamentoById(departamentoId){
    var departamentos = global.conn.collection("departamentos");
    var departamento = await departamentos.findOne({ id: departamentoId });

    if (departamento === null)
        throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};
    
    departamento.pesagens = await pesagemService.getPesagemByDepartamentoId(departamento.id);
    return new departamentoDTO(departamento);
}

async function addDepartamento(departamentoNovo){
    var departamentos = global.conn.collection("departamentos");
    var departamento = await departamentos.findOne({ id: departamentoNovo.id });
    if (departamento !== null)
        throw {'status': 400,'mensagem':'Departamento já existe'};

    await departamentos.insertOne(departamentoNovo);
    return await this.getDepartamentoById(departamentoNovo.id);
}

async function updateDepartamento(departamentoAtualizado){
    await this.getDepartamentoById(departamentoAtualizado.id);
    let departamentos = global.conn.collection("departamentos");  
    await departamentos.updateOne({ id: departamentoAtualizado.id }, { $set: departamentoAtualizado });
    return await this.getDepartamentoById(departamentoAtualizado.id);
}

async function deleteDepartamento(id){
    await this.getDepartamentoById(id);
    let departamentos = global.conn.collection("departamentos");  
    await departamentos.deleteOne({ id });
    return await this.getDepartamentos();
}
