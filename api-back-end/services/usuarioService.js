const autenticacaoDTO = require('../entities/DTOs/autenticacaoDTO');

var connection = process.env.AZURE_MONGODB;
var database = process.env.AZURE_DATABASE;

const usuarioModel = require('../entities/usuarioModel');
var bcrypt = require('bcryptjs');
var lodash = require('lodash');
const mongo = require('mongodb').MongoClient;
mongo.connect(connection, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(database))
    .catch(err => console.log(err));

var service = {};
service.autenticar = autenticar;
service.registrar = registrar;

module.exports = service;

async function autenticar(usuarioTentandoLogar) {     
    let usuarios = global.conn.collection("usuarios");
    let auxUsuario = await usuarios.findOne({username : usuarioTentandoLogar.username});

    if (auxUsuario !== null && usuarios && bcrypt.compareSync(usuarioTentandoLogar.password, auxUsuario.hash)) {
        return new autenticacaoDTO(auxUsuario);
    }
    
    throw { 'status': 400, 'mensagem': 'Usuário não encontrado.' };
}

async function registrar(usuarioTentandoCadastrar) {
    let usuarios = global.conn.collection("usuarios");
    let auxUsuario = await usuarios.findOne({username : usuarioTentandoCadastrar.username});

    if (auxUsuario !== null)
        throw {'status': 400,'mensagem':'Usuário já cadastrado.'};

    var usuarioValido = new usuarioModel(usuarioTentandoCadastrar);

    var usuario = lodash.omit(usuarioValido, "password");
    usuario.hash = bcrypt.hashSync(usuarioValido.password, 10);
    
    await usuarios.insertOne(usuario);
}