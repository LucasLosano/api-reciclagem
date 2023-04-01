class departamento {
    constructor(objeto) {
        if (typeof objeto !== 'object' ||
            typeof objeto.id !== 'number' ||
            typeof objeto.nome !== 'string') {
            throw {'status': 400,'mensagem':'Parâmetros inválidos'};
        }

        this.id = objeto.id;
        this.nome = objeto.nome;
        this.pontuaçãoTotal = 0;
        this.quantoGeraDeValor = 0;
    }
}

module.exports = departamento;