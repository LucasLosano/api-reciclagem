const pesagem = require('../entities/pesagem');
const pesagemDTO = require('../entities/DTOs/pesagemDTO');

class pesagemService{
    constructor(){
        this.pesagens = new Map();
        this.pesagens.set(1, new pesagem({ 'id':1, 'peso':'10.25', 'tipoMaterial':'papel', 'departamentoId':'1', 'dataHora':Date.now}));
        this.pesagens.set(2, new pesagem({ 'id':2, 'peso':'50.10', 'tipoMaterial':'plastico', 'departamentoId':'2', 'dataHora':Date.now}));
    }

    addPesagem(pesagemNova){
        return this.pesagens.set(pesagem.id, new pesagem(pesagemNova));
    }

    getPesagem(){
        if (this.pesagens.size === 0)
            return undefined;

        return Array.from(this.pesagens.values()).map(pesagem => new pesagemDTO(pesagem));
    }

    getPesagemById(id){
        let pesagem = this.pesagens.get(parseInt(id));

        if (pesagem === undefined)
            return undefined;

        return new pesagemDTO(pesagem);
    }
}

module.exports = pesagemService;