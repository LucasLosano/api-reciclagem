const recompensa = require('../entities/recompensa');
const recompensaDTO = require('../entities/DTOs/recompensaDTO');

class recompensaService{
    constructor(){
        this.recompensas = new Map();        
        this.recompensas.set(10, new recompensa({ 'id':10, 'nome':'Caneca', 'pontosNecessarios': 30}));
        this.recompensas.set(12, new recompensa({ 'id':12, 'nome':'Caderno', 'pontosNecessarios': 50 }));
    }
    getRecompensa(){
        let recompensas = Array.from(this.recompensas.values()).map(recompensa => new recompensaDTO(recompensa));

        return recompensas;
    }

    getRecompensaId(id){
        let recompensa = this.recompensas.get(parseInt(id));
        if (recompensa === undefined)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};

        return new recompensaDTO(recompensa);
    }

    addRecompensa(recompensaNova){
        let auxRecompensa = this.recompensas.get(id);
        if(auxRecompensa !== undefined)
            throw {'status': 400,'mensagem':'Um recompensa com esse Id já foi criado'};

        this.recompensas.set(recompensaNova.id, new recompensa(recompensaNova));
    }

    updateRecompensa(recompensaAtualizada){
        let recompensa = this.recompensas.get(parseInt(id));
        if (recompensa === undefined)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};
        this.recompensas.set(recompensaAtualizada.id, new recompensa(recompensaAtualizada));
    }

    deleteRecompensa(id){
        let recompensa = this.recompensas.get(parseInt(id));
        if (recompensa === undefined)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};
        return this.recompensas.delete(id);
    }
}

module.exports = recompensaService;