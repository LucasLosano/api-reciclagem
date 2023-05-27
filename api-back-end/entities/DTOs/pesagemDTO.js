// const material = require('../material');

class pesagemDTO{
    constructor(objeto){
        this.id = objeto.id;
        this.peso = objeto.peso;
        this.materialId  = objeto.materialId;
        this.departamentoId = objeto.departamentoId;
        this.dataHora = objeto.dataHora;
    }
}

module.exports = pesagemDTO;