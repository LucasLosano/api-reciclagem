const exception = require('./DTOs/departamentoDTO');

class recompensaModel {
    constructor(objeto) {
        if (typeof objeto !== 'object' ||
            typeof objeto.id !== 'number' ||
            typeof objeto.nome !== 'string' ||
            typeof objeto.pontosNecessarios !== 'number') {
            throw {'status': 400,'mensagem':'Parâmetros inválidos'};
        }
        
        this.id = objeto.id;
        this.nome = objeto.nome;
        this.pontosNecessarios = objeto.pontosNecessarios;
    }
}

module.exports = recompensaModel;