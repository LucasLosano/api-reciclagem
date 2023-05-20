// const material = require('../material');

class materialDTO{
    constructor(objeto){
        this.id = objeto.id;
        this.pontuacaoPorKg = objeto.pontuacaoPorKg;
        this.nomeMaterial = objeto.nomeMaterial;
    }
}

module.exports = materialDTO;