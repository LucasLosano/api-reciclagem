const autenticacaoDTO = require('../entities/DTOs/autenticacaoDTO');
const usuarioModel = require('../entities/usuarioModel');
const setMongoConnection = require('../services/mongoDBConnection');

setMongoConnection();

var service = {};
service.autenticar = autenticar;
service.registrar = registrar;

module.exports = service;

async function autenticar(usuarioTentandoLogar) {     
    let usuarios = await global.conn.collection("usuarios");
    let auxUsuario = await usuarios.findOne({username : usuarioTentandoLogar.username});

    if (auxUsuario !== null && usuarios && bcrypt.compareSync(usuarioTentandoLogar.password, auxUsuario.hash)) {
        return new autenticacaoDTO(auxUsuario);
    }
    
    throw { 'status': 400, 'mensagem': 'Usuário não encontrado.' };
}

async function registrar(usuarioTentandoCadastrar) {
    let usuarios = await global.conn.collection("usuarios");
    let auxUsuario = await usuarios.findOne({username : usuarioTentandoCadastrar.username});

    if (auxUsuario !== null)
        throw {'status': 400,'mensagem':'Usuário já cadastrado.'};

    var usuarioValido = new usuarioModel(usuarioTentandoCadastrar);

    var usuario = lodash.omit(usuarioValido, "password");
    usuario.hash = bcrypt.hashSync(usuarioValido.password, 10);
    
    await usuarios.insertOne(usuario);
}