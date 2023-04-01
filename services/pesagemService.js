const pesagem = require('../entities/pesagem');
const pesagemDTO = require('../entities/DTOs/pesagemDTO');
const material = require('../entities/material');

class pesagemService{
    constructor(){
        this.pesagens = new Map();
        this.pesagens.set(1, new pesagem({ 'id':1, 'peso':'10.25', 'tipoMaterial': 1, 'departamentoId':'1', 'dataHora':Date.now}));
        this.pesagens.set(2, new pesagem({ 'id':2, 'peso':'50.10', 'tipoMaterial': 3, 'departamentoId':'2', 'dataHora':Date.now}));
    }

    addPesagem(pesagemNova){
        return this.pesagens.set(pesagemNova.id, new pesagem(pesagemNova));
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