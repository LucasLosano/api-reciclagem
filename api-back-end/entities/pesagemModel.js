const exception = require('./DTOs/departamentoDTO');
const material = require('./materialModel');
var moment = require('moment');

class pesagem {
    constructor(objeto) {
        if (typeof objeto !== 'object' ||
            typeof objeto.id !== 'number' ||
            typeof objeto.peso !== 'number' ||
            typeof objeto.tipoMaterial !== 'number' ||
            typeof objeto.departamentoId !== 'number') {
            throw {'status': 400,'mensagem':'Parâmetros inválidos'};
        }

        this.id = objeto.id;
        this.peso = objeto.peso;
        this.tipoMaterial = objeto.tipoMaterial;
        this.departamentoId = objeto.departamentoId;
        this.dataHora = moment().format('DD-MM-yyyy:hh:mm:ss');
    }
}

module.exports = pesagem;