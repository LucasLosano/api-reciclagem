const pesagem = require('../entities/pesagem');
const pesagemDTO = require('../entities/DTOs/pesagemDTO');

const departamentoService = require('../services/departamentoService');
var departamentos = new departamentoService();

class pesagemService{
    constructor(){
        this.pesagens = new Map();
        this.pesagens.set(1, new pesagem({ 'id':1, 'peso':10.25, 'tipoMaterial': 1, 'departamentoId':1}));
        this.pesagens.set(2, new pesagem({ 'id':2, 'peso':50.10, 'tipoMaterial': 3, 'departamentoId':2}));
    }

    addPesagem(pesagemNova){
        let auxPesagem = this.pesagens.get(pesagemNova.id);
        departamentos.getDepartamentoById(pesagemNova.id);
        
        if(auxPesagem !== undefined)
            throw {'status': 400,'mensagem':'Um pesagem com esse Id já foi criado'};
        
        
        this.pesagens.set(pesagemNova.id, new pesagem(pesagemNova));

        return this.getPesagemById(pesagemNova.id);
    }

    getPesagem(){
        let pesagens = Array.from(this.pesagens.values()).map(pesagem => new pesagemDTO(pesagem));

        return pesagens;
    }

    getPesagemById(id){
        let pesagem = this.pesagens.get(parseInt(id));
        if (pesagem === undefined)
            throw {'status': 404,'mensagem':'Pesagem não existe ou não foi encontrado'};
 
        return new pesagemDTO(pesagem);
    }
}

module.exports = pesagemService;