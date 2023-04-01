// const material = require('../material');

class pesagemDTO{
    constructor(objeto){
        this.id = objeto.id;
        this.peso = objeto.peso;
        this.tipoMaterial = objeto.tipoMaterial;
        this.departamentoId = objeto.departamentoId;
        this.dataHora = objeto.dataHora;
    }
}

module.exports = pesagemDTO;