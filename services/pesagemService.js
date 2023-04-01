const pesagem = require('../entities/pesagem');

class pesagemService{
    constructor(){
        this.pesagem = new Map();
        this.pesagem.set(1, new pesagem({ 'id':1, 'peso':'10.25', 'tipoMaterial':'papel', 'departamentoId':'1', 'dataHora':Date.now}));
        this.pesagem.set(2, new pesagem({ 'id':2, 'peso':'50.10', 'tipoMaterial':'plastico', 'departamentoId':'2', 'dataHora':Date.now}));
    }

    addPesagem(pesagemNova){
        return this.pesagem.set(pesagem.id, new pesagem(pesagemNova));
    }
}

module.exports = pesagemService;