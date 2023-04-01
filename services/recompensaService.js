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

        if (recompensas.size === 0)
            return undefined;

        return recompensas;
    }

    getRecompensaId(id){
        let recompensa = this.recompensas.get(parseInt(id));

        if (recompensa === undefined)
            return undefined;

        return new recompensaDTO(recompensa);
    }

    addRecompensa(recompensaNova){
        this.recompensas.set(recompensaNova.id, new recompensa(recompensaNova));
    }

    updateRecompensa(recompensaAtualizada){
        this.recompensas.set(recompensaAtualizada.id, new recompensa(recompensaAtualizada));
    }

    deleteRecompensa(id){
        return this.recompensas.delete(id);
    }
}

module.exports = recompensaService;