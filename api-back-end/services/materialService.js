const materialDTO = require('../entities/DTOs/materialDTO');
const materialModel = require('../entities/materialModel')


const setMongoConnection = require('../services/mongoDBConnection');
setMongoConnection();


var service = {};
service.addMaterial = addMaterial;
service.getMaterials = getMaterials;
service.getMaterialById = getMaterialById;
service.updateMaterial = updateMaterial;
service.deleteMaterial = deleteMaterial;

module.exports = service;

async function getMaterials(){
    var Materials = await global.conn.collection("Materiais");
    const result = await Materials.find().toArray();
    return Array.from(result).map(material => new materialDTO(material));
}

async function getMaterialById(MaterialId){
    var materials = await global.conn.collection("Materiais");
    var material = await materials.findOne({ id: MaterialId });

    if (material === null)
        throw {'status': 404,'mensagem':'Material não existe ou não foi encontrado'};
    
    return new materialDTO(material);
}

async function addMaterial(MaterialNovo){
    var materials = await global.conn.collection("Materiais");
    var material = await materials.findOne({ id: MaterialNovo.id });
    if (material !== null)
        throw {'status': 400,'mensagem':'Material já existe'};

    await materials.insertOne(new materialModel(MaterialNovo));
    return await this.getMaterialById(MaterialNovo.id);
}

async function updateMaterial(materialAtualizado){
    await this.getMaterialById(materialAtualizado.id);
    let materials = await global.conn.collection("Materiais");  
    await materials.updateOne({ id: materialAtualizado.id }, { $set: new materialModel(materialAtualizado) });
    return await this.getMaterialById(materialAtualizado.id);
}

async function deleteMaterial(id){
    await this.getMaterialById(id);
    let materials = await global.conn.collection("Materiais");  
    await materials.deleteOne({ id });
    return await this.getMaterials();
}
