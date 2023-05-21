const materialDTO = require('../entities/DTOs/materialDTO');
const materialModel = require('../entities/materialModel')

var connection = process.env.AZURE_MONGODB;
var database = process.env.AZURE_DATABASE;
const mongo = require('mongodb').MongoClient;
mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));


var service = {};
service.addMaterial = addMaterial;
service.getMaterials = getMaterials;
service.getMaterialById = getMaterialById;
service.updateMaterial = updateMaterial;
service.deleteMaterial = deleteMaterial;

module.exports = service;

async function getMaterials(){
    var Materials = global.conn.collection("Materiais");
    const result = await Materials.find().toArray();
    return Array.from(result).map(material => new materialDTO(material));
}

async function getMaterialById(MaterialId){
    var materials = global.conn.collection("Materiais");
    var material = await materials.findOne({ id: MaterialId });

    if (material === null)
        throw {'status': 404,'mensagem':'Material não existe ou não foi encontrado'};
    
    return new materialDTO(material);
}

async function addMaterial(MaterialNovo){
    var materials = global.conn.collection("Materiais");
    var material = await materials.findOne({ id: MaterialNovo.id });
    if (material !== null)
        throw {'status': 400,'mensagem':'Material já existe'};

    await materials.insertOne(new materialModel(MaterialNovo));
    return await this.getMaterialById(MaterialNovo.id);
}

async function updateMaterial(materialAtualizado){
    await this.getMaterialById(materialAtualizado.id);
    let materials = global.conn.collection("Materiais");  
    await materials.updateOne({ id: materialAtualizado.id }, { $set: new materialModel(materialAtualizado) });
    return await this.getMaterialById(materialAtualizado.id);
}

async function deleteMaterial(id){
    await this.getMaterialById(id);
    let materials = global.conn.collection("Materiais");  
    await materials.deleteOne({ id });
    return await this.getMaterials();
}
