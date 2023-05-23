class materialModel{
    constructor(objeto) {
        if (typeof objeto !== 'object' ||
            typeof objeto.pontuacaoPorKg !== 'number' ||
            typeof objeto.id !== 'number' ||
            typeof objeto.nomeMaterial !== 'string') {
            throw {'status': 400,'mensagem':'Parâmetros inválidos'};
        }
        this.id = objeto.id;
        this.pontuacaoPorKg = objeto.pontuacaoPorKg;
        this.nomeMaterial = objeto.nomeMaterial;
    }
}

module.exports = materialModel;