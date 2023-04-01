const material = require('../entities/material');

class pesagem{
    constructor(objeto){
        this.id = objeto.id;
        this.peso = objeto.peso;
        this.tipoMaterial = material.getTipoById(objeto.tipoMaterial);
        this.departamentoId = objeto.departamentoId;
        this.dataHora = objeto.dataHora;
    }
}

module.exports = pesagem;