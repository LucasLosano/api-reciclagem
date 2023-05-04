const recompensa = require('../entities/recompensa');
const recompensaDTO = require('../entities/DTOs/recompensaDTO');

var config = require('../config.json');
var connection = process.env.connectionStringV2 || config.connectionStringV2;
var database = process.env.databaseV2 || config.databaseV2;
const mongo = require('mongodb').MongoClient;
mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));

var service = {};
service.getRecompensaById = getRecompensaById;
service.getRecompensa = getRecompensa;
service.addRecompensa = addRecompensa;
service.updateRecompensa = updateRecompensa;
service.deleteRecompensa = deleteRecompensa;


module.exports = service;

    async function getRecompensa(){
        var recompensas = global.conn.collection("recompensas");
        const result = await recompensas.find().toArray();
        return Array.from(result).map(recompensa => new recompensaDTO(recompensa));
    }

    async function getRecompensaById(id) {
        let recompensas = global.conn.collection("recompensas");
        let recompensa = await recompensas.findOne({id : id});
        if (recompensa === null)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};
        return new recompensaDTO(recompensa);
    }

    async function addRecompensa(recompensaNova){
        var recompensas = global.conn.collection("recompensas");
        var recompensa = await recompensas.findOne({ id: recompensaNova.id });
        if (recompensa !== null)
            throw {'status': 400,'mensagem':'Uma outra recompensa ja está utilizando este Id.'};

        await recompensas.insertOne(recompensaNova);
        return await this.getDepartamentoById(recompensaNova.id);
    }

    async function updateRecompensa(recompensaAtualizada){
        await this.getRecompensaById(recompensaAtualizada.id);
        let recompensas = global.conn.collection("recompensas");  
        await recompensas.updateOne({ id: recompensaAtualizada.id }, { $set: recompensaAtualizada });
        return await this.getRecompensaById(recompensaAtualizada.id);
    }
    
    async function deleteRecompensa(id){
        await this.getRecompensaById(id);
        let recompensas = global.conn.collection("recompensas");  
        await recompensas.deleteOne({ id });
        return await this.getRecompensa();
    }